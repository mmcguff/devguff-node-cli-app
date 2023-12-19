const service = require('../services/apiService');

describe("apiService", () => {
  it.only("should work", async () => {
    const result = await service.getUsers()
    expect(result).toBeTruthy();
  });
});


