# Clean Sindh — React + Vite foundation

This is the first React migration build for Clean Sindh. It uses the agreed visual direction:
**Sindhi Cultural + Modern Professional**, while establishing a modular React codebase.

## What works in this build

- React + Vite application structure.
- Responsive sidebar, top bar, dashboard and page navigation.
- Report submission saved in this browser's localStorage.
- Optional browser GPS capture for reports.
- Optional local image attachment (small images only).
- Unique report reference IDs and basic duplicate warning.
- Report register with search.
- Interactive OpenStreetMap view for GPS-tagged local reports.
- Camera preview using browser camera permission.
- Local MediaRecorder video recording and download where supported.
- Online/offline device status indicator.

## What is intentionally not claimed as complete

- Firebase Auth, Firestore and Realtime Database are not connected yet.
- Cross-device live streaming is not implemented. Camera preview and recording are local-device features only.
- AI waste classification is not connected to a trained model.
- Hotspot prediction, route optimization, municipal role permissions, cloud media uploads,
  rewards, cleanup certificates, multilingual content and PDF research exports are not complete.
- The municipal, analytics, community, awareness and admin pages are clearly marked as planned modules.

## Requirements

- Node.js 20.19+ or 22.12+ recommended.
- npm.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## GitHub Pages

This project is configured with `base: "./"` in `vite.config.js`. Build with `npm run build`,
then publish the contents of `dist/` using GitHub Actions or your chosen Pages deployment workflow.
Do not upload the source folder as the production site.

## Firebase integration next

1. Confirm the Firebase Web App configuration from Firebase Console.
2. Add the public web app config to a dedicated environment file.
3. Initialize Firebase Auth, Firestore and Realtime Database.
4. Design and test Firestore and RTDB security rules before enabling writes.
5. Implement role-based access using trusted server-side/admin provisioning.
6. Keep service-account keys and private secrets out of the browser bundle.

Firebase Storage is not assumed in this Spark-plan build. Select a compatible media storage option
before implementing report-photo and recording uploads.

## Design notes

Ajrak-inspired accents are intentionally subtle. The core interface prioritizes readability,
clear operational hierarchy and responsive behavior rather than decorative template effects.


## Existing website reference

The `reference/existing-enhanced-site-reference.html` file is included as a visual/behavior
reference for the next migration iterations. It is not loaded by the React application.
Compare the existing sections and branding against the React pages before considering the
migration visually complete. The React build is a first foundation, not a claim that every
legacy interaction or all 19 planned features have been migrated.


## Firebase configuration

The Firebase Web App configuration supplied for project `cleansindh-95a09` has been added to `src/firebase.js`. Firebase App, Authentication, Cloud Firestore, and Realtime Database initialize from that file. This is the connection foundation only: the current report screens still use local browser storage until a sign-in flow and restrictive security rules are completed. See `FIREBASE-STATUS.md` for exact status and remaining steps.

## Updated workspace modules

This update restores the heritage-led homepage and adds usable local workflows:

- Municipal operations: filter the report queue and change report status.
- Impact & analytics: live counts and category/month breakdowns calculated only from saved reports.
- Community missions: add, complete and delete local cleanup goals.
- Awareness hub: practical waste handling and reporting guidance.
- Administration: export the local report register to CSV or clear local reports with confirmation.

### Important integration boundaries

Reports and community missions in this build are stored in the current browser's local storage. They do not automatically synchronize between laptops or browsers. The Firebase project configuration is present, but authenticated cloud report sync, Storage uploads, secured admin roles and WebRTC cross-device camera broadcasting are not enabled by this ZIP. The camera page is a local camera preview/recording tool only. Do not present these cloud or cross-device functions as active until their Firebase rules, authentication, storage and streaming/signalling services have been configured and tested.

### Run locally

1. Install Node.js LTS.
2. Open this project folder in VS Code.
3. In the terminal run `npm install`.
4. Run `npm run dev` and open the local URL printed by Vite.
5. To create a production build, run `npm run build`.


## Latest upgrade notes
See [IMPLEMENTATION-STATUS.md](./IMPLEMENTATION-STATUS.md) for the new Smart Intelligence workspace, duplicate-report matching, and an honest checklist of integrations that still require Firebase/backend and streaming credentials. Reports are not deletable from the UI.
