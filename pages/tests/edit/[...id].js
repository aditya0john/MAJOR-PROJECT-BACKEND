import { supabase } from "../../../lib/supabaseClient";
import Layout2 from "../../../components/Layout2";
import TestForm from "../../../components/TestForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function EditTest() {
  let [questionData, setQuestionData] = useState(null);
  let [problemData, setProblemData] = useState(null);
  let router = useRouter();
  let testId;

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
    }

    console.log("Test ID:", testId);
  } else {
    console.error("router.query.id is not an array with at least one element");
  }

  useEffect(() => {
    if (!testId) return;

    async function fetchQuesData() {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("test_id", testId)
        .single();

      if (error) {
        console.error("Error fetching test question data:", error);
      } else {
        console.log("ChapterData", data);
        setQuestionData(data);
      }
    }

    async function fetchProbData() {
      const { data, error } = await supabase
        .from("problems")
        .select("*")
        .eq("test_id", testId)
        .single();

      if (error) {
        console.error("Error fetching test problem data:", error);
      } else {
        console.log("ChapterData", data);
        setProblemData(data);
      }
    }

    fetchQuesData();
    fetchProbData();
  }, [testId]);

  return (
    <Layout2>
      {questionData && problemData && (
        <TestForm
          testId={testId}
          questionData={questionData}
          problemData={problemData}
        />
      )}
    </Layout2>
  );
}

export default EditTest;
