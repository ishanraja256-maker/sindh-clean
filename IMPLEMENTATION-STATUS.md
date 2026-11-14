# Clean Sindh — demo build status

## Included in this ZIP
- Reference-style Clean Sindh home dashboard and Sindh visual identity retained.
- Duplicate-report review: matches same-category reports using GPS proximity (100 m), normalized exact location, and shared description/location keywords. Possible duplicates are shown before submission; users can confirm a genuinely separate issue. Duplicate submissions retain a link to the earlier report and are flagged in tracking.
- Smart Intelligence workspace: repeat-report area watchlist, 48-hour overdue review flags, nearest-neighbour ordering of GPS-tagged open reports, verified cleanup-weight register, browser speech-to-text drafting (where supported), location-specific reporting link, and CSV transparency export.
- Existing local camera preview and browser recording/download remain available.
- Report deletion controls remain removed. Reports have no delete action.
- Responsive styling for the added workspace.
- GitHub Pages configuration for the existing public repository path `/sindh-clean/`.
- GitHub Actions workflow to install dependencies, build the production site, and deploy it to GitHub Pages automatically after a push to `main` or `master`.
- Public image paths use the GitHub Pages base path so the dashboard images load under the project URL.

## Demo integration boundaries
This is an upgraded frontend/local-workflow ZIP, not a claim that every external service is live. Existing Firebase web configuration initializes the SDK, but report screens still use browser localStorage. Different laptops do not share localStorage data.

The following need backend/service configuration and end-to-end testing before they can be called operational:
- Firebase Auth sign-in, municipal/admin roles, Firestore/Realtime Database report sync, Storage photo uploads, and secure database rules.
- AI image recognition and photo-similarity matching. The duplicate detector in this ZIP uses GPS, location text, category, and description similarity; it is not an image AI model.
- Real cross-device streaming. Camera preview and recording are local to the current browser; LiveKit/WebRTC signaling, authorized viewers, and STUN/TURN are not configured.
- Actual municipal notifications/escalation delivery. The 48-hour queue is a local review flag only.
- QR image generation. The workspace provides a copyable/printable location-specific report link; a QR-code renderer still needs to be added.
- True offline-to-cloud synchronization. Local submissions remain in this browser until cloud sync is implemented.
- Machine-learning hotspot forecasts. The current watchlist is a transparent repeat-report signal, not a predictive ML model.

## Build verification
A production build could not be run in this packaging environment because npm dependency installation timed out. The included GitHub Actions workflow will run `npm install` and `npm run build` on GitHub and will deploy only if the build succeeds. Check the repository's **Actions** tab after pushing the files.

## Run locally
1. Extract the ZIP.
2. Open the `clean-sindh-react` folder in VS Code.
3. Open Terminal in that folder.
4. Run `npm install`.
5. Run `npm run dev` and open the local URL shown by Vite.

## GitHub Pages setup
Follow `GITHUB-PAGES-SETUP.md`. This ZIP is configured for `https://ishanraja256-maker.github.io/sindh-clean/` and expects the project files (including hidden `.github/workflows/deploy.yml`) at the root of that repository.
