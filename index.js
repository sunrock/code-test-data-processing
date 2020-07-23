const inquirer = require('inquirer');
const fs = require('fs')

const fileReader = require('./src/fileReader');

const TaskOne = 'Task_1';
const TaskTwo = 'Task_2';
const TaskThree = 'Task_3';

const questions =
{
  type: 'list',
  name: 'task',
  message: 'Pick the task you want to get the result:',
  choices: [
    'Task_1: The Total Revenue, Cost and Profit',
    'Task_2: Number of each Priority Orders for each Month',
    'Task_3: Average Time to ship, and Number of Orders For Each Month',
    'Exit'
  ]
}

const csvFilePath = './data/tiny-data.csv';
// const csvFilePath = './data/node-data-processing-medium-data.csv';

let dataAnalysed = undefined;
// dataAnalysed = fileReader.readFile(csvFilePath)

const selectTasks = () => {
  inquirer.prompt(questions)
    .then(({ task }) => {
      if (dataAnalysed) {
        console.log('Data has been loaded.')
        selectSingleTask(task, dataAnalysed);

      } else {
        console.log('Analysing data ...')
        fileReader.readFile(csvFilePath).then(data => {
          dataAnalysed = data;
          selectSingleTask(task, dataAnalysed);
        })
      }
      // console.log(JSON.stringify(answers, null, '    '))
    })
    .catch(err => console.error(err))
}


const selectSingleTask = (task, dataAnalysed) => {
  if (task.match(TaskOne)) {
    const taskOneResult = {
      Regions: dataAnalysed.regions,
      ItemTypes: dataAnalysed.itemTypes
    }
    writeCSVFile(TaskOne, taskOneResult);
    selectTasks();
  } else if (task.match(TaskTwo)) {
    writeCSVFile(TaskTwo, dataAnalysed.monthlyPriority);
    selectTasks();
  } else if (task.match(TaskThree)) {
    writeCSVFile(TaskThree, dataAnalysed.monthlyShippingTime);
    selectTasks();
  } else {
    console.log('Thank you!')
  }
}

const writeCSVFile = (taskNo, json) => {
  const fileName = `./output/${taskNo}_${new Date().getTime()}.json`;
  console.log(`Saving to path=${fileName}`);
  fs.writeFileSync(fileName, JSON.stringify(json, null, '    '));
}

selectTasks()

