import { appendFileSync, readFileSync } from 'node:fs';

const CJS_BUNDLE = new URL('../dist/index.js', import.meta.url);

const interop = `
// CommonJS interop: expose the client class as \`module.exports\` while keeping
// every named export attached, so both of these work:
//   const MoonBanking = require('moonbanking');
//   const { APIError } = require('moonbanking');
if (typeof module !== 'undefined' && module.exports && module.exports.MoonBanking) {
  const _client = module.exports.MoonBanking;
  Object.assign(_client, module.exports);
  module.exports = _client;
}
`;

const contents = readFileSync(CJS_BUNDLE, 'utf-8');

if (contents.includes('CommonJS interop')) {
  console.log('postbuild: interop shim already present, skipping');
} else {
  appendFileSync(CJS_BUNDLE, interop);
  console.log('postbuild: appended CommonJS interop shim to dist/index.js');
}
