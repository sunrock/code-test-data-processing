const IDX_REGION = 0;
const IDX_COUNTRY = 1;
const IDX_ITEM_TYPE = 2;
const IDX_PRIORITY = 4;
const IDX_ORDER_DATE = 5;
const IDX_SHIP_DATE = 7;
const IDX_REVENUE = 11;
const IDX_COST = 12;
const IDX_PROFIT = 13;

exports.formatLineData = (line) => {

  const orderObj = {}
  const dataArray = line.split(",");

  orderObj.region = dataArray[IDX_REGION];
  orderObj.country = dataArray[IDX_COUNTRY];

  orderObj.itemType = dataArray[IDX_ITEM_TYPE];
  orderObj.priority = dataArray[IDX_PRIORITY];

  orderObj.revenue = dataArray[IDX_REVENUE];
  orderObj.cost = dataArray[IDX_COST];
  orderObj.profit = dataArray[IDX_PROFIT];

  orderObj.startDate = dataArray[IDX_ORDER_DATE];
  orderObj.finishDate = dataArray[IDX_SHIP_DATE];

  orderObj.shipDays = getShipDays(orderObj.startDate, orderObj.finishDate);

  // console.log(orderObj.shipDays);
  // console.log("============================================");

  return orderObj;
}

const getShipDays = (startDateStr, finishDateStr) => {
  const startDate = new Date(startDateStr);
  const finishDate = new Date(finishDateStr);
  const timeBetween = finishDate.getTime() - startDate.getTime();
  const daysBetween = timeBetween / (1000 * 60 * 60 * 24)
  return Math.round(daysBetween);
}