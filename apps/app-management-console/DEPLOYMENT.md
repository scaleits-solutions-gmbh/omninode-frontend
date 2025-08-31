Management Console — Vercel Deployment (Option A)

Root Directory project setup (recommended per-app project):

- Root Directory: `apps/app-management-console`
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output: handled by Vercel (Next.js)

Requirements:

- Transpilation: `next.config.ts` already includes `transpilePackages: ['frontend-common-kit']`.
- Shared package build: `frontend-common-kit` uses a `prepare` script, so `pnpm install` will build its `dist/` before the app build.
- GitHub Packages access: set `NODE_AUTH_TOKEN` in Project → Settings → Environment Variables.
- App env vars: replicate required variables from `.env` (Project → Settings → Environment Variables).

Notes:

- This project includes `apps/app-management-console/vercel.json` to pin the install/build commands.
- No additional prebuild hooks are needed; Turbo is not required for per-app builds with this setup.

