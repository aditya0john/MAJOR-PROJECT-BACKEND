import axios from "axios";
import { useRouter } from "next/router";
import { React, useState } from "react";

export default function TestForm({
  courseId,
  testId,
  title: exsistingTitle,
  description: exsistingDescription,
  price: exsistingPrice,
  chapterName: exsistingChapterName,
  content: exsistingContent,
  summary: exsistingSummary,
}) {
  let [title, setTitle] = useState(exsistingTitle || "");
  let [description, setDescription] = useState(exsistingDescription || "");
  let [price, setPrice] = useState(exsistingPrice || "");
  let [chapterName, setChapterName] = useState(exsistingChapterName || "");
  let [content, setContent] = useState(exsistingContent || "");
  let [summary, setSummary] = useState(exsistingSummary || "");
  let [questions, setQuestion] = useState("");
  let [problems, setProblem] = useState("");
  let [a, setO1] = useState("");
  let [b, setO2] = useState("");
  let [c, setO3] = useState("");
  let [goToProducts, setGoToProducts] = useState(false);
  let router = useRouter();
  let edit = "";
  async function editTest(ev) {
    let data = {
      title,
      description,
      price,
      chapterName,
      content,
      summary,
      questions,
      problems,
      a,
      b,
      c,
      testId,
      courseId,
      edit,
    };
    ev.preventDefault();
    if (edit) {
      await axios.put("api/courses", { ...data });
      console.log("PUT REQUEST", data);
    } else {
      await axios.put("/api/courses", data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/courses");
  }
  console.log("title", title);

  return (
    <form onSubmit={editTest}>
      <div className="bg-yellow-100 rounded-lg p-3">
        <h1 className="uppercase text-black font-bold p-3">
          ADD QUESTIONS AND PROBLEMS TO TEST
        </h1>
        <hr className="border-black" />

        <div className="bg-purple-200 rounded-lg p-3 m-2 text-black">
          <label className="font-bold uppercase">ADD QUESTIONS</label>
          <input
            type="string"
            placeholder="enter question"
            onChange={(ev) => setQuestion(ev.target.value)}
          />
          <label className="font-bold uppercase">ADD options</label>
          <input
            type="string"
            placeholder="add option"
            onChange={(ev) => setO1(ev.target.value)}
          />
          <input
            className="mt-1"
            type="string"
            placeholder="add option"
            onChange={(ev) => setO2(ev.target.value)}
          />
          <input
            className="mt-1"
            type="string"
            placeholder="add option"
            onChange={(ev) => setO3(ev.target.value)}
          />
          <button
            type="submit"
            className="btn flex mt-5 bg-yellow-400 text-black p-1 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            ADD
          </button>
        </div>

        <div className="bg-purple-200 rounded-lg p-3 m-2 text-black">
          <label className="font-bold uppercase">ADD PROBLEMS</label>
          <input
            type="string"
            placeholder="enter problem statement"
            onChange={(ev) => setProblem(ev.target.value)}
          />
          <button
            type="submit"
            className="btn flex mt-5 bg-yellow-400 text-black p-1 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            ADD
          </button>
        </div>
      </div>
    </form>
  );
}
