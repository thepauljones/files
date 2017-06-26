#! /usr/local/bin/node

const exec = require('shelljs').exec;
const fs = require('fs');
const path = require('path');

const lib = path.join(path.dirname(fs.realpathSync(__filename)), 'package.json');

fs.readFile(path.resolve(__dirname, lib), (err, data) => {
    let jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (exception) {
        console.log(`An error occured parsing your package.json: ${exception}`);
        return;
    }

    const dependencies = jsonData.dependencies;

    if (!dependencies) {
        console.log('No dependencies were found to check');
    }

    function checkVersion(currentPackage, currentVersion) {
        return new Promise((resolve) => {
            exec(`npm show ${currentPackage} version`, { silent: true }, (error, stdout) => {
                const latestVersion = stdout.replace('\n', '');
                if (currentVersion !== latestVersion) {
                    resolve(`${currentPackage} ${currentVersion} -> ${latestVersion}`);
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
        let noneFound = true;
        result.forEach((item) => {
            if (item !== '') {
                noneFound = false;
                console.log(`Package: ${item}`);
            }
        });
        if (noneFound) {
            console.log('No out of date packages were found');
        }
    });
});
