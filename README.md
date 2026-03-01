# autonot

Short for "automate or not", this web app is:

- A calculator based on [xkcd #1205](https://xkcd.com/1205/)
- An excuse to learn some SvelteKit, Tailwind, and Cloudflare Pages

The source code here is [MIT licensed](./LICENSE.md). The xkcd web comic is a work by Randall Monroe
under a [Creative Commons Attribution-NonCommercial 2.5 License](https://xkcd.com/license.html). The
favicon is from [Twemoji](https://twemoji.twitter.com/) by Twitter under a [Creative Commons
Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

## Prerequisites

- Node.js 20 (`.nvmrc` and `package.json#engines` are pinned to `>=20 <21`)
- npm

## Local Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run check
npm run build
```

## Deployment (Cloudflare Pages)

This app uses the SvelteKit Cloudflare adapter (`@sveltejs/adapter-cloudflare`) and includes a
[`wrangler.toml`](./wrangler.toml) with an explicit compatibility date and Worker entrypoint.

Cloudflare Pages should build with standard npm install/build steps and does not require
`--force`/`--legacy-peer-deps`.
