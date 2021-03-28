<a href="https://kommit.rosano.ca"><img alt="Project logo" src="https://rosano.s3.amazonaws.com/public/kommit/identity.svg" width="64" /></a>

# Kommit

_Augment your memory_

<a href="https://kommit.rosano.ca">Kommit</a> is an app to help you with memorization. Inspired by [Anki](https://apps.ankiweb.net) and other spaced-repetition learning systems, it presents flashcards to you just before your brain is likely to forget, thereby strengthening memory while reducing study time. Read the <a href="https://kommit.rosano.ca">guide</a> for more details.

<a href="https://kommit.rosano.ca/review"><img alt="Open app" src="http://rosano.s3.amazonaws.com/public/_shared/_RCSAppButton.svg" /></a>

## Architecture

The project is a large collection of mostly small modules and functions that are put together using [Svelte](https://svelte.dev) and [Rollup](https://rollupjs.org). With the exception of a few 'global' or 'magic' things such as the localization function `OLSKLocalized`, most resources used by a module should be in the same folder or referenced by path name.

Routing, rendering markdown content, and serving pages is done via a Node.js server (usually configured in the *controller.js* files).

## Development Setup

Install [Node.js and npm](https://nodejs.org/en/download/), then:

```
npm run setup
```

This should create an `.env` file if there is none. If you encounter errors referring to this file, you can find missing variables in `.env-sample`.

## Running

### Start the Rollup process to build and reload automatically

```
npm run watch
```

### Start the Node.js server to view in the browser

```
npm start
```

It should be accessible at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.

## Testing

### Run logic tests

```
npm test 
```

### Run interface tests

```
npm test ui
```

To filter interface test paths by string:

```
npm test ui match=Browse
```

To filter interface test paths by JavaScript regular expressions:

```
npm test ui match='/(play|browse)/'
```

## License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

## Questions

Feel free to reach out on [Mastodon](https://merveilles.town/@rosano) or [Twitter](https://twitter.com/rosano).
