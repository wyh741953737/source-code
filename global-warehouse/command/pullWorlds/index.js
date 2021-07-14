const langBuild = require('cj-lang-build');
const config = require('../reportWorlds/config');

console.log(config.pullWorldsApi);
console.log(config.applicationId);
console.log(config.pullLocation);

langBuild.langBuildNew(
  {
    apiUrl: config.pullWorldsApi,
    appId: config.applicationId,
    outPath: config.pullLocation,
  },
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log('success');
    }
  },
);
