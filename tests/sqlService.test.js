const service = require('../services/sqlService');

// describe("sqlService", () => {
//   it("should work", () => {
//     expect(1 + 1).toBe(2);
//   });
// });

const { PrismaClient } = require('@prisma/client');
const prismaMock = new PrismaClient();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    commonUser: {
      upsert: jest.fn((data) => {
        return { id: 1, name: data.name, email: data.email };
      }),
    },
  })),
}));

test('createUser should return a successful response', async () => {
  const user = { name: 'John Doe', email: 'johndoe@example.com' };
  const result = await service.upsertCommonUser(user);
    expect(result.id).toBeTruthy();
    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);

});