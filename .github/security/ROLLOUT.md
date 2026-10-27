# Website publication protection

This is a prepared configuration, not proof that GitHub settings are active. Apply it
only to `NW-Hiker-Skier/quiet-sky-website` after the owner approves the push and rollout.
Cloudflare Pages publishes `main` automatically; pushing another branch can publish a
public preview. Do not push, merge, or deploy before approval.

## Policy and limits

`main-ruleset.json` requires a pull request and resolved review conversations, blocks
force pushes and branch deletion, and has no bypass actors. It targets only this
repository's `main` branch. It deliberately does not restrict all updates or require
signatures, deployment environments, or an unverified status check.

The only current collaborator is the owner. Required approvals are zero because an
owner cannot approve their own pull request. This creates a publication checkpoint;
it does not provide independent approval. When a second trusted human reviewer is
available, require one approval, dismiss stale approvals, and verify that both people
can complete a normal PR. Do not count AI review as independent human approval.

An administrator can still change the rules. A compromised Cloudflare session or
deployment credential may also bypass GitHub by publishing directly. Branch rules
are one layer of protection, not a guarantee against an administrator takeover.

## Activation and verification

1. Save the current GitHub rules/branch-protection configuration and Cloudflare's
   current successful **production deployment ID and source commit** in the private
   session note. Read the current settings again to avoid overwriting newer policy.
2. Run `node --test test/*.test.mjs` locally. Review the complete diff, including the
   workflow and font licenses. Get the owner's approval to push and activate policy.
3. Create the baseline ruleset in this repository using the reviewed JSON:

   ```powershell
   gh api --method POST repos/NW-Hiker-Skier/quiet-sky-website/rulesets --input .github/security/main-ruleset.json
   ```

   Record the returned ruleset ID privately. If an equivalent ruleset now exists,
   review and update it instead of creating a duplicate. Verify the returned target,
   active state, exact `main` scope, zero bypass actors, and three expected rules with
   `GET /repos/NW-Hiker-Skier/quiet-sky-website/rulesets/{id}` and
   `GET /repos/NW-Hiker-Skier/quiet-sky-website/rules/branches/main`.
4. Push the approved feature branch, open a PR, and inspect its actual GitHub Actions
   run and Cloudflare preview. The workflow uses Node 24 on a GitHub hosted Ubuntu
   runner, immutable action commits, read-only token permissions, no persisted Git
   credentials, no package installation/cache, and no deploy secrets. Both actions
   use the Node 24 action runtime, requiring runner 2.327.1 or newer; hosted runners
   meet that requirement. Tests execute ordinary PR code, never `pull_request_target`.
5. Confirm `Website security checks` succeeds for the **current PR commit**. Obtain
   the check's exact name and `.app.id` from
   `GET /repos/NW-Hiker-Skier/quiet-sky-website/commits/{sha}/check-runs`; verify
   `.app.slug` is `github-actions`. Add this additional rule to the existing ruleset,
   preserving its other rules and conditions:

   ```json
   {
     "type": "required_status_checks",
     "parameters": {
       "strict_required_status_checks_policy": true,
       "required_status_checks": [
         { "context": "Website security checks", "integration_id": "USE_VERIFIED_NUMERIC_APP_ID" }
       ]
     }
   }
   ```

   The string above is an instruction placeholder, not a valid API payload. Replace
   it with the numeric ID observed on the successful check before the API update.
   Do not use an arbitrary status producer. Do not require Cloudflare Pages as this
   gate: skipped builds or disabled previews can leave that check absent. The
   workflow has no path/branch filters or job conditions, so all changes get tested.
   GitHub's commit-message skip directives can still leave a required run pending;
   avoid those directives on release commits.
6. Re-read the effective rules and PR checks; verify the PR remains mergeable after
   successful checks and conversation resolution. A Git push dry run cannot verify
   server-side rules. Do not test protection by deleting, force pushing, or placing
   malicious content on production. A non-passing check must block merge; inspect
   the PR merge requirements before the first successful run completes.
7. Review the preview at desktop and narrow mobile sizes, all four pages, navigation,
   links and font loading, including network logs for Google Fonts requests. Merge
   only the approved PR. Check production pages/fonts, redirects and security
   headers. Confirm the API and maps endpoints still behave as before; this rollout
   does not change Worker routes, app tokens, API schemas, DNS, or Android/iOS builds.

## Account security follow-up

The owner must personally enroll and test hardware security keys with a spare and
store recovery codes safely for GitHub, Cloudflare, and the recovery email account.
Never put recovery codes, private keys, tokens, or MFA setup QR codes in this repo or
chat. Verify a second sign-in method before removing an existing one.

Review Cloudflare Workers & Pages GitHub App access in GitHub's installation settings;
prefer only the repositories actually deployed. Do not uninstall the shared app or
remove another repository's access without checking its build dependencies. Inventory
Cloudflare API/OAuth credentials privately before revocation or rotation. The same
account hosts mobile app services; broad changes could break their deployments.
Standard Cloudflare Pages Edit permission is account-scoped, not demonstrated to be
restricted to this website. Use the narrowest supported permissions and a separate
release context; do not claim project isolation without verifying it.

## Rollback

If publication is blocked unexpectedly, inspect missing/failed check names and
producer IDs first. Adjust only the newly added status-check requirement if its
context was wrong; preserve PR, deletion, and force-push protections. If necessary,
an administrator can disable the newly created ruleset while fixing it. Record the
reason and restore it after verifying a normal PR. Do not add a permanent bypass.

If the website regresses after merge, use Cloudflare Pages **Deployments → prior
successful production deployment → Rollback to this deployment**, selecting the ID
recorded before release. Preview deployments are not valid rollback targets. Then
revert the bad source commit through a tested PR; a later `main` push can deploy
again. Do not change API/map routes or DNS to roll back website fonts.

## References

- [GitHub ruleset rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- [GitHub status-check protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Checkout runtime and credential inputs](https://github.com/actions/checkout/tree/3d3c42e5aac5ba805825da76410c181273ba90b1)
- [Setup-node runtime and cache inputs](https://github.com/actions/setup-node/tree/949feb2413d6458794dcd2491c4babbbce0c15c1)
- [Cloudflare GitHub integration and access scope](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [Cloudflare Pages rollback](https://developers.cloudflare.com/pages/configuration/rollbacks/)
