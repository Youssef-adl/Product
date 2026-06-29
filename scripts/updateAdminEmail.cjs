const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$executeRaw`UPDATE users SET email = 'youssouf@admin.com' WHERE role = 'admin' LIMIT 1;`;
    console.log(`Updated ${result} admin user(s).`);
  } catch (error) {
    console.error('Error updating admin email:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
