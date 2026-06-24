# IP Tracker

**Live site:** https://acordivari.github.io/ip-tracker-rewrite/

A tiny single-page app that shows the geolocation metadata attached to your
public IP address — city, region, country, coordinates, and ISP — alongside a
short, educational write-up on how IP addresses are used to track you online.

Originally written in 2016 with AngularJS 1.x and Bower, it has been rebuilt
from scratch as a dependency-free **vanilla JavaScript** app bundled with
[Vite](https://vitejs.dev/).

## How it works

There is no browser API that returns your *public* IP address. The app makes a
single HTTPS request to [ipwho.is](https://ipwho.is) — a free, keyless
geolocation service that echoes back the IP it sees plus its metadata. If that
lookup fails, it falls back to [ipify](https://www.ipify.org) for the IP alone.
User-controlled values are HTML-escaped before rendering.

## Develop

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Deploy

`npm run build` produces a fully static `dist/` directory that can be hosted
anywhere, including GitHub Pages. The Vite `base` is set to `./` so the build
works whether it is served from a domain root or a project subpath.

This repo deploys automatically: the
[`Deploy to GitHub Pages`](.github/workflows/deploy.yml) workflow builds the
site and publishes it on every push to `master`.
