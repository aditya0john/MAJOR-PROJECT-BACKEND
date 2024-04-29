import { Schema, model, models } from "mongoose";

const ChapterSchema = new Schema({
  chapterName: { type: String, required: true },
  content: String,
});

const QuesSchema = new Schema({
  question: { type: String },
  options: [
    {
      a: String,
      b: String,
      c: String,
    },
  ],
});

const ProbSchema = new Schema({
  problem: { type: String, required: true },
  answer: { type: String, required: true },
});

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  chapters: [ChapterSchema],
  tests: {
    testName: { type: String },
    ques: [QuesSchema],
    prob: [ProbSchema],
  },
});

export const Course = models.Course || model("Course", CourseSchema);
