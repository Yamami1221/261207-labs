import _ from "lodash";

export let DB = {
  students: [
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
  courses: [
    {
      courseNo: "261207",
      title: "BASIC COMP ENGR LAB",
    },
    {
      courseNo: "001101",
      title: " FUNDAMENTAL ENGLISH 1",
    },
  ],
  enrollments: [
    {
      studentId: "650610001",
      courseNo: "261207",
    },
    {
      studentId: "650610001",
      courseNo: "001101",
    },
    {
      studentId: "650610002",
      courseNo: "261207",
    },
  ],
  users: [
    {
      username: "user1",
      password: "1234", //this is just example, you should not store raw password in DB
      studentId: "650610001",
      role: "STUDENT",
    },
    {
      username: "user2",
      password: "1234",
      studentId: "650610002",
      role: "STUDENT",
    },
    {
      username: "user3",
      password: "1234",
      studentId: "650610003",
      role: "STUDENT",
    },
    {
      username: "user4",
      password: "5678",
      studentId: null,
      role: "ADMIN",
    },
  ],
};

const originalDB = _.cloneDeep(DB);

export function resetDB() {
  DB = _.cloneDeep(originalDB);
}
