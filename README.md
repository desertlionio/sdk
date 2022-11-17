<img src="https://app.desertlion.io/images/logo.svg" alt="Desert Lion Logo" style="height: 80px; width:80px;" height="80px" width="80px" />

# Official Desert Lion SDK

## Links

- [Docs](desertlion.io/docs)
- [Dashboard](app.desertlion.io)

## Installation

### NPM

```bash
npm install desertlion
```

### Yarn

```bash
yarn add desertlion
```

## Usage

1. Start using Desert Lion by importing the library.

```javascript
import desertlion from '@desertlionio/sdk';
```

2. Later on, add this to `_app.tsx` for `Next.js` applications, and in `index.tsx` for `React` applications.

```javascript
desertlion.init({
  appId: '',
  userIdentifier: '',
});
```

3. Optional - Identify the user later on, only after login.

```javascript
desertlion.identifyUser({
  userIdentifier: '',
});
```

## Open Source

- [css-selector-generator](https://github.com/fczbkk/css-selector-generator) by [fczbkk](https://github.com/fczbkk) MIT-licensed
- [error-stack-parser](https://github.com/stacktracejs/error-stack-parser) by [stacktracejs](https://github.com/stacktracejs) MIT-licensed
- [rrweb](https://github.com/rrweb-io/rrweb) by [rrweb-io](https://github.com/rrweb-io) MIT-licensed
