import { PrismaClient } from '@prisma/client';
import * as process from "node:process";
import * as bcrypt from "bcrypt"
const prisma = new PrismaClient();


async function main() {
  const pass = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
  const admin = await prisma.user.upsert({
    where: {email: process.env.ADMIN_LOGIN},
    update: {
      email: process.env.ADMIN_LOGIN,
      login: process.env.ADMIN_LOGIN,
      name: process.env.ADMIN_NAME,
      first_surname: process.env.FIRST_SURNAME,
      second_surname: process.env.SECOND_SURNAME,
      password: pass,
      role: 'ADMIN',
      activation_link: "*"
    },
    create: {
      email: 'kroprobots@gmail.com',
      login: process.env.ADMIN_LOGIN,
      name: 'Павлюк',
      first_surname: "Денис",
      second_surname: "t",
      password: pass,
      role: 'ADMIN',
      activation_link: "*"
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