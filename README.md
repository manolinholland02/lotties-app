# CI/CD starter (Frontend Development 2)

A small Expo app (login screen + task list) with unit and component tests, but **no CI yet**.
In the workshop you add a GitHub Actions pipeline to it, step by step.

Already have your own project? You can do the same exercises in your own repo instead.

## 0. Before the lecture

- A GitHub account
- Node.js 24 (`node -v`)
- Git (`git --version`)

## 1. Get your own copy

1. Click **Use this template > Create a new repository** (top right of this page).
2. Choose your own account as owner, give it a name, and click **Create repository**.
3. Clone your new repo and install:

   ```bash
   git clone https://github.com/<you>/<your-repo>.git
   cd <your-repo>
   npm ci
   ```

   `npm ci` also gives your copy its own app name, slug and app IDs in `app.json`, based on
   your repo name (see [Using this as your project](#using-this-as-your-project)). Commit that change.

4. Check that everything works locally:

   ```bash
   npm run lint
   npm run typecheck
   npm test
   npx expo start        # press w for the web version
   ```

## What's in here

| Tool | What it tests | Where |
|---|---|---|
| ESLint + TypeScript | code style, type errors | `eslint.config.js`, `tsconfig.json` |
| Jest | pure functions (unit tests) | `__tests__/validation.test.ts`, `__tests__/tasks.test.ts` |
| React Native Testing Library | screens (component tests) | `__tests__/LoginScreen.test.tsx`, `__tests__/HomeScreen.test.tsx` |

## Workshop exercises

### Base track (everyone)

1. **Your first workflow.** Create `.github/workflows/ci.yml` that runs on every pull request
   and every push to `main`. It should check out the code, install Node 24, run `npm ci`,
   and then `npm run lint`, `npm run typecheck` and `npm test -- --ci`.
   Push it and watch it run in the **Actions** tab.
2. **See it fail.** Create a branch, break a test on purpose (or add a lint error),
   push it and open a pull request. The check turns red. Fix it and watch it turn green.
3. **Protect main.** Under **Settings > Branches**, add a rule for `main` that requires
   your CI check to pass before a pull request can be merged.

### Extra track (if you're done early)

4. **Preview link per pull request.** Deploy the web build (`npm run build:web`, output in
   `dist/`) to Vercel from a workflow and post the link as a comment on the PR.
   You need a free Vercel account and the secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID` and
   `VERCEL_PROJECT_ID` (**Settings > Secrets and variables > Actions**). Never put tokens in the code.

## Using this as your project

You can keep building your own app on top of this starter. Every copy of the template starts
with the same `app.json`, so the first `npm ci` on your laptop runs `scripts/setup-app.mjs`
once. It sets values that are unique to your repo, for example for `github.com/jan/hike-app`:

| Field in `app.json` | Value |
|---|---|
| `name` | `Hike App` |
| `slug` | `hike-app` (the project name on expo.dev) |
| `android.package` | `io.github.jan.hike_app` |
| `ios.bundleIdentifier` | `io.github.jan.hike-app` |

That way `eas init` creates **your own** project on expo.dev, and your builds don't clash with
anyone else's. Check `app.json` before your first `eas init`: if the slug is still `cicd-starter`,
run `npm run setup-app` (or `npm run setup-app -- my-app-name` to pick a name yourself).
Want other values? Change them now. After your first `eas build` the IDs are tied to your builds.

Stuck? The finished versions of every step are in the lecture demo repo:
<https://github.com/ahrnuld/cicd-demo> (branches `step-1-ci` … `step-4-preview`).
Try it yourself first.
