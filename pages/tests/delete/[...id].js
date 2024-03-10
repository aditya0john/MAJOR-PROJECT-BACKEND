import Layout2 from "@/components/Layout2";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function editCourse() {
  let router = useRouter();
  let [products, setProducts] = useState();

  let testId, courseId;

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
      if (key === "testId") {
        testId = value;
      }

      // Check if the key is 'courseId'
      if (key === "courseId") {
        courseId = value;
      }
    }

    console.log("Chapter ID:", testId);
    console.log("Course ID:", courseId);
  } else {
    console.error("router.query.id is not an array with at least one element");
  }

  useEffect(() => {
    const url = `/api/courses?id=${courseId}&testId=${testId}`;

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [testId, chapterId]);

  function goback() {
    router.push("/courses");
  }

  console.log(products);

  async function deleteProduct() {
    await axios.delete(`/api/courses?id=${courseId}&testId=${testId}`);
    goback();
  }

  return (
    <Layout2>
      <h1 className="uppercase text-black font-bold p-3">
        DELETE CHAPTER : {products?.chapterName}
      </h1>
      <hr />
      <div className="bg-purple-200 rounded-lg text-black p-3 flex flex-col items-center justify-center">
        <p>do you want to delete ?</p>
        <div className="flex gap-3">
          <button className="bg-red-400 rounded-lg p-2" onClick={deleteProduct}>
            YES
          </button>
          <button className="bg-gray-400 rounded-lg p-2" onClick={goback}>
            NO
          </button>
        </div>
      </div>
    </Layout2>
  );
}
