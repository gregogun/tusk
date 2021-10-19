import prisma from '../lib/prisma';

async function main() {
  await prisma.collection
    .findMany({
      where: {
        userId: 1,
      },
      include: {
        todos: true,
      },
    })
    .then((res) => console.log({ res }));

  await prisma.$disconnect();
}

main();
