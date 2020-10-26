<a href="https://kommit.dev"><img src="https://kommit.dev/identity.svg" width="64"></a>

# Kommit

_Augment your memory_

<a href="https://kommit.dev">Kommit</a> is an app to help you with memorization. Inspired by [Anki](https://apps.ankiweb.net) and other spaced-repetition learning systems, it presents flashcards to you just before your brain is likely to forget, thereby strengthening memory while reducing study time.

<a href="https://kommit.dev/review"><img alt="Open app" src="http://rosano.s3.amazonaws.com/public/_RCSAppButton.svg" /></a>

## Architecture

The project is a large collection of mostly small modules and functions that are put together using [Svelte](https://svelte.dev) and [Rollup](https://rollupjs.org). With the exception of a few 'global' or 'magic' things such as the localization function `OLSKLocalized`, most resources used by a module should be in the same folder or referenced by path name.

Routing, rendering markdown content, and serving pages is done via a Node.js server (usually configured in the *controller.js* files).

## Installing

```
npm install --no-save
```

## Running

### Start the Rollup build/reload process

```
npm run watch
```

### Start the Node.js server

```
npm start
```

It should be accessible at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.

## Testing

Restart the test runner when creating new files so that they will be included (specifically test files, and localization files).

### Setup

Install mocha and supervisor

```
npm install -g mocha supervisor
```

### Run logic tests

```
olsk-spec
```

### Run interface tests

```
olsk-spec-ui
```

To filter test paths by string:

```
olsk-spec-ui -os-match=browse
```

## License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

## Questions

Let's chat on [Mastodon](https://merveilles.town/@rosano).
