import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNT_PEOPLES: Prisma.TagCreateManyInput[] = [
  { name: 'Frontend'},
  { name: 'Backend'},
  { name: 'Fullstack'},
  { name: 'QA'},
  { name: 'Devops'},
];

async function main() {
  await prisma.tag.createMany({
    data: COUNT_PEOPLES,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
