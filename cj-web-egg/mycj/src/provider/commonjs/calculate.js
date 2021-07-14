/** 计算折扣价 */
export function cacuDiscount(price, discount) {
  var priceRes;
  var price = (price + '').replace(' -- ', '-');
  var discount = (discount + '').replace(' -- ', '-');
  var discountArr;
  var priceArr;
  if (price.indexOf('-') == -1) {
    if (discount.indexOf('-') == -1) {
      priceRes = (price * (100 - discount * 1) / 100).toFixed(2);
    } else {
      discountArr = discount.split('-');
      priceRes = (price * (100 - discountArr[0] * 1) / 100).toFixed(2) + ' -- ' + (price * (100 - discountArr[1] * 1) / 100).toFixed(2);
    }
  } else {
    priceArr = price.split('-');
    if (discount.indexOf('-') == -1) {
      priceRes = (priceArr[0] * (100 - discount * 1) / 100).toFixed(2) + ' -- ' + (priceArr[1] * (100 - discount * 1) / 100).toFixed(2);
    } else {
      discountArr = discount.split('-');
      priceRes = (priceArr[0] * (100 - discountArr[0] * 1) / 100).toFixed(2) + ' -- ' + (priceArr[1] * (100 - discountArr[1]) / 100).toFixed(2);
    }
  }
  return priceRes;
}

/** 计算总数 */
export function cacuAmount(price, shipCost) {
  var priceAmount;
  var price = (price + '').replace(' -- ', '-');
  var shipCost = (shipCost + '').replace(' -- ', '-');
  var shipCostArr;
  var priceArr;
  if (price.indexOf('-') == -1) {
    if (shipCost.indexOf('-') == -1) {
      priceAmount = (price * 1 + shipCost * 1).toFixed(2);
    } else {
      shipCostArr = shipCost.split('-');
      priceAmount = (price * 1 + shipCostArr[0] * 1).toFixed(2) + ' -- ' + (price * 1 + shipCostArr[1] * 1).toFixed(2);
    }
  } else {
    priceArr = price.split('-');
    if (shipCost.indexOf('-') == -1) {
      priceAmount = (priceArr[0] * 1 + shipCost * 1).toFixed(2) + ' -- ' + (priceArr[1] * 1 + shipCost * 1).toFixed(2);
    } else {
      shipCostArr = shipCost.split('-');
      priceAmount = (priceArr[0] * 1 + shipCostArr[0] * 1).toFixed(2) + ' -- ' + (priceArr[1] * 1 + shipCostArr[1] * 1).toFixed(2);
    }
  }
  return priceAmount;
}

/** 计算乘积 */
export function cacuProduct(price, number) {
  var priceAmount;
  var price = (price + '').replace(' -- ', '-');
  var number = number * 1;
  var numberArr;
  var priceArr;
  if (price.indexOf('-') == -1) {
    priceAmount = (price * 1 * number).toFixed(2);
  } else {
    priceArr = price.split('-');
    priceAmount = (priceArr[0] * 1 * number).toFixed(2) + ' -- ' + (priceArr[1] * 1 * number).toFixed(2);
  }
  return priceAmount;
}
