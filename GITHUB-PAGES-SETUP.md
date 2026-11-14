# GitHub Pages demo deployment (free)

This project is configured for the existing repository URL:
`https://ishanraja256-maker.github.io/sindh-clean/`

## One-time setup
1. Extract this ZIP and open the `clean-sindh-react` folder.
2. On GitHub, open the existing `sindh-clean` repository.
3. Upload/replace the project files and folders from this folder in the repository root. Include the hidden `.github` folder and its `workflows/deploy.yml` file.
4. Commit the changes to the `main` branch (or `master` if that is the repository's default branch).
5. In the repository, open **Settings → Pages**.
6. Under **Build and deployment → Source**, select **GitHub Actions**.
7. Open the **Actions** tab and wait for **Deploy Clean Sindh to GitHub Pages** to finish successfully.
8. Open `https://ishanraja256-maker.github.io/sindh-clean/` and refresh.

## Local preview
Run `npm install`, then `npm run dev`. For a production check, run `npm run build` and then `npm run preview`.

## Notes
- GitHub Pages hosting is free for public repositories on GitHub Free.
- The workflow installs dependencies and builds the site on GitHub; a local `node_modules` folder is not required in the ZIP.
- This is a demo frontend. Reports are stored in the current browser only until Firebase is configured. Two different laptops will not share report data yet.
- Camera preview/recording is local to the browser. Cross-device live streaming is not configured yet.
- Firebase, AI recognition, secure user roles, cloud uploads, and live-streaming services are intentionally left for the later integration phase.
- Do not upload Firebase service-account private keys or other secrets to this public repository.
