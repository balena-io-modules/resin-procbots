# procbots

Process bots used for automating the development and deployment CI pipeline.

This README aims to get the reader up to speed with both running and developing ProcBots.

## Installation

Run `npm install` in the root `balena-procbots` repository.

ProcBots uses a dynamic loader to execute its Client Bots. The `PROCBOT_BOTS_TO_LOAD` environment variable needs to be set to a valid ProcBot instance (the name of which corresponds to the bot names in `lib/bots`, eg. `versionbot`).

Other environment variables are required depending on the ProcBot being executed. Please see the section at the bottom of this README which has links to each individual bots own documentation.

### `balena-on-balena` Deployment

Create new app, add appropriate git remote for balena.io.

```
gulp build
git push balena master
```

Appropriate environment variables are required before execution. See below.

### Kubernetes Deployment

Deploying to a local K8 cluster (or to an already existing environment) requires a bit of implicit knowledge. A framework for doing this within balena exists. Please speak to DevOps.

### Running Locally

```
PROCBOT_BOTS_TO_LOAD=<name> npm start
```

If the Client Bot listens to an external service (eg. Github, Front, Discourse, etc), then those services should have their webhook endpoints set to your local machine. This can be achieved via a proxy, such as `ngrok`. For example, the Github ServiceListener for `VersionBot` listens on port 4567. Running:
```
ngrok http 4567
```
Will produce an HTTPS url (eg. https://12345.ngrok.io) that can then be used as the Github App webhook URL.

## Development

Developing ProcBots requires some core knowledge of the concepts behind them, see the Architecture document linked to at the bottom of this README for more information.

### Security

Most Client Bots will require secure keys or tokens to operate. These should be passed as environment variables. This allows ProcBots to:
* Stay open, without the need for any obfuscation or private submodules
* Allow the security to become a deployment environment function

As the latter changes radically between deployment solutions, this allows the ProcBot framework itself to stay agnostic.

### Building

Building tasks are implemented in [`gulp`](http://gulpjs.com/), and these tasks are defined in the `gulpfile.js` file.

`gulp build` will:
* lint the codebase
* Transpile the TypeScript source (in `lib`) into JavaScript (in `build`), copying any required definitions
* Produce documentation (output to the `docs` directory as HTML)

Development itself is agnostic, but currently this repository includes a `.vscode` directory that has configuration for this editor. This has tasks setup, so buliding from within VSCode will automatically run the `gulp` tasks and then launch the ProcBots framework.

### Testing

Testing is done using the [`mocha`](https://mochajs.org/) framework. Tests are containg withing the `tests` directory, which mimics the structure of the `lib` directory. Test files should end with `.spec.ts`.

To run the tests use `npm test`.

## Contributions

Whilst this is a [balena.io](http://balena.io) project, we welcome any contributions to the ProcBots project, including issue reports, ideas for features, new Client Bots, etc.

## Architecture

[The full architecture documentation.](https://github.com/balena-io-modules/balena-procbots/blob/master/docresources/Architecture/procbot-architecture.md)

## VersionBot

* [VersionBot HowTo](https://github.com/balena-io-modules/balena-procbots/blob/master/docresources/VersionBot/versionbot.md)

## SyncBot

* [SyncBot getting started for users.](https://github.com/balena-io-modules/balena-procbots/blob/master/docresources/SyncBot/syncbot-readme.md)

## KeyframeBot

* [KeyframeBot HowTo](https://github.com/balena-io-modules/balena-procbots/blob/master/docresources/KeyframeBot/keyframebot.md)

## NotifyBot

* [NotifyBot HowTo](https://github.com/balena-io-modules/balena-procbots/blob/master/docresources/NotifyBot/notifybot.md)
