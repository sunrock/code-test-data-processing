const
  TOTAL_REVENUE = 'Revenue',
  TOTAL_COST = 'Cost',
  TOTAL_PROFIT = 'Profit';


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

exports.calcStatGroupByItemTypes = (itemTypesListObj, { itemType, revenue, cost, profit }) => {
  if (!(itemType in itemTypesListObj)) itemTypesListObj[itemType] = {};
  calcTotalRevenueCostProfit(itemTypesListObj[itemType], revenue, cost, profit);
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