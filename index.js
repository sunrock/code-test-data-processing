const inquirer = require('inquirer');
const fileReader = require('./src/fileReader')

const questions =
{
  type: 'list',
  name: 'task',
  message: 'Pick the task you want to get the result:',
  choices: [
    'Task 1: The Total Revenue, Cost and Profit',
    'Task 2: Number of each Priority Orders for each Month',
    'Task 3: Average Time to ship, and Number of Orders For Each Month',
    'Exit'
  ]
}

// const csvFilePath = './data/medium-data.csv';
const csvFilePath = './data/node-data-processing-medium-data.csv';

fileReader.readFile(csvFilePath)

// inquirer.prompt(questions)
//   .then(({ task }) => {
//     // console.log('\n');
//     if (task.match('Task 1')) {
//       console.log(1);
//     } else if (task.match('Task 2')) {
//       console.log(2);

//     } else if (task.match('Task 3')) {
//       console.log(3);

//     } else {
//       console.log('Thank you!')
//     }

//     // console.log(JSON.stringify(answers, null, '    '))
//   })
//   .catch(err => console.error(err))