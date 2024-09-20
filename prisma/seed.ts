import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: {email: 'kroprobots@gmail.com'},
    update: {},
    create: {
      email: 'kroprobots@gmail.com',
      login: "pavliuk_den",
      name: 'Павлюк',
      first_surname: "Денис",
      second_surname: "t",
      password: process.env.ADMIN_PASSWORD,
      role: 'ADMIN',
      activation_link: "test"
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect();
  });