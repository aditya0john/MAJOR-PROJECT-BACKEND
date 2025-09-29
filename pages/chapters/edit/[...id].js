import { supabase } from "../../../lib/supabaseClient";
import ChapterForm from "../../../components/ChapterForm";
import Layout2 from "../../../components/Layout2";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function editChapters() {
  let router = useRouter();
  console.log("YE DEKH", router.query.id);
  let [chapterData, setChapterData] = useState([]);

  let chapterId, courseId;

  // Ensure router.query.id is defined and is an array with at least one element
  if (Array.isArray(router.query.id) && router.query.id.length > 0) {
    const queryString = router.query.id[0];
    const queryParams = queryString.split("&");

    for (const param of queryParams) {
      const [key, value] = param.split("=");
      if (key === "chapterId") {
        chapterId = value;
      }
      if (key === "courseId") {
        courseId = value;
      }
    }

    console.log("Chapter ID:", chapterId);
    console.log("Course ID:", courseId);
  } else {
    console.error("router.query.id is not an array with at least one element");
  }

  useEffect(() => {
    if (!chapterId) return;

    async function fetchData() {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("id", chapterId)
        .single();

      if (error) {
        console.error("Error fetching chapter data:", error);
      } else {
        console.log("ChapterData", data);
        setChapterData(data);
      }
    }

    fetchData();
  }, [chapterId]);

  return (
    <Layout2>
      <div className="bg-yellow-100 rounded-lg p-3 mt-3">
        <h1 className="shdg uppercase text-black font-bold p-3 flex justify-center">
          EDIT THE COURSE
        </h1>
        <hr />
        {chapterData ? (
          <ChapterForm courseId={courseId} {...chapterData} />
        ) : (
          <div>Chapter ID undefined/not available</div>
        )}
      </div>
    </Layout2>
  );
}
