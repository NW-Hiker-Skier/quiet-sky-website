import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const policy = JSON.parse(readFileSync(new URL('../.github/security/main-ruleset.json', import.meta.url), 'utf8'));
const workflow = readFileSync(new URL('../.github/workflows/website-security.yml', import.meta.url), 'utf8');

function validateBaseline(candidate) {
  assert.equal(candidate.target, 'branch');
  assert.equal(candidate.enforcement, 'active');
  assert.deepEqual(candidate.conditions, { ref_name: { include: ['refs/heads/main'], exclude: [] } });
  assert.deepEqual(candidate.bypass_actors, []);
  assert.deepEqual(candidate.rules.map(rule => rule.type).sort(), ['deletion', 'non_fast_forward', 'pull_request']);
  const review = candidate.rules.find(rule => rule.type === 'pull_request').parameters;
  assert.equal(review.required_approving_review_count, 0, 'A sole owner cannot approve their own PR');
  assert.equal(review.require_code_owner_review, false);
  assert.equal(review.require_last_push_approval, false);
  assert.equal(review.required_review_thread_resolution, true);
}

test('baseline policy protects only main without bypasses or owner review deadlock', () => {
  validateBaseline(policy);
});

test('policy guard rejects broad scope, bypasses, blocking updates and self-review requirements', () => {
  const unsafeChanges = [
    p => { p.conditions.ref_name.include = ['~ALL']; },
    p => { p.conditions.ref_name.exclude = ['refs/heads/main']; },
    p => { p.bypass_actors.push({ actor_id: 5, actor_type: 'RepositoryRole', bypass_mode: 'always' }); },
    p => { p.rules.push({ type: 'update' }); },
    p => { p.rules.find(r => r.type === 'pull_request').parameters.required_approving_review_count = 1; },
    p => { p.rules.find(r => r.type === 'pull_request').parameters.require_last_push_approval = true; },
    p => { p.rules = p.rules.filter(r => r.type !== 'non_fast_forward'); },
  ];
  for (const mutate of unsafeChanges) {
    const candidate = structuredClone(policy);
    mutate(candidate);
    assert.throws(() => validateBaseline(candidate));
  }
});

test('CI uses unprivileged PR events, immutable actions and no deployment credentials', () => {
  assert.match(workflow, /^on:\r?\n  push:\r?\n  pull_request:\r?\n/m);
  assert.match(workflow, /^permissions:\r?\n  contents: read\r?\n/m);
  assert.doesNotMatch(workflow, /pull_request_target|workflow_run|secrets\s*[.\[]|\bwrite\b|id-token|paths(?:-ignore)?:|branches(?:-ignore)?:/);
  assert.match(workflow, /^    runs-on: ubuntu-24\.04$/m);
  assert.match(workflow, /^    timeout-minutes: 5$/m);
  assert.match(workflow, /^    name: Website security checks$/m);
  assert.deepEqual([...workflow.matchAll(/uses:\s*(\S+)/g)].map(match => match[1]), [
    'actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1',
    'actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1',
  ]);
  assert.match(workflow, /^          persist-credentials: false$/m);
  assert.match(workflow, /^          node-version: '24'$/m);
  assert.match(workflow, /^          package-manager-cache: false$/m);
  assert.deepEqual([...workflow.matchAll(/^\s+run:\s*(.+)$/gm)].map(match => match[1]), [
    'node --test test/*.test.mjs',
  ]);
  assert.doesNotMatch(workflow, /\bif:|\bcontinue-on-error:|\b(?:token|ssh-key|ref|environment):|\benv:/);
});
