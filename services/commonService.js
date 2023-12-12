
const commonService = {
  sortArrayByKey: (arr, key, isReverse = true) => {
    const sorted = arr.sort(function (a, b) {
      return isReverse ? a[key] - b[key] : b[key] = a[key];
    });
    return sorted;
  }
}

module.exports = commonService;