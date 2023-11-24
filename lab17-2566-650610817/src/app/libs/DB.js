import _ from "lodash";

export const DB = {
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
};

export const originalDB = _.cloneDeep(DB);
