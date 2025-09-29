import CourseForm from "../../../components/CourseForm";
import Layout2 from "../../../components/Layout2";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function editCourse() {
  let router = useRouter();
  const { id } = router.query;
  let [courseData, setCourseData] = useState();
  let [chapterData, setChapterData] = useState([]);
  let [testData, setTestData] = useState([]);
  // console.log("COURSE ID", id);

  useEffect(() => {
    if (!id) return; // wait until id is available

    const fetchCourse = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching course:", error.message);
      } else {
        setCourseData(data);
      }
    };

    const fetchChapterDetails = async () => {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("course_id", id);

      if (error) {
        console.error("Error fetching course:", error.message);
      } else {
        setChapterData(data);
        console.log("chapter data", data);
      }
    };

    const fetchTestDetails = async () => {
      const { data, error } = await supabase
        .from("tests")
        .select("*")
        .eq("course_id", id);

      if (error) {
        console.error("Error fetching course:", error.message);
      } else {
        setTestData(data);
        console.log("chapter data", data);
      }
    };

    fetchCourse();
    fetchChapterDetails();

    fetchTestDetails();
  }, [id]);

  return (
    <Layout2>
      {console.log("ye rha data jo form mein jara", courseData)}
      {courseData && <CourseForm {...courseData} />}

      <div className="bg-purple-200 rounded-lg p-3 m-2 text-black">
        <div className="mt-3 p-3 flex justify-center">
          <p className="uppercase font-bold scale-125">LIST OF ALL CHAPTERS</p>
        </div>
        <hr />
        <table className="bg-white basic border border-black">
          <tr className="grid grid-cols-2">
            <th className="font-bold uppercase">Chapters</th>
            <th className="font-bold uppercase">edit / delete</th>
          </tr>
          <hr className="border border-black" />

          {chapterData.map((chapter) => (
            <div
              key={chapter.id}
              className="grid grid-cols-2 items-center border-b p-2"
            >
              <div className="uppercase font-bold flex justify-center">
                <i>{chapter?.chapter_name}</i>
              </div>
              <div className="flex gap-2 justify-center p-1">
                <Link
                  href={`/chapters/edit/chapterId=${chapter.id}&courseId=${id}`}
                  className="border border-black hover:bg-green-200 rounded-lg flex gap-1 p-1 items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  EDIT CHAPTER
                </Link>
                <Link
                  href={`/chapters/delete?chapterId=${chapter.id}&courseId=${id}`}
                  className="border border-black hover:bg-red-200 rounded-lg flex gap-1 p-1 items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  DELETE CHAPTER
                </Link>
              </div>
            </div>
          ))}
        </table>
      </div>

      <div className="bg-purple-200 rounded-lg p-3 m-2 text-black">
        <div className="mt-3 p-3 flex justify-center">
          <p className="uppercase font-bold scale-125">LIST OF ALL TESTS</p>
        </div>
        <hr />
        <table className="bg-white basic border border-black">
          <tr className="grid grid-cols-2">
            <th className="font-bold uppercase">tests</th>
            <th className="font-bold uppercase">edit / delete</th>
          </tr>
          <hr className="border border-black" />

          {testData.map((test) => (
            <div key={test.id}>
              <tr className="grid grid-cols-2">
                <td className="uppercase font-bold">
                  <i>{test.test_name}</i>
                </td>
                <td className="flex gap-2 justify-center p-1">
                  <Link
                    href={`/tests/edit/testId=${test.id}`}
                    className="border border-black hover:bg-green-200 rounded-lg flex gap-1 p-1 items-center "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    EDIT TEST
                  </Link>
                  <Link
                    href={`/tests/delete/testId=${test.id}&courseId=${id}`}
                    className="border border-black hover:bg-red-200 rounded-lg flex gap-1 p-1 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    DELETE TEST
                  </Link>
                </td>
              </tr>
            </div>
          ))}
        </table>
      </div>
    </Layout2>
  );
}
