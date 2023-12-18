
const service = require('../services/commonService');

describe("commonService", () => {
  describe("sortArrayByKey", () => {
    it('should sort an array in ascending order by default', () => {
      const inputArray = [{ id: 3 }, { id: 1 }, { id: 2 }];
      const sortedArray = service.sortArrayByKey(inputArray, 'id');
      expect(sortedArray).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });

    it('should sort an array in descending order when isReverse is true', () => {
      const inputArray = [{ score: 80 }, { score: 95 }, { score: 70 }];
      const sortedArray = service.sortArrayByKey(inputArray, 'score', true);
      expect(sortedArray).toEqual([{ score: 95 }, { score: 80 }, { score: 70 }]);
    });

    it('should handle empty input array', () => {
      const emptyArray = [];
      const sortedArray = service.sortArrayByKey(emptyArray, 'id');
      expect(sortedArray).toEqual([]);
    });

    it('should handle duplicate keys', () => {
      const inputArray = [{ value: 2 }, { value: 1 }, { value: 2 }];
      const sortedArray = service.sortArrayByKey(inputArray, 'value');
      expect(sortedArray).toEqual([{ value: 1 }, { value: 2 }, { value: 2 }]);
    });

    it('should handle non-numeric keys', () => {
      const inputArray = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }];
      const sortedArray = service.sortArrayByKey(inputArray, 'name');
      expect(sortedArray).toEqual([
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Charlie' },
      ]);
    });

    it('should handle non-numeric keys reversed', () => {
      const inputArray = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }];
      const sortedArray = service.sortArrayByKey(inputArray, 'name', true);
      expect(sortedArray).toEqual([
        { name: 'Charlie' },
        { name: 'Bob' },
        { name: 'Alice' },
      ]);
    });


    it('should handle mixed data types', () => {
      const inputArray = [
        { value: 'Alice' },
        { value: 42 },
        { value: { nested: 'object' } },
      ];
      const sortedArray = service.sortArrayByKey(inputArray, 'value', true);
      expect(sortedArray).toEqual([
        { value: 'Alice' },
        { value: 42 },
        { value: { nested: 'object' } },
      ]);
    });

    it('should handle custom key comparison', () => {
      const inputArray = [
        { timestamp: 1639824000000 }, // 2021-12-18
        { timestamp: 1640000000000 }, // 2021-12-20
        { timestamp: 1639910400000 }, // 2021-12-19
      ];
      const sortedArray = service.sortArrayByKey(inputArray, 'timestamp');
      expect(sortedArray).toEqual([
        { timestamp: 1639824000000 },
        { timestamp: 1639910400000 },
        { timestamp: 1640000000000 },
      ]);
    });

    it('should handle single-element array', () => {
      const singleElementArray = [{ value: 'Single' }];
      const sortedArray = service.sortArrayByKey(singleElementArray, 'value');
      expect(sortedArray).toEqual([{ value: 'Single' }]);
    });
  });
});