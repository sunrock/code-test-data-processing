const
  TOTAL_REVENUE = 'Revenue',
  TOTAL_COST = 'Cost',
  TOTAL_PROFIT = 'Profit';


exports.calcStatGroupByRegion = (summaryObj, {
  region,
  country,
  itemType,
  revenue,
  cost,
  profit
}) => {

  // group by regions
  if (!(region in summaryObj)) summaryObj.regions[region] = {
    Total: {},
    Countries: {}
  };
  const regionObj = summaryObj.regions[region];
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



const calcTotalRevenueCostProfit = (subSumObj, revenue, cost, profit) => {
  calcSingleTotalValue(subSumObj, TOTAL_REVENUE, revenue);
  calcSingleTotalValue(subSumObj, TOTAL_COST, cost);
  calcSingleTotalValue(subSumObj, TOTAL_PROFIT, profit);
}

const calcSingleTotalValue = (subSumObj, key, value) => {
  if (key in subSumObj) subSumObj[key] += value;
  else subSumObj[key] = value;
}