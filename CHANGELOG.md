# Changelog

## 0.6.4 (2026-02-02)

Full Changelog: [v0.6.3...v0.6.4](https://github.com/moonbanking/moonbanking-node/compare/v0.6.3...v0.6.4)

### Chores

* comment out NPM_TOKEN validation in check-release-environment script ([2e691e3](https://github.com/moonbanking/moonbanking-node/commit/2e691e31026d1af61b2f544dc6abd79dc2119820))
* update Node.js version and npm in publish workflow ([0d7ce41](https://github.com/moonbanking/moonbanking-node/commit/0d7ce41b6f8d5c4c70ceaf9ba952214f7ba19532))

## 0.6.3 (2026-02-02)

Full Changelog: [v0.6.2...v0.6.3](https://github.com/moonbanking/moonbanking-node/compare/v0.6.2...v0.6.3)

### Chores

* update npm publish workflow and script ([979d997](https://github.com/moonbanking/moonbanking-node/commit/979d997c8757032e4a66dc270b92a524c410e7ca))

## 0.6.2 (2026-02-01)

Full Changelog: [v0.6.1...v0.6.2](https://github.com/moonbanking/moonbanking-node/compare/v0.6.1...v0.6.2)

### Chores

* update GitHub Actions workflow and npm publish script ([a9a120a](https://github.com/moonbanking/moonbanking-node/commit/a9a120a71a353d2f158cc1db8ed29d961a70ec9f))

## 0.6.1 (2026-02-01)

Full Changelog: [v0.6.0...v0.6.1](https://github.com/moonbanking/moonbanking-node/compare/v0.6.0...v0.6.1)

### Chores

* update npm publish configuration and README link ([b35b019](https://github.com/moonbanking/moonbanking-node/commit/b35b019525c14394677723b73a53cdc53ea21be3))

## 0.6.0 (2026-02-01)

Full Changelog: [v0.5.0...v0.6.0](https://github.com/moonbanking/moonbanking-node/compare/v0.5.0...v0.6.0)

### Features

* **api:** update api ([26e2db4](https://github.com/moonbanking/moonbanking-node/commit/26e2db4a4f979004d955ce9439d58bfa8f01acc8))


### Chores

* **ci:** upgrade `actions/github-script` ([adeedd3](https://github.com/moonbanking/moonbanking-node/commit/adeedd3126566a62911defe9dcabf577abf080e6))
* **internal:** update `actions/checkout` version ([22b3d42](https://github.com/moonbanking/moonbanking-node/commit/22b3d42ebef64672164f3f1121b34c86e04b0298))
* **internal:** upgrade babel, qs, js-yaml ([c2e3923](https://github.com/moonbanking/moonbanking-node/commit/c2e39237f6071633bba94d888be02cfe336942ae))

## 0.5.0 (2026-01-08)

Full Changelog: [v0.4.1...v0.5.0](https://github.com/moonbanking/moonbanking-node/compare/v0.4.1...v0.5.0)

### Features

* **api:** manual updates ([8bc0415](https://github.com/moonbanking/moonbanking-node/commit/8bc0415181d2ffea45f9dfce5404446ab00c85e1))
* **api:** update api ([2fc6d4d](https://github.com/moonbanking/moonbanking-node/commit/2fc6d4ddbd2bae23a4563f037a4550df894c3c6f))


### Chores

* break long lines in snippets into multiline ([9b54938](https://github.com/moonbanking/moonbanking-node/commit/9b5493841a9de82bec8777bcf7c819b97e22828e))
* **internal:** codegen related update ([580f0c7](https://github.com/moonbanking/moonbanking-node/commit/580f0c795b9e5e86087d97206a5a2047945edc89))

## 0.4.1 (2025-12-22)

Full Changelog: [v0.4.0...v0.4.1](https://github.com/moonbanking/moonbanking-node/compare/v0.4.0...v0.4.1)

## 0.4.0 (2025-12-22)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/moonbanking/moonbanking-node/compare/v0.3.0...v0.4.0)

### ⚠ BREAKING CHANGES

* **mcp:** remove deprecated tool schemes
* **mcp:** **Migration:** To migrate, simply modify the command used to invoke the MCP server. Currently, the only supported tool scheme is code mode. Now, starting the server with just `node /path/to/mcp/server` or `npx package-name` will invoke code tools: changing your command to one of these is likely all you will need to do.

### Features

* **api:** manual updates ([b41a32d](https://github.com/moonbanking/moonbanking-node/commit/b41a32d78dc427a8ba3466603af9f7a4f8a3a935))
* **mcp:** add typescript check to code execution tool ([903ec57](https://github.com/moonbanking/moonbanking-node/commit/903ec5716e95e7b47745678e42c4eeaec9324591))
* **mcp:** handle code mode calls in the Stainless API ([039f192](https://github.com/moonbanking/moonbanking-node/commit/039f1921d8987e664566f1da698f6ce1a46e9ebe))


### Bug Fixes

* **mcp:** add client instantiation options to code tool ([e0285fa](https://github.com/moonbanking/moonbanking-node/commit/e0285fafc76ce57fa8844992862765d5857df710))
* **mcp:** correct code tool API endpoint ([57cbfab](https://github.com/moonbanking/moonbanking-node/commit/57cbfabc49fa839e6f33c44fb3472870e9b62fe4))
* **mcp:** pass base url to code tool ([d2942f8](https://github.com/moonbanking/moonbanking-node/commit/d2942f8178692e94a7d28ebf6f3cd03151c1afc6))
* **mcp:** return correct lines on typescript errors ([f5ea1d9](https://github.com/moonbanking/moonbanking-node/commit/f5ea1d9f9a53014e46fca4d532cebb9ec5eaa113))


### Chores

* **internal:** codegen related update ([cfdd0c0](https://github.com/moonbanking/moonbanking-node/commit/cfdd0c0cf46a48a0c1a3138d3c105dc15cf4da89))
* **internal:** codegen related update ([f4e6f4e](https://github.com/moonbanking/moonbanking-node/commit/f4e6f4e7fee33dab4d4ee7f0158d36b04ce2280e))
* **internal:** upgrade eslint ([5a0c8e0](https://github.com/moonbanking/moonbanking-node/commit/5a0c8e0d7cbafa6c9bd81aa35bd0156d23ddd387))
* **mcp:** remove deprecated tool schemes ([07646f9](https://github.com/moonbanking/moonbanking-node/commit/07646f90b3a40452b7f598097259cc5268703a34))
* **mcp:** update lockfile ([ea37f3e](https://github.com/moonbanking/moonbanking-node/commit/ea37f3e1019ffb3c5f63206d943b66cd8f31bae6))
* use latest @modelcontextprotocol/sdk ([3089564](https://github.com/moonbanking/moonbanking-node/commit/30895647ba16394ab7d02329c629e290de6e104b))

## 0.3.0 (2025-12-02)

Full Changelog: [v0.2.1...v0.3.0](https://github.com/moonbanking/moonbanking-node/compare/v0.2.1...v0.3.0)

### Features

* **mcp:** add detail field to docs search tool ([c8f0848](https://github.com/moonbanking/moonbanking-node/commit/c8f0848c6ba753de5738bafd15f88c914a2fc764))
* **mcp:** return logs on code tool errors ([d8c5233](https://github.com/moonbanking/moonbanking-node/commit/d8c5233161e977c5a8db65a9595b6e2fccca875b))


### Bug Fixes

* **mcp:** return tool execution error on api error ([429bc70](https://github.com/moonbanking/moonbanking-node/commit/429bc70de0eff55bc6e99849ec78fd026fa250c2))


### Chores

* **client:** fix logger property type ([4eb05f5](https://github.com/moonbanking/moonbanking-node/commit/4eb05f56c33f41f727fa193d7b8c18f02da56edc))

## 0.2.1 (2025-11-14)

Full Changelog: [v0.2.0...v0.2.1](https://github.com/moonbanking/moonbanking-node/compare/v0.2.0...v0.2.1)

### Bug Fixes

* **mcp:** return tool execution error on jq failure ([ad323a3](https://github.com/moonbanking/moonbanking-node/commit/ad323a376f96bd8e4d0ef9b98c17558906495a22))


### Chores

* **mcp:** upgrade jq-web ([d018476](https://github.com/moonbanking/moonbanking-node/commit/d018476963cfd90728d12280982ff73ec47ae0fb))

## 0.2.0 (2025-11-13)

Full Changelog: [v0.1.3...v0.2.0](https://github.com/moonbanking/moonbanking-node/compare/v0.1.3...v0.2.0)

### Features

* **api:** update api ([0cad870](https://github.com/moonbanking/moonbanking-node/commit/0cad870065a144c3261c3439d5dc938e93d21c79))
* **mcp:** enable optional code execution tool on http mcp servers ([f35e2aa](https://github.com/moonbanking/moonbanking-node/commit/f35e2aaa600ac915b98b3c7dbbc37e939261d13a))


### Bug Fixes

* **mcpb:** pin @anthropic-ai/mcpb version ([30883d3](https://github.com/moonbanking/moonbanking-node/commit/30883d3492aecb258dcef7cc2b2e1d944c624f17))


### Chores

* **internal:** codegen related update ([95ff3cb](https://github.com/moonbanking/moonbanking-node/commit/95ff3cbee31fa7018a7d6c484705f0a5e950c8d8))
* **internal:** codegen related update ([3e037d4](https://github.com/moonbanking/moonbanking-node/commit/3e037d41d1d7009d77a3a17375fa758728fe9276))
* **internal:** grammar fix (it's -&gt; its) ([3702828](https://github.com/moonbanking/moonbanking-node/commit/3702828724bee3f8338332127a12923e54557280))
* mcp code tool explicit error message when missing a run function ([3fad476](https://github.com/moonbanking/moonbanking-node/commit/3fad4765f9d57783bfe86df8a924906f0b9d8a75))
* **mcp:** add friendlier MCP code tool errors on incorrect method invocations ([a8cef91](https://github.com/moonbanking/moonbanking-node/commit/a8cef911d8b33dd46698a58980bcb5cd2a9de3db))
* **mcp:** add line numbers to code tool errors ([24df376](https://github.com/moonbanking/moonbanking-node/commit/24df376bd5cef448a340fc92f1df864bff9321ea))
* **mcp:** clarify http auth error ([a2845f7](https://github.com/moonbanking/moonbanking-node/commit/a2845f771094b34fd5017b5ffbb787818e577fa5))
* use structured error when code execution tool errors ([a113bb1](https://github.com/moonbanking/moonbanking-node/commit/a113bb149a8fef41bc41aaf388f4939903cc6e1c))


### Documentation

* **mcp:** add a README button for one-click add to Cursor ([21cf3a8](https://github.com/moonbanking/moonbanking-node/commit/21cf3a84e12fc9a34b7592a58467a2a63eb58f58))
* **mcp:** add a README link to add server to VS Code or Claude Code ([46103f3](https://github.com/moonbanking/moonbanking-node/commit/46103f3065e91ef07aeb4a2318b0dc2f0ccaa8c9))

## 0.1.3 (2025-10-31)

Full Changelog: [v0.1.2...v0.1.3](https://github.com/moonbanking/moonbanking-node/compare/v0.1.2...v0.1.3)

## 0.1.2 (2025-10-30)

Full Changelog: [v0.1.1...v0.1.2](https://github.com/moonbanking/moonbanking-node/compare/v0.1.1...v0.1.2)

## 0.1.1 (2025-10-30)

Full Changelog: [v0.1.0...v0.1.1](https://github.com/moonbanking/moonbanking-node/compare/v0.1.0...v0.1.1)

### Features

* **api:** update api ([0591d8f](https://github.com/moonbanking/moonbanking-node/commit/0591d8f30c8b3156afecdd9aeda4b732d9f6b0b4))

## 0.1.0 (2025-10-29)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/moonbanking/moonbanking-node/compare/v0.0.1...v0.1.0)

### Features

* **api:** manual updates ([9e6e61d](https://github.com/moonbanking/moonbanking-node/commit/9e6e61d281f83beeb691ddd9e85b7cb2f04fb1f2))
* **api:** manual updates ([fe529df](https://github.com/moonbanking/moonbanking-node/commit/fe529dfc7107928dadbaf13f1ed4532817e3d550))
* **api:** manual updates ([eeac3e1](https://github.com/moonbanking/moonbanking-node/commit/eeac3e1640aba4e108f88616ee8e1272ea9a7cd4))
* **api:** manual updates ([0fb600b](https://github.com/moonbanking/moonbanking-node/commit/0fb600b6c1fa7f690ea7b3f1bc801e6434547292))
* **api:** manual updates ([dd10721](https://github.com/moonbanking/moonbanking-node/commit/dd107218aa43b8000ab06cc287e8dba9a66ec147))
* **api:** manual updates ([0ab8f77](https://github.com/moonbanking/moonbanking-node/commit/0ab8f77481c1466f7b357d880f946679beaf8654))
* **api:** manual updates ([56ae087](https://github.com/moonbanking/moonbanking-node/commit/56ae0870ef18413f6e4b0d923bdd557b04ea305f))
* **api:** manual updates ([14afa94](https://github.com/moonbanking/moonbanking-node/commit/14afa94f75439085b5178d19763a410f36dd8b5c))
* **api:** manual updates ([b162b1a](https://github.com/moonbanking/moonbanking-node/commit/b162b1a6d21f101a1b49ade78a19e76ffb465753))
* **api:** manual updates ([c7f5935](https://github.com/moonbanking/moonbanking-node/commit/c7f593529f5521899f5d0c7c08f4139dae15b4b5))
* **api:** manual updates ([ff36e42](https://github.com/moonbanking/moonbanking-node/commit/ff36e421ab902ea16b220708f027c0b22018b43c))
* **api:** manual updates ([7fe9b0d](https://github.com/moonbanking/moonbanking-node/commit/7fe9b0dd545d05801b12dd1fcf38a83539eb8af9))
* **api:** manual updates ([0fd2650](https://github.com/moonbanking/moonbanking-node/commit/0fd2650f69ae32a0ace87bd781dc3ce8d3d372f6))
* **api:** manual updates ([5ca5b80](https://github.com/moonbanking/moonbanking-node/commit/5ca5b807946ae518b92a5b520e0ab52f7db8da81))
* **api:** manual updates ([ed9aa4f](https://github.com/moonbanking/moonbanking-node/commit/ed9aa4ff3eef413045a8924f6982f8a89f27848a))
* **api:** manual updates ([1f15366](https://github.com/moonbanking/moonbanking-node/commit/1f15366d86d51ff6774661e90dab74262eb25418))
* **api:** manual updates ([bb084ae](https://github.com/moonbanking/moonbanking-node/commit/bb084aef7f204b7aae6f1d655000668bd8b7da81))
* **api:** manual updates ([1173cbe](https://github.com/moonbanking/moonbanking-node/commit/1173cbe4e851ad9624c05bd5a4e33d2076ace84f))
* **api:** manual updates ([64ac630](https://github.com/moonbanking/moonbanking-node/commit/64ac630c5d602fa32943100c88cf9f1c56f32066))


### Chores

* configure new SDK language ([c174245](https://github.com/moonbanking/moonbanking-node/commit/c174245d4be9fa53b2eec3485453f0b0f260d651))
* update SDK settings ([5a3f039](https://github.com/moonbanking/moonbanking-node/commit/5a3f0391dfc4bb3de3e016ef74ddedf59db58f64))
* update SDK settings ([af0b0e1](https://github.com/moonbanking/moonbanking-node/commit/af0b0e153c4e7774f95a7d416d0ba884ad36c4df))
