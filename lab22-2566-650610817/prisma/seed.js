const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: "user1",
        password:
          "$2a$12$7FtHF7AMxOM22CswdaOGC.Fk5Ps70qdonb6IltdbvQxbkjHBW76Cy",
        studentId: "650610001",
        role: "STUDENT",
      },
      {
        username: "user2",
        password:
          "$2a$12$vOLfbveE.deopFnzc5fxz.4u5NenVsR.PzRgYZJL1TfJZHCpR61xa",
        studentId: "650610002",
        role: "STUDENT",
      },
      {
        username: "user3",
        password:
          "$2a$12$xXxB75GMg2avBEWjVbUdH.7qqQZhSAqlyXjuKgYEdf0R7KXWQLNKG",
        studentId: "650610003",
        role: "STUDENT",
      },
      {
        username: "user4",
        password:
          "$2a$12$dy5V3ihtIDNhzMFHbJ.tXO1jSfMy.mZ8V67N8onEjAqtGXVFqoIV2",
        studentId: null,
        role: "ADMIN",
      },
    ],
  });

  await prisma.course.createMany({
    data: [
      {
        courseNo: "261207",
        title: "BASIC COMP ENGR LAB",
      },
      {
        courseNo: "001101",
        title: " FUNDAMENTAL ENGLISH 1",
      },
      {
        courseNo: "001102",
        title: " FUNDAMENTAL ENGLISH 2",
      },
      {
        courseNo: "001103",
        title: " FUNDAMENTAL ENGLISH 3",
      },
    ],
  });

  await prisma.student.createMany({
    data: [
      {
        studentId: "650610001",
        firstName: "Matt",
        lastName: "Damon",
        program: "CPE",
      },
      {
        studentId: "650610002",
        firstName: "Cillian",
        lastName: "Murphy",
        program: "CPE",
      },
      {
        studentId: "650610003",
        firstName: "Emily",
        lastName: "Blunt",
        program: "ISNE",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
