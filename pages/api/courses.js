import { supabase } from "../../lib/supabaseClient";

export default async function handle(req, res) {
  const { method } = req;

  try {
    if (method === "GET") {
      if (req.query?.id && req.query?.chapterId) {
        const { data, error } = await supabase
          .from("chapters")
          .select("*")
          .eq("id", chapterId)
          .eq("course_id", id)
          .single();

        if (error) throw error;
        return res.status(200).json(data);

        // // Find the specific chapter within the course
        // const chapter = course.chapters.find(
        //   (chapter) => chapter._id.toString() === req.query.chapterId
        // );

        // // Return only the filtered chapter object
        // res.json(chapter);
        
      } else if (req.query?.id) {
        const { data: course, error } = await supabase
          .from("courses")
          .select("*, chapters(*), tests(*, questions(*), problems(*))")
          .eq("id", id)
          .single();

        if (error) throw error;
        return res.status(200).json(course);
      } else {
        // Fetch all courses if no specific courseId is provided
        const { data, error } = await supabase.from("courses").select("*");
        if (error) throw error;
        return res.status(200).json(data);
      }
    }
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }

  if (method === "POST") {
    const { title, description, price } = req.body;

    console.log("YE THII MERI REQUEST : ", req.body);

    try {
      const { data, error } = await supabase
        .from("courses")
        .insert([{ title, description, price }])
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (method === "PUT") {
    let {
      _id,
      title,
      description,
      price,
      chapterName,
      chapterDescription,
      content,
      summary,
      testId,
      questions,
      problems,
      a,
      b,
      c,
      Qans,
      Pans,
      chapterId,
      courseId,
      testName,
    } = req.body;

    console.log("YE RHI UPDATE REQUEST", req.body);

    try {
      if (chapterName) {
        if (chapterId) {
          // Update chapter
          const { error } = await supabase
            .from("chapters")
            .update({
              chapter_name: chapterName,
              chapter_description: chapterDescription,
              content,
              summary,
            })
            .eq("id", chapterId);
          if (error) throw error;
        } else {
          // Add new chapter
          const { error } = await supabase.from("chapters").insert([
            {
              course_id: id,
              chapter_name: chapterName,
              chapter_description: chapterDescription,
              content,
              summary,
            },
          ]);
          if (error) throw error;
        }
      }

      if (testName) {
        if (testId) {
          // Update test name
          const { error } = await supabase
            .from("tests")
            .update({ test_name: testName })
            .eq("id", testId);
          if (error) throw error;
        } else {
          // Add new test
          const { error } = await supabase.from("tests").insert([
            {
              course_id: id,
              test_name: testName,
            },
          ]);
          if (error) throw error;
        }
      }

      if (questions) {
        // Add question
        const { error } = await supabase.from("questions").insert([
          {
            test_id: testId,
            question: questions,
            option_a: a,
            option_b: b,
            option_c: c,
            answer: Qans,
          },
        ]);
        if (error) throw error;
      }

      if (problems) {
        // Add problem
        const { error } = await supabase.from("problems").insert([
          {
            test_id: testId,
            problem: problems,
            answer: Pans,
          },
        ]);
        if (error) throw error;
      }

      if (title || description || price) {
        // Update course info
        const { error } = await supabase
          .from("courses")
          .update({ title, description, price })
          .eq("id", id);
        if (error) throw error;
      }

      return res.status(200).json(true);
    } catch (error) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (method === "DELETE") {
    try {
      if (req.query?.id && req.query?.chapterId) {
        const { error } = await supabase
          .from("chapters")
          .delete()
          .eq("id", chapterId)
          .eq("course_id", id);

        if (error) throw error;
        return res.status(200).json(true);
      } else if (req.query?.id) {
        const { error } = await supabase.from("courses").delete().eq("id", id);
        if (error) throw error;
        return res.status(200).json(true);
      }
    } catch (error) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.status(405).json({ error: "Method not allowed" });
}
