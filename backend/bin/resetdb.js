require('dotenv').config();

const fs = require('fs');
const chalk = require('chalk');
const db = require('../src/db/connection');

const runSchemaFiles = async () => {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync('./src/db/schema');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./src/db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const schemaFilenames = fs.readdirSync('./src/db/seeds');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./src/db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const runResetDB = async () => {
  try {
    if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
      console.log(`-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);
    } else {
      console.error(chalk.red('Missing database environment variables.'));
      process.exit(1);
    }

    await runSchemaFiles();
    await runSeedFiles();
    process.exit();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    process.exit(1);
  }
};

runResetDB();
