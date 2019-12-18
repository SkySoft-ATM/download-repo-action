const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

async function run() {
    try {
        const token = core.getInput('github-token', { required: true });
        const debug = core.getInput('debug');
        const owner = core.getInput('owner', { required: true });
        const repo = core.getInput('repo', { required: true });
        const branch = core.getInput('branch');
        const directory = core.getInput('dir');
        const opts = {}
        if (debug === 'true') opts.log = console;

        core.info(`Owner: ${owner}`);
        core.info(`Repo: ${repo}`);
        core.info(`Directory: ${directory}`);

        const zipPath = path.resolve(directory, `${branch}.zip`);

        await download(token, owner, repo, branch, zipPath);
        console.log(`::set-output name=file::${zipPath}`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

async function download(token, owner, repo, branch, zipPath) {

    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/octet-stream'
        }
    };

    const url = `https://github.com/${owner}/${repo}/archive/${branch}.zip?access_token=${token}`;
    fetch(url, options)
        .then(res => {
            if(res.ok){
                return res
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(res => {
            const dest = fs.createWriteStream(zipPath);
            res.body.pipe(dest);
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

function handleError(err) {
    console.error(err)
    core.setFailed(err.message)
}

run();
