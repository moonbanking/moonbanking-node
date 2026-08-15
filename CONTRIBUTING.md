# Contributing

## This repository is generated

Every file in this repository — apart from `.git` — is generated from the
Moon Banking API OpenAPI specification. **Do not edit it by hand**: the next
release will overwrite your changes.

The generator lives in the Moon Banking monorepo at:

    libs/openapi/src/lib/sdk

To change the SDK, change the generator (or the OpenAPI spec that feeds it) and
publish a new release.

## Publishing

Releases are cut from the monorepo, and are always explicit. Pushing a commit to
`master` there whose message contains a version marker:

    [node-sdk 1.2.3]

regenerates this repository at that version, pushes the result, and tags it
`v1.2.3`. The tag triggers `.github/workflows/release.yml` here, which builds
the package and publishes it to npm with provenance.

Commits without a marker release nothing, and the version is never bumped
automatically — the marker is the version. The same release can also be started
by running the "Publish Node SDK" workflow manually in the monorepo.

### Authentication

Publishing uses npm trusted publishing, so there is no npm token to store or
rotate. npm is configured to trust `release.yml` in this repository and issues
a short-lived credential to that workflow over OIDC.

Two consequences worth knowing: renaming or moving `release.yml` breaks
publishing until the trusted publisher is updated on npmjs.com, and the release
job has to run on a GitHub-hosted runner, because npm does not accept OIDC from
self-hosted runners.

## Local development

```sh
npm install
npm run build
npm test
```

## Reporting issues

Please open an issue at https://github.com/moonbanking/moonbanking-node/issues.
