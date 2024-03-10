import CourseForm from "@/components/CourseForm";
import Layout2 from "@/components/Layout2";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function editCourse() {
  let router = useRouter();
  const { id } = router.query;
  let [courseData, setCourseData] = useState();

  useEffect(() => {
    axios.get("/api/courses?id=" + id).then((response) => {
      if (response) {
        setCourseData(response?.data);
        console.log(response.data);
      }
    });
  });

  return (
    <Layout2>
      <h1 className="uppercase text-black font-bold p-3">EDIT THE COURSE</h1>
      <hr />
      {console.log("ye rha data jo form mein jara", courseData)}
      {courseData && <CourseForm {...courseData} />}
    </Layout2>
  );
}
