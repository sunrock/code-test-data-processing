const readline = require('readline');
const fs = require('fs');

const BELONG_TO = 'belong to'
const dataFormat = require('./dataFormat');
const accountant = require('./accountant')

exports.readFile = (filePath) => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    // output: process.stdout,
    // console: false
  });

  let summaryObj = {
    countriesInRegion: {},
    itemTypesInCountry: {},

    //
    regions: {},
    itemTypes: {}
  }

  // no need to read the first line
  let isTableHeader = true;

  readInterface.on('line', function (line) {

    if (isTableHeader) {
      isTableHeader = false;
    } else {
      const orderObj = dataFormat.formatLineData(line);

      // Countries in each Region
      if (orderObj.region in summaryObj.countriesInRegion) {
        if (!(orderObj.country in summaryObj.countriesInRegion[orderObj.region])) {
          summaryObj.countriesInRegion[orderObj.region][orderObj.country] = BELONG_TO;
        }
      } else {
        summaryObj.countriesInRegion[orderObj.region] = {};
        summaryObj.countriesInRegion[orderObj.region][orderObj.country] = BELONG_TO;
      }

      // ItemTypes in each Country
      if (orderObj.country in summaryObj.itemTypesInCountry) {
        if (!(orderObj.itemType in summaryObj.itemTypesInCountry[orderObj.country])) {
          summaryObj.itemTypesInCountry[orderObj.country][orderObj.itemType] = BELONG_TO;
        }
      } else {
        summaryObj.itemTypesInCountry[orderObj.country] = {};
        summaryObj.itemTypesInCountry[orderObj.country][orderObj.itemType] = BELONG_TO;
      }

      // Region Summary
      accountant.calcStatGroupByRegion(summaryObj.regions, orderObj);

      // ItemTypes Summary
      accountant.calcStatGroupByItemTypes(summaryObj.itemTypes, orderObj);

      // Number of orders for each Priority by Month / Year


      // Ship days, number of orders etc by Month / Year
    }


  }).on('close', function (line) {
    // EOF
    console.log('End Of File');
    readInterface.close();

    // console.log(JSON.stringify(summaryObj.regions, null, '    '))
    console.log(JSON.stringify(summaryObj.itemTypes, null, '    '))

  });;
}