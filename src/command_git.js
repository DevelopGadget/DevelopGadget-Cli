const shell = require('shelljs');
const { red } = require('chalk');
const inquirer = require('inquirer');

function showError(error) {
    console.log(`Error: ${red.bold.bold(error)}`);
    shell.exit(1);
}

module.exports = {
    gitPush: async (platforms = '') => {
        if (shell.which('git')) {
            if (shell.exec('git add -A').code !== 0) {
                showError('git Add -A');
                return;
            }
            const data = await inquirer.prompt([{ name: 'commit', type: 'input', message: 'Input your message commit: ' }]);
            if (shell.exec(`git commit -m "${platforms} ${data.commit}"`).code !== 0) {
                showError(`git commit -m "${platforms} ${data.commit}"`);
                return;
            }

            const { stdout, stderr, code } = shell.exec(`git rev-parse --abbrev-ref HEAD`);

            console.log(`Error: ${red.bold.bold(stdout)}`);
            console.log(`Error: ${red.bold.bold(stderr)}`);
            console.log(`Error: ${red.bold.bold(code)}`);

            if (shell.exec(`git push --set-upstream origin ${stdout}`).code !== 0) {
                showError(`git push --set-upstream origin $branch`);
                return;
            }
        }
    }
}