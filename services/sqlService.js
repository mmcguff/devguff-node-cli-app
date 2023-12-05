const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const sqlService = {
  upsertCommonUser: async (user) => {
    console.log(`...📥   upsert new common user:${JSON.stringify(user.email)}`);
    await prisma.commonUser.upsert({
      where: {
        email: user.email
      },
      create: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      update: {
        id: user.id,
        name: user.name,
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

