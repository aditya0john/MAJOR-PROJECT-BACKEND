import axios from "axios";
import { useRouter } from "next/router";
import { React, useState } from "react";

export default function ChapterForm({
  courseId,
  _id,
  title: exsistingTitle,
  description: exsistingDescription,
  price: exsistingPrice,
  chapterName: exsistingChapterName,
  chapterDescription: exsistingChapterDescription,
  content: exsistingContent,
  summary: exsistingSummary,
  chapters,
}) {
  let [title, setTitle] = useState(exsistingTitle || "");
  let [description, setDescription] = useState(exsistingDescription || "");
  let [chapterDescription, setChapterDescription] = useState(
    exsistingChapterDescription || ""
  );
  let [price, setPrice] = useState(exsistingPrice || "");
  let [chapterName, setChapterName] = useState(exsistingChapterName || "");
  let [content, setContent] = useState(exsistingContent || "");
  let [summary, setSummary] = useState(exsistingSummary || "");
  let [goToProducts, setGoToProducts] = useState(false);
  let router = useRouter();
  let edit = "";
  async function editChapter(ev) {
    let data = {
      title,
      description,
      price,
      chapterName,
      chapterDescription,
      content,
      summary,
      chapterId: _id,
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

  return (
    <form onSubmit={editChapter}>
      <div className="p-2">
        <div className="bg-white border border-black rounded-lg p-4 mt-2">
          <label>
            <p className="uppercase font-bold">chapter name</p>
            <input
              className="border border-black bg-white rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
              type="text"
              name="title"
              value={chapterName}
              placeholder="Enter Chapter Name"
              onChange={(ev) => setChapterName(ev.target.value)}
            />
          </label>
          <label>
            <p className="uppercase font-bold">chapter Description</p>
            <textarea
              className="border border-black bg-white rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
              name="chapterDescription"
              value={chapterDescription}
              placeholder="Enter Chapter Description"
              onChange={(ev) => setChapterDescription(ev.target.value)}
            />
          </label>
          <label>
            <p className="uppercase font-bold">chapter content</p>
            <textarea
              className="border border-black bg-white rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
              name="content"
              value={content}
              placeholder="Enter Chapter Content"
              onChange={(ev) => setContent(ev.target.value)}
            />
          </label>
          <label>
            <p className="uppercase font-bold">chapter summary</p>
            <textarea
              className="border border-black bg-white rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
              name="summary"
              value={summary}
              placeholder="Enter Chapter summary"
              onChange={(ev) => setSummary(ev.target.value)}
            />
          </label>
          <button
            type="submit"
            className="btn flex mt-5 border border-black text-black p-1 rounded-md change_button"
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
