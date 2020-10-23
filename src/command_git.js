const shell = require('shelljs');
const { red, blue } = require('chalk');
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

            const data = await inquirer.prompt([{
                name: 'commit', type: 'input', message: 'Input your message commit: ', validate: async (input) => {
                    if (!input)
                        return 'Message Is Required';
                    return true;
                }
            }]);

            console.log(`\n`);

            if (shell.exec(`git commit -m "${platforms} ${data.commit}"`).code !== 0) {
                showError(`git commit -m "${platforms} ${data.commit}"`);
                return;
            }

            const { stdout } = shell.exec(`git rev-parse --abbrev-ref HEAD`);

            if (shell.exec(`git push --set-upstream origin ${stdout}`).code !== 0) {
                showError(`git push --set-upstream origin $branch`);
                return;
            }

            console.log(`\n`);

            console.log(`Your Changes Is Remote Branch: ${blue.bold(stdout)}`);

        }

        showError('Please Install Git');
    }
}