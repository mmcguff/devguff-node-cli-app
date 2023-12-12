#!/usr/bin/env node

const readline = require('readline-sync');
const fs = require('fs');
const colors = require('colors'); // Optional: for colorful output
const apiService = require('./services/apiService');
const sqlService = require('./services/sqlService');

async function main() {
  console.log('Welcome to My CLI User Management Interface!'.cyan);
    // Define valid options
  const rootOptions = ['seed', 'create', 'readAll', 'read', 'update', 'delete', 'end'];
    let userInput;
    do {
      userInput = readline.question('Enter a valid option (seed, create, readAll, read, update, delete, end): ');
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
    const userName = readline.question('Add user name:');
    const userEmail = readline.questionEMail('Add user email:');
    const userObject = {
      name: userName,
      email: userEmail
    }
    await sqlService.upsertCommonUser(userObject);
  }
  if(userInput === 'readAll'){
    const users = await sqlService.readAllCommonUsers();
    console.log(users);
  }
  if(userInput === 'read'){
    const userId = readline.question('Enter user id:(1)', {defaultInput: '1'});
    const user = await sqlService.readCommonUser(userId);
    console.log(user);
  }
  if(userInput === 'update'){
    const userId = readline.question('Enter user id:(1)', {defaultInput: '1'});
    const currentUser = await sqlService.readCommonUser(userId);
    console.log(currentUser);
    const userName = readline.question(`Add user name:(${currentUser.name})`, {defaultInput: currentUser.name});
    const userEmail = readline.questionEMail(`Add user email:(${currentUser.email})`, {defaultInput: currentUser.email});
    const userObject = {
      id: userId,
      name: userName,
      email: userEmail
    }
    await sqlService.updateCommonUser(userObject);
  }
  if(userInput === 'delete'){
    const userId = readline.question('Enter user id to delete:');
    await sqlService.deleteCommonUser(userId);
  }
  if(userInput === 'end'){
    console.log('...Exit Program');
    process.exit(0);
  }
  main();
}

(async () => {
  await main();
})();

