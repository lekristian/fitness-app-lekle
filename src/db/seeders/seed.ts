import "dotenv/config";
import { USER_ROLE } from "../models/user";
import { models, sequelize } from "..";
import { EXERCISE_DIFFICULTY } from "../../utils/enums";

const { Exercise, Program, User } = models;

const seedDB = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate([
    {
      name: "Admin",
      surname: "User",
      nickName: "admin",
      email: "admin@fitness.com",
      password: "admin123",
      age: 30,
      role: USER_ROLE.ADMIN,
    },
    {
      name: "Regular",
      surname: "User",
      nickName: "user",
      email: "user@fitness.com",
      password: "user123",
      age: 25,
      role: USER_ROLE.USER,
    },
  ]);

  await Program.bulkCreate([
    {
      name: "Program 1",
    },
    {
      name: "Program 2",
    },
    {
      name: "Program 3",
    },
  ]);

  await Exercise.bulkCreate([
    {
      name: "Exercise 1",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      programID: 1,
    },
    {
      name: "Exercise 2",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      programID: 2,
    },
    {
      name: "Exercise 3",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
      programID: 1,
    },
    {
      name: "Exercise 4",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
      programID: 2,
    },
    {
      name: "Exercise 5",
      difficulty: EXERCISE_DIFFICULTY.HARD,
      programID: 1,
    },
    {
      name: "Exercise 6",
      difficulty: EXERCISE_DIFFICULTY.HARD,
      programID: 2,
    },
  ]);
};

seedDB()
  .then(() => {
    console.log("DB seed done");
    process.exit(0);
  })
  .catch((err) => {
    console.error("error in seed, check your data and model \n \n", err);
    process.exit(1);
  });
