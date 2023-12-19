const { PrismaClient } = require('@prisma/client');
const commonService = require('./commonService');
const prismaClient = new PrismaClient()

const sqlService = {
  upsertCommonUser: async (user) => {
    console.log(`...📥   upsert new common user:${JSON.stringify(user.email)}`);
    const newUser = await prismaClient.commonUser.upsert({
      where: {
        email: user.email
      },
      create: {
        id: parseInt(user.id),
        email: user.email,
        name: user.name
      },
      update: {
        id: parseInt(user.id),
        name: user.name,
      },
    })
    newUser.email = user.email
    newUser.name = user.name
    return newUser;
  },
  updateCommonUser: async (user) => {
    console.log(`...📥   update existing common user:${JSON.stringify(user)}`);
    await prismaClient.commonUser.update({
      where: {
        id: parseInt(user.id),
      },
      data: {
        email: user.email,
        name: user.name
      }
    })
  },
  readAllCommonUsers: async () => {
    console.log(`...📤   read all common users`);
    const commonUsers = await prismaClient.commonUser.findMany();
    const sortedCommonUsers = commonService.sortArrayByKey(commonUsers, 'id');
    return sortedCommonUsers;
  },
  readCommonUser: async (id) => {
    console.log(`...📥   read common user by id: ${id})`);
    id = parseInt(id);
    const commonUser = await prismaClient.commonUser.findUnique({
      where: {
        id: id,
      }
    })
    return commonUser;
  },
  deleteCommonUser: async (id) => {
    console.log(`...📥   delete common user by id: ${id})`);
    id = parseInt(id);
    await prismaClient.commonUser.delete({
      where: {
        id: id,
      }
    })
  }
}

module.exports = sqlService;

