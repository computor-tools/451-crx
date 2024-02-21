# 451-crx

[![Lint](https://github.com/computor-tools/451-crx/actions/workflows/lint.yml/badge.svg)](https://github.com/computor-tools/451-crx/actions/workflows/lint.yml)
[![Dependency review](https://github.com/computor-tools/451-crx/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/computor-tools/451-crx/actions/workflows/dependency-review.yml)


Qubic network utilities in a browser extension. Check [qubic discord](http://discord.gg/2vDMR8m) for more info.

## Usage

### Install deps

```bash
$ pnpm i
```

### Dev mode

* Start dev server listening to port `3000`. It will also create `dist` directory in the project root.
```bash
$ pnpm run dev
```
* Install extension to browser by loading unpacked extension in extensions manager. Select `dist` directory.
For that to work developer mode needs to be on.
* Inspect the extension pop-up to keep it open.
* Editing extension files should trigger HMR to view changes without reloading extension.

> Pop-up page can be accessed from `localhost:3000` too.

### Build for production

```bash
$ pnpm run build
```

## Notes
> 451 uses [`solid.js`](https://solidjs.com) with [`Vite`](https://vitejs.dev/).


> Extension is developed with help of [`crxjs`](https://crxjs.dev/vite-plugin).


## License

451-crx is licenced by Come-from-Beyond's [**ANTI-Military License**](LICENSE).

Noto fonts used by this project are licensed by [OFL license](public/fonts/Noto/OFL.txt).
