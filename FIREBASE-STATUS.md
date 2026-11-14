# Firebase connection status

The supplied Clean Sindh Firebase Web App configuration is now added to `src/firebase.js`.
The app initializes Firebase Authentication, Cloud Firestore, and Realtime Database.

## Important before enabling cloud writes

- Keep Firestore and Realtime Database security rules restrictive. Do not publish public read/write rules.
- The existing application does not yet have a sign-in screen or role management. Cloud report writes therefore must not be enabled until authentication and role-based rules are completed.
- `src/services/firebaseReports.js` contains the Firestore report subscription/create helpers for the next integration step.
- Current report screens still use browser-local storage. This package must not be described as fully cloud-synced yet.
- Firebase Storage is not activated by this package. Photo/video cloud upload and cross-device video access need a supported storage solution and security configuration.
- Actual cross-device live streaming still requires WebRTC signaling, authorized access, and a suitable STUN/TURN setup; Firebase initialization alone does not provide streaming.
