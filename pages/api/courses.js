import { mongooseConnect } from "@/lib/mongoose";
import { Course } from "@/models/Course";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    // Check if both courseId and chapterId are provided in the query parameters
    if (req.query?.id && req.query?.chapterId) {
      // Fetch the specific chapter based on both courseId and chapterId
      const course = await Course.findOne({
        _id: req.query.id,
        "chapters._id": req.query.chapterId,
      });

      // Find the specific chapter within the course
      const chapter = course.chapters.find(
        (chapter) => chapter._id.toString() === req.query.chapterId
      );

      // Return only the filtered chapter object
      res.json(chapter);
    } else if (req.query?.id) {
      // Fetch the specific course based on courseId
      res.json(await Course.findOne({ _id: req.query.id }));
    } else {
      // Fetch all courses if no specific courseId is provided
      res.json(await Course.find());
    }
  }

  if (method === "POST") {
    const { title, description, price } = req.body;
    console.log("YE THII MERI REQUEST : ", req.body);
    const courseDoc = await Course.create({
      title,
      description,
      price,
    });
    console.log("YE KR DIYA MEINE DATA PUSH MONGODB MEIN : ", courseDoc);
    res.json(courseDoc);
  }

  if (method === "PUT") {
    let {
      title,
      description,
      price,
      chapterName,
      chapterDescription,
      content,
      summary,
      _id,
      edit,
      questions,
      problems,
      a,
      b,
      c,
      chapterId,
      courseId,
      testName,
    } = req.body;

    console.log("YE RHI UPDATE REQUEST", req.body);
    if ("question" in req.body) {
      await Course.updateOne(
        { _id: courseId, "tests._id": testId },

        {
          $set: {
            "tests.$.questions.$.question": questions,
            "tests.$.problems.$.problem": problems,
            "tests.$.question.$.options.$.a": a,
            "tests.$.question.$.options.$.b": b,
            "tests.$.question.$.options.$.c": c,
          },
        }
      );
    } else if ("chapterName" in req.body) {
      if (
        chapterName === "" ||
        chapterDescription === "" ||
        content === "" ||
        summary === ""
      ) {
        await Course.updateOne(
          { _id },
          { $set: { title, description, price } }
        );
      } else if (
        "edit" in req.body &&
        title === "" &&
        description === "" &&
        price === ""
      ) {
        await Course.updateOne(
          { _id: courseId, "chapters._id": chapterId },
          {
            $set: {
              "chapters.$.chapterName": chapterName,
              "chapters.$.chapterDescription": chapterDescription,
              "chapters.$.content": content,
              "chapters.$.summary": summary,
            },
          }
        );
      } else {
        await Course.updateOne(
          { _id },
          {
            $push: {
              chapters: { chapterName, chapterDescription, content, summary },
            },
          }
        );
      }
    }

    if ("testName" in req.body) {
      if (testName === "") {
        await Course.updateOne(
          { _id },
          { $set: { title, description, price } }
        );
      } else {
        await Course.updateOne(
          { _id },
          {
            $push: { tests: { testName } },
          }
        );
      }
    }

    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id && req.query?.chapterId) {
      await Course.updateOne(
        { _id: req.query.id },
        { $pull: { chapters: { _id: req.query.chapterId } } }
      );
      res.json(true);
    } else if (req.query?.id) {
      await Course.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
