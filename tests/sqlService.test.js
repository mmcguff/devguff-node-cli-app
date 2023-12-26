const service = require('../services/sqlService');

const { PrismaClient } = require('@prisma/client');
const prismaMock = new PrismaClient();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    commonUser: {
      upsert: jest.fn((data) => {
        return { id: 1, name: data.name, email: data.email };
      }),
      update: jest.fn((data) => {
        return { id: data.id, name: data.name, email: data.email };
      })
    },
  })),
}));

describe("sqlService", () => {
  it('upsertCommonuser should create a new user if user doesn\'t previously exisit.', async () => {
    const user = { name: 'John Doe', email: 'johndoe@example.com' };
    const result = await service.upsertCommonUser(user);

    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
  });
  it('updateCommonUser should update to new values', async () => {
    const user = { id: 42, name: 'Sample Sarah', email: 'sarahsample@example.com' };
    const result = await service.updateCommonUser(user);
    
    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
  });
});

