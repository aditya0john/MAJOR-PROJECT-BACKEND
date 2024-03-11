import ChapterForm from "@/components/ChapterForm";
import Layout2 from "@/components/Layout2";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function editChapters() {
  let router = useRouter();
  console.log("YE DEKH", router.query.id);
  let [products, setProducts] = useState([]);

  let chapterId, courseId;

  // Ensure router.query.id is defined and is an array with at least one element
  if (Array.isArray(router.query.id) && router.query.id.length > 0) {
    // Access the first element of the array
    const queryString = router.query.id[0];

    // Split the query string by '&' to separate key-value pairs
    const queryParams = queryString.split("&");

    // Loop through each key-value pair
    for (const param of queryParams) {
      // Split the key-value pair by '=' to separate key and value
      const [key, value] = param.split("=");

      // Check if the key is 'chapterId'
      if (key === "chapterId") {
        chapterId = value;
      }

      // Check if the key is 'courseId'
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
    const url = `/api/courses?id=${courseId}&chapterId=${chapterId}`;

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [courseId, chapterId]);

  return (
    <Layout2>
      <div className="bg-yellow-100 rounded-lg p-3 mt-3">
        <h1 className="shdg uppercase text-black font-bold p-3 flex justify-center">
          EDIT THE COURSE
        </h1>
        <hr />

        {console.log("ye rha data jo form mein JARAA", products)}
        {products && <ChapterForm courseId={courseId} {...products} />}
      </div>
    </Layout2>
  );
}
