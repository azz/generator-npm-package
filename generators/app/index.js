'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const globby = require('globby');
const figlet = require('figlet');
const path = require('path');
const readPkg = require('read-pkg');
const util = require('util');
const repoExists = util.promisify(require('repo-exists'));

function getDescription() {
  try {
    return readPkg.sync(process.cwd(), { normalize: false }).description;
  } catch (e) {
    return '';
  }
}

module.exports = class extends Generator {
  prompting() {
    this.log(chalk.red(figlet.textSync('npm-package')));

    const prompts = [
      {
        name: 'name',
        message: 'package name?',
        default: path.basename(process.cwd()),
        validate: input => input.length > 0,
      },
      {
        name: 'description',
        message: 'package description?',
        validate: input => input.length > 0,
        default: getDescription(),
      },
      {
        type: 'confirm',
        name: 'push',
        message: 'push to GitHub?',
        default: false,
      },
      {
        name: 'fullName',
        message: 'full name (First Last)?',
        validate: input => input.length > 0,
        default: this.user.git.name(),
      },
    ];

    return this.prompt(prompts)
      .then(props => {
        this.props = props;
        this.props.year = new Date().getFullYear();
      })
      .then(() => this.user.github.username())
      .then(username => username, () => '')
      .then(username => {
        return this.prompt([
          {
            name: 'user',
            message: 'GitHub username or organization?',
            default: username,
          },
          {
            name: 'npmUser',
            message: 'npm username or scope/org?',
            default: username,
          },
        ]);
      })
      .then(props => {
        this.props.user = props.user;
      });
  }

  writing() {
    const files = globby.sync('**', { cwd: this.templatePath(''), dot: true });
    for (const file of files) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.props
      );
    }
  }

  configuring() {
    if (!this.props.push) {
      return;
    }
    const slug = `${this.props.user}/${this.props.name}`;

    return repoExists(slug)
      .then(exists => exists, () => false)
      .then(exists => {
        if (!exists) {
          throw new Error(
            `The github repository ${slug} does not exist or is not accessible.\n` +
              `Check the repo has been created in GitHub and run again.`
          );
        }
      });
  }

  install() {
    this.spawnCommandSync('yarn', ['install']);
    if (this.props.push) {
      this.log('setting up git...');
      this.spawnCommandSync('git', ['init']);
      this.spawnCommandSync('git', ['add', '-A']);
      this.spawnCommandSync('git', ['commit', '-m', '.']);
      try {
        this.spawnCommandSync('git', [
          'remote',
          'add',
          'origin',
          `git@github.com:${this.props.user}/${this.props.name}.git`,
        ]);
      } catch (e) {}
      this.spawnCommandSync('git', ['push', 'origin', 'master']);
    }
  }
};
