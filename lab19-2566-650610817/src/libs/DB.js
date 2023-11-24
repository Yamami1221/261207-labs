import _ from "lodash";
import { LowSync, MemorySync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

const originalDB = {
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

const onProduction = process.env.NODE_ENV === "production";

const adapter = onProduction
  ? new MemorySync()
  : new JSONFileSync("DatabaseFile.json");
let lowDB = new LowSync(adapter, originalDB);
export let DB = onProduction ? _.cloneDeep(originalDB) : lowDB.data;

export function resetDB() {
  if (onProduction) {
    DB = _.cloneDeep(originalDB);
  } else {
    lowDB = new LowSync(adapter, originalDB);
    DB = lowDB.data;
    lowDB.write();
  }
}

export function readDB() {
  if (!onProduction) {
    lowDB.read();
    DB = lowDB.data;
  }
}

export function writeDB() {
  if (!onProduction) {
    lowDB.write();
  }
}
