const exec = require('child_process').exec;
const pkg = require('./package.json');

const dependencies = pkg.dependencies;

function checkVersion(currentPackage, currentVersion) {
    return new Promise((resolve) => {
        exec(`npm show ${currentPackage} version`, (error, stdout, stdin) => { // eslint-disable-line
            const latestVersion = stdout.replace('\n', '');
            if (currentVersion !== latestVersion) {
                resolve(`${currentPackage} ${currentVersion} -> ${stdout}`);
            } else {
                resolve('');
            }
        });
    });
}

const allChecks = [];
for (const installed of Object.keys(dependencies)) {
    const version = dependencies[installed].replace('^', '');
    allChecks.push(checkVersion(installed, version));
}

Promise.all(allChecks).then((result) => {
    result.forEach((item) => {
        if (item !== '') {
            console.log(`${item}`);
        }
    });
});
