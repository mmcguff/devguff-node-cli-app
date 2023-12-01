#!/usr/bin/env node

const readline = require('readline-sync');
const fs = require('fs');
const colors = require('colors'); // Optional: for colorful output
const apiService = require('./services/apiService');
const sqlService = require('./services/sqlService');



async function main() {
    console.log('Welcome to My CLI Application!'.cyan);
    // Define valid options
    const validOptions = ['users', 'option2', 'option3'];
    let userInput;
    do {
        userInput = readline.question('Enter a valid option (users, option2, option3): ');
        if (!validOptions.includes(userInput)) {
          console.log('Invalid option. Please try again.'.red);
        }
    } while (!validOptions.includes(userInput));
    if(userInput === 'users'){
      const users = await apiService.getUsers();
      for(let i = 0; i < users.length; i++) {
        const user = users[i];
        await sqlService.createCommonUser(user);
      }
      const commonUsers = await sqlService.readAllCommonUsers();
      console.log(commonUsers);
      // using prisma write into a postgres database
      // console.log(result);
      // fs.writeFileSync('users.json', JSON.stringify(result));
      // console.log('Data written to users.json'.green);
    }
    // Example: Write user input to a file
}

(async () => {
  await main();
})();

