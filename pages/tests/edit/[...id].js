import Layout2 from "@/components/Layout2";
import TestForm from "@/components/TestForm";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

function EditTest() {
  let router = useRouter();
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

    console.log("Test ID:", testId);
    console.log("Course ID:", courseId);
  } else {
    console.error("router.query.id is not an array with at least one element");
  }

  let [goToProducts, setGoToProducts] = useState(false);

  if (goToProducts) {
    router.push("/courses/edit");
  }

  return (
    <Layout2>
      <TestForm testId={testId} courseId={courseId} />
    </Layout2>
  );
}

export default EditTest;
