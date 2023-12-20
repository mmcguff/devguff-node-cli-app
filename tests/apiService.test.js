const service = require('../services/apiService');

describe("apiService", () => {
  it.only("should return a response", async () => {
    const result = await service.getUsers()
    expect(result).toBeTruthy();
  });
});


