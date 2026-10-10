# Verification — October 10, 2026

## Automated checks

- [x] `npm run check`: no errors, warnings, or hints.
- [x] `npm test`: five behavioral tests passed, including all 18 combinations of concerning/emergency answers and movement preferences.
- [x] `npm run build`: 13 static HTML pages plus the sitemap.
- [x] `python3 scripts/check-built-site.py`: 322 internal links and local asset references resolved; fragment IDs, unique IDs, and one primary heading per page checked.
- [x] Dependency installation reported no known vulnerabilities.
- [x] `git diff --check`: no whitespace errors.

## Browser checks

Verified against the production build in the Codex browser:

- [x] Mascot toggles change both the illustration and the pressed state.
- [x] Empty check-in submission presents validation and focuses the missing answer.
- [x] Emergency and concerning symptoms immediately show care guidance and hide ordinary questions.
- [x] Clear answers produce the expected movement recommendation; its link opens the library.
- [x] Movement filters show the appropriate two guides and update the accessible status.
- [x] Timer starts, pauses, advances through all three invitations, completes, disables skip, and resets.
- [x] Mobile menu opens and navigates to the correct page.
- [x] Home, guide, library, exercise detail, check-in, timer, and sources fit a 390px viewport without horizontal overflow.
- [x] Home also fits a 320px viewport without horizontal overflow.
- [x] Desktop home and mobile home/guide/library visually inspected.
- [x] Published home loaded without captured console errors.

The pure timer tests verify elapsed-time accounting, pause/resume, skipping, and completion boundaries. The visibility-change handler pauses when the document is hidden; a full real-time three-minute browser session was not separately timed. Print styling, reduced-motion CSS, and no-JavaScript fallbacks are implemented, but were not separately audited with a screen reader, print dialog, or OS-level accessibility settings. This is not a formal WCAG conformance or clinical review.

## Publication

- [x] Public source repository: https://github.com/crs48/deadbutt
- [x] GitHub Pages uses the Actions workflow; pull requests cannot deploy.
- [x] Custom domain: https://deadbutt.fyi
- [x] Existing apex DNS matched GitHub Pages before configuration.
- [x] GitHub issued the domain certificate and HTTPS enforcement was enabled.
- [x] Initial build and deployment succeeded: https://github.com/crs48/deadbutt/actions/runs/38045464314
- [x] Live HTTPS response returned 200 and the published design was inspected in a browser.

The screenshot in `artifacts/deadbutt-live.jpg` is a local handoff artifact and is intentionally ignored by Git.
