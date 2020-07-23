const readline = require('readline');
const fs = require('fs');

const dataFormat = require('./dataFormat');
const accountant = require('./accountant');

exports.readFile = filePath => {
  return new Promise((resolve, reject) => {

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath),
      // output: process.stdout,
      // console: false
    });

    let summaryObj = {
      regions: {},
      itemTypes: {},
      monthlyPriority: {},
      monthlyShippingTime: {}
    }

    // no need to read the first line
    let isTableHeader = true;

    readInterface.on('line', line => {

      if (isTableHeader) {
        isTableHeader = false;
      } else {
        const orderObj = dataFormat.formatLineData(line);

        // Regions Summary
        accountant.calcStatGroupByRegion(summaryObj.regions, orderObj);

        // ItemTypes Summary
        accountant.calcStatGroupByItemTypes(summaryObj.itemTypes, orderObj);

        // Number of orders for each Priority by Month / Year
        accountant.calcStatGroupByMonthlyPriority(summaryObj.monthlyPriority, orderObj);

        // Ship days, number of orders etc by Month / Year
        accountant.calcStatGroupByMonthlyShippingTime(summaryObj.monthlyShippingTime, orderObj);
      }


    }).on('close', () => {
      // EOF
      console.log('End Of File');

      readInterface.close();

      // console.log(JSON.stringify(summaryObj.regions, null, '    '))
      // console.log(JSON.stringify(summaryObj.itemTypes, null, '    '))
      // console.log(JSON.stringify(summaryObj.monthlyPriority, null, '    '))
      // console.log(JSON.stringify(summaryObj.monthlyShippingTime, null, '    '))
      resolve(summaryObj);
    });

  })

}


