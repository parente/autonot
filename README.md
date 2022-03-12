# sveltekit-tailwind-pages

SvelteKit app styled with Tailwind for deployment to Cloudflare pages

## Local

```bash
npm init
npm run dev # or
wrangler pages dev -- npm run dev # or
npm run preview
```

## Pages Setup

Must be done with click ops on the Cloudflare dashboard

- Create a Pages project
- Choose the GitHub repository
- Choose SvelteKit as the app framework
- Enable fast builds
- Set `NODE_VERSION=16` as a build environment variable
- Enable preview branch protection with Cloudflare Access
- Optionally configure production branch protection with Cloudflare Access
- Optionally configure Cloudflare KV and Durable objects
