const commonService = {
  sortArrayByKey: (arr, key = Object.keys[0], isReverse) => {
    const sorted = arr.sort(function (a, b) {
      const aValue = a[key];
      const bValue = b[key];

      // Compare values based on their data type
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        // Use localeCompare for string comparison (A to Z)
        const comparison = aValue.localeCompare(bValue);
        return isReverse ? -comparison : comparison;
      } else {
        // For numbers or mixed data types, use direct comparison
        return isReverse ? bValue - aValue : aValue - bValue;
      }
    });

    return sorted;
  }
};

module.exports = commonService;
