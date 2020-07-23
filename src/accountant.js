const
  TOTAL_REVENUE = 'Revenue',
  TOTAL_COST = 'Cost',
  TOTAL_PROFIT = 'Profit';

const
  PRIORITY_LOW = 'L',
  PRIORITY_MEDIUM = 'M',
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
  calcTotalRevenueCostProfit(regionsListObj[region].Total, revenue, cost, profit);

  // group by countries in each region
  if (!regionsListObj[region].Countries[country]) {
    regionsListObj[region].Countries[country] = {
      Total: {},
      ItemTypes: {}
    };
  }
  calcTotalRevenueCostProfit(regionsListObj[region].Countries[country].Total, revenue, cost, profit);

  // group by item types in each country
  if (!regionsListObj[region].Countries[country].ItemTypes[itemType]) {
    regionsListObj[region].Countries[country].ItemTypes[itemType] = {};
  }
  calcTotalRevenueCostProfit(regionsListObj[region].Countries[country].ItemTypes[itemType], revenue, cost, profit);
}

// ItemTypes Summary
exports.calcStatGroupByItemTypes = (itemTypesListObj, { itemType, revenue, cost, profit }) => {
  if (!(itemType in itemTypesListObj)) itemTypesListObj[itemType] = {};
  calcTotalRevenueCostProfit(itemTypesListObj[itemType], revenue, cost, profit);
}

// Number of orders by Priority each month
exports.calcStatGroupByMonthlyPriority = (priorityObj, { year, month, priority }) => {
  if (!(year in priorityObj)) priorityObj[year] = {};
  if (!priorityObj[year][month]) {
    priorityObj[year][month] = {};
    const mlyPriorityObj = priorityObj[year][month];
    mlyPriorityObj[PRIORITY_LOW] = 0;
    mlyPriorityObj[PRIORITY_MEDIUM] = 0;
    mlyPriorityObj[PRIORITY_HIGH] = 0;
    mlyPriorityObj[PRIORITY_CRITICAL] = 0;
  }
  priorityObj[year][month][priority] += 1;
}

// Monthly Shipping and Order Summary
exports.calcStatGroupByMonthlyShippingTime = (shipObj, { year, month, region, country, shipDays }) => {
  if (!(year in shipObj)) shipObj[year] = {};

  if (!shipObj[year][month]) {
    shipObj[year][month] = {};
    initShipStatObj(shipObj[year][month]);
    shipObj[year][month].Regions = {};
  }

  // Group by monthly Region Shipment

  if (!shipObj[year][month].Regions[region]) {
    shipObj[year][month].Regions[region] = {};
    initShipStatObj(shipObj[year][month].Regions[region]);
    shipObj[year][month].Regions[region].Countries = {};
  }


  if (!shipObj[year][month].Regions[region].Countries[country]) {
    shipObj[year][month].Regions[region].Countries[country] = {};
    initShipStatObj(shipObj[year][month].Regions[region].Countries[country]);
  }

  // inc number of Orders & calc average time of Shipment
  const countryObj = shipObj[year][month].Regions[region].Countries[country];

  if (countryObj.NumberOfOrders === 0) {
    shipObj[year][month].Regions[region].Countries[country].AverageDaysToShip = shipDays;
  } else {
    const avgValue = (countryObj.AverageDaysToShip * countryObj.NumberOfOrders + shipDays) / (countryObj.NumberOfOrders + 1);
    shipObj[year][month].Regions[region].Countries[country].AverageDaysToShip = format100thDecimal(avgValue);
  }
  shipObj[year][month].Regions[region].Countries[country].NumberOfOrders += 1;
}

initShipStatObj = (targetObj) => {
  targetObj.AverageDaysToShip = 0;
  targetObj.NumberOfOrders = 0;
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
    subSumObj[key] = format100thDecimal(sumValue);
  }
  else subSumObj[key] = Number(value)
}

const format100thDecimal = value => {
  return Math.round(value * 100) / 100
}