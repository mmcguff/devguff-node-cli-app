#!/usr/bin/env node

const readline = require('readline-sync');
const fs = require('fs');
const colors = require('colors'); // Optional: for colorful output
const apiService = require('./services/apiService');
const sqlService = require('./services/sqlService');

async function main() {
  console.log('Welcome to My CLI User Management Interface!'.cyan);
    // Define valid options
  const rootOptions = ['seed', 'create', 'read', 'update', 'delete', 'end'];
    let userInput;
    do {
      userInput = readline.question('Enter a valid option (seed, create, read, update, delete, end): ');
      if (!rootOptions.includes(userInput)) {
          console.log('Invalid option. Please try again.'.red);
        }
    } while (!rootOptions.includes(userInput));
  if (userInput === 'seed') {
    console.log('...Seed Users');
      const users = await apiService.getUsers();
      for(let i = 0; i < users.length; i++) {
        const user = users[i];
        await sqlService.upsertCommonUser(user);
      }
      const commonUsers = await sqlService.readAllCommonUsers();
      console.log(commonUsers);
  }
  if(userInput === 'create'){
    console.log('...Create user');
  }
  if(userInput === 'read'){
    console.log('...Read user');
  }
  if(userInput === 'update'){
    console.log('...Update user');
  }
  if(userInput === 'delete'){
    console.log('...Delete user');
  }
  if(userInput === 'end'){
    console.log('...Exit Program');
    process.exit(0);
  }
    // Example: Write user input to a file
}

(async () => {
  await main();
})();

