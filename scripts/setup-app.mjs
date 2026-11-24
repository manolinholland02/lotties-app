// scripts/setup-app.mjs
// Gives your copy of the starter its own app name, slug and app IDs, based on your GitHub repo.
//
// Why: every repo made from the template starts with the same app.json. Without this,
// everyone's `eas init` would use the same slug and every build the same Android package /
// iOS bundle ID, so projects and installed apps would get mixed up.
//
// Runs by itself once, during `npm ci` / `npm install` on your laptop (the "prepare" script).
// It does nothing in CI, in the template repo itself, or once app.json has been set up.
// Run it by hand with a name of your choice:  npm run setup-app -- my-app-name

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const TEMPLATE_SLUG = 'cicd-starter';
const TEMPLATE_REPO = 'ahrnuld/cicd-starter';
const APP_JSON = new URL('../app.json', import.meta.url);

const JAVA_KEYWORDS = new Set(
  ('abstract assert boolean break byte case catch char class const continue default do double else enum ' +
    'extends final finally float for goto if implements import instanceof int interface long native new ' +
    'package private protected public return short static strictfp super switch synchronized this throw ' +
    'throws transient try void volatile while true false null').split(' '),
);

const manualName = process.argv[2];
const isPrepare = process.env.npm_lifecycle_event === 'prepare';

if (isPrepare && (process.env.CI || process.env.EAS_BUILD)) process.exit(0);

const appJson = JSON.parse(readFileSync(APP_JSON, 'utf8'));
const expo = appJson.expo;

if (expo.slug !== TEMPLATE_SLUG && !manualName) {
  if (!isPrepare) console.log(`app.json is already set up (slug "${expo.slug}"). Nothing to do.`);
  process.exit(0);
}

function githubRepo() {
  try {
    const url = execSync('git config --get remote.origin.url', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    const m = url.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?\/?$/i);
    return m ? { owner: m[1], repo: m[2] } : null;
  } catch {
    return null;
  }
}

const gh = githubRepo();
if (!manualName && (!gh || `${gh.owner}/${gh.repo}`.toLowerCase() === TEMPLATE_REPO)) {
  if (!isPrepare) {
    console.log('No GitHub remote found (or this is the template itself).');
    console.log('Pick a name yourself:  npm run setup-app -- my-app-name');
  }
  process.exit(0);
}

const owner = gh ? gh.owner : 'student';
const repo = manualName || gh.repo;

const slug = repo.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'my-app';

// Android: letters, digits and underscores; each part starts with a lowercase letter; no Java keywords
const androidPart = (s) => {
  let p = s.toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '');
  if (!/^[a-z]/.test(p)) p = `app${p}`;
  if (JAVA_KEYWORDS.has(p)) p = `${p}_app`;
  return p;
};
// iOS: letters, digits, hyphens
const iosPart = (s) => s.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'app';

const name = slug.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
const androidPackage = `io.github.${androidPart(owner)}.${androidPart(repo)}`;
const bundleIdentifier = `io.github.${iosPart(owner)}.${iosPart(repo)}`;

expo.name = name;
expo.slug = slug;
expo.android = { ...expo.android, package: androidPackage };
expo.ios = { ...expo.ios, bundleIdentifier };

writeFileSync(APP_JSON, JSON.stringify(appJson, null, 2) + '\n');

console.log(`
  app.json is now set up for ${manualName ? `"${repo}"` : `${owner}/${repo}`}:
    name                  ${name}
    slug                  ${slug}
    android.package       ${androidPackage}
    ios.bundleIdentifier  ${bundleIdentifier}

  Commit app.json. You can change these values yourself, but do it before your
  first \`eas init\` / \`eas build\`: after that, the IDs are tied to your builds.
`);
