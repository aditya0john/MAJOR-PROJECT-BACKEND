import { Schema, model, models } from "mongoose";

const ChapterSchema = new Schema({
  chapterName: { type: String, required: true },
  chapterDescription: String,
  content: String,
  summary: String,
});

const OptionSchema = new Schema({
  a: String,
  b: String,
  c: String,
});

const QuestionSchema = new Schema({
  question: String,
  options: [OptionSchema],
  answer: { type: String, required: true },
});

const ProblemSchema = new Schema({
  problem: { type: String, required: true },
  answer: { type: String, required: true },
});

const TestSchema = new Schema({
  testName: { type: String, required: true },
  questions: [QuestionSchema],
  problems: [ProblemSchema],
});

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: String, required: true },
  chapters: [ChapterSchema],
  tests: [TestSchema],
});

export const Course = models.Course || model("Course", CourseSchema);
