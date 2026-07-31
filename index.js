#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import axios from 'axios';
import Table from 'cli-table3';

const API_URL = 'http://localhost:3001/api';

program
  .name('tyson')
  .description('Command Line Interface for myTYSON Publishing Platform')
  .version('1.0.0');

program
  .command('status')
  .description('Check server status')
  .action(async () => {
    console.log(chalk.cyan('Checking myTYSON server status...'));
    try {
      const res = await axios.get(`${API_URL}/articles`);
      if (res.status === 200) {
        console.log(chalk.green('✔ Server is ONLINE'));
        console.log(chalk.gray(`Database contains ${res.data.length} articles.`));
      }
    } catch (error) {
      console.log(chalk.red('✖ Server is OFFLINE or unreachable.'));
    }
  });

program
  .command('list')
  .description('List all articles in the queue')
  .action(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/articles`);
      const table = new Table({
        head: [chalk.blue('ID'), chalk.blue('Type'), chalk.blue('Title'), chalk.blue('Status'), chalk.blue('Views')]
      });

      data.forEach(a => {
        let statusColor = chalk.white;
        if (a.status === 'Published') statusColor = chalk.green;
        if (a.status === 'Draft') statusColor = chalk.yellow;
        if (a.status === 'Review') statusColor = chalk.cyan;

        table.push([a.id, a.type, a.title, statusColor(a.status), a.views]);
      });

      console.log(table.toString());
    } catch (error) {
      console.log(chalk.red('Failed to fetch articles. Is the backend running?'));
    }
  });

program
  .command('publish')
  .description('Quickly draft a new article')
  .action(async () => {
    console.log(chalk.bgMagenta.white.bold(' myTYSON Quick Publish \n'));
    
    const answers = await inquirer.prompt([
      { type: 'select', name: 'type', message: 'Select Publisher:', choices: ['TMG', 'AVIATION', 'ATLANTIS'] },
      { type: 'input', name: 'title', message: 'Article Title:' },
      { type: 'input', name: 'author', message: 'Author Name:', default: 'Editorial Staff' },
      { type: 'select', name: 'category', message: 'Category:', choices: ['News', 'Technology', 'Reviews', 'Releases'] }
    ]);

    const newArticle = {
      ...answers,
      status: 'Draft',
      date: new Date().toISOString().split('T')[0],
      views: 0
    };

    try {
      await axios.post(`${API_URL}/articles`, newArticle);
      console.log(chalk.green(`\n✔ Draft "${answers.title}" successfully pushed to the queue!`));
    } catch (error) {
      console.log(chalk.red('\n✖ Failed to publish article.'));
    }
  });

program.parse();
