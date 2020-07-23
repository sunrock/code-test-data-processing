const
  TOTAL_REVENUE = 'Revenue',
  TOTAL_COST = 'Cost',
  TOTAL_PROFIT = 'Profit';

const
  PRIORITY_LOW = 'L',
  PRIORITY_MIDIUM = 'M',
  PRIORITY_HIGH = 'H',
  PRIORITY_CRITICAL = 'C'

// Regions Summary
exports.calcStatGroupByRegion = (regionsListObj, {
  region,
  country,
  itemType,
  revenue,
  cost,
  profit
}) => {
  // group by regions
  if (!(region in regionsListObj)) regionsListObj[region] = {
    Total: {},
    Countries: {}
  };
  const regionObj = regionsListObj[region];
  calcTotalRevenueCostProfit(regionObj.Total, revenue, cost, profit);

  // group by countries in each region
  if (!(country in regionObj)) regionObj.Countries[country] = {
    Total: {},
    ItemTypes: {}
  };
  const countryObj = regionObj.Countries[country];
  calcTotalRevenueCostProfit(countryObj.Total, revenue, cost, profit);

  // group by item types in each country
  if (!(itemType in countryObj)) countryObj.ItemTypes[itemType] = {};
  calcTotalRevenueCostProfit(countryObj.ItemTypes[itemType], revenue, cost, profit);
}

// ItemTypes Summary
exports.calcStatGroupByItemTypes = (itemTypesListObj, { itemType, revenue, cost, profit }) => {
  if (!(itemType in itemTypesListObj)) itemTypesListObj[itemType] = {};
  calcTotalRevenueCostProfit(itemTypesListObj[itemType], revenue, cost, profit);
}

// Number of orders by Priority each month
exports.calcStatGroupByMonthlyPriority = (priorityObj, { year, month, priority }) => {
  if (!(year in priorityObj)) priorityObj[year] = {}
  if (!(month in priorityObj)) {
    priorityObj[year][month] = {};
    priorityObj[year][month][PRIORITY_LOW] = 0;
    priorityObj[year][month][PRIORITY_MIDIUM] = 0;
    priorityObj[year][month][PRIORITY_HIGH] = 0;
    priorityObj[year][month][PRIORITY_CRITICAL] = 0;
  }
  priorityObj[year][month][priority] += 1;
}



const calcTotalRevenueCostProfit = (subSumObj, revenue, cost, profit) => {
  calcSingleTotalValue(subSumObj, TOTAL_REVENUE, revenue);
  calcSingleTotalValue(subSumObj, TOTAL_COST, cost);
  calcSingleTotalValue(subSumObj, TOTAL_PROFIT, profit);
}

const calcSingleTotalValue = (subSumObj, key, value) => {
  // Round to the nearest 100th
  if (key in subSumObj) {
    const sumValue = subSumObj[key] + Number(value);
    subSumObj[key] = Math.round(sumValue * 100) / 100;
  }
  else subSumObj[key] = Number(value)
}