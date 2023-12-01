const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const sqlService = {
  createCommonUser: async (user) => {
    console.log(`...📥   create new common user:${JSON.stringify(user.email)}`);
    await prisma.commonUser.create({
      data: {
        email: user.email,
        name: user.name
      }
    })
  },
  readAllCommonUsers: async () => {
    console.log(`...📤   read all common users`);
    const commonUsers = await prisma.commonUser.findMany();
    return commonUsers;
  },
  readCommonUser: async (id) => {
    
  }
}

module.exports = sqlService;

