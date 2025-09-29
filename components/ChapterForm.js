import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import MarkdownEditor from "./MarkdownEditor";

export default function ChapterForm({
  courseId,
  id,
  chapter_name,
  chapter_description,
  content,
  summary,
}) {
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [chapterSummary, setChapterSummary] = useState("");
  const [loading, setLoading] = useState(false);

  let router = useRouter();

  useEffect(() => {
    if (chapter_name) setChapterName(chapter_name);
    if (chapter_description) setChapterDescription(chapter_description);
    if (content) setChapterContent(content);
    if (summary) setChapterSummary(summary);
  }, [chapter_name, chapter_description, content, summary]);

  async function editChapter(ev) {
    let data = {
      chapter_name: chapterName,
      chapter_description: chapterDescription,
      content: chapterContent,
      summary: chapterSummary,
      id,
    };
    ev.preventDefault();

    setLoading(true);

    await supabase
      .from("chapters")
      .update({
        ...data,
      })
      .eq("id", id);

    setLoading(false);
    console.log("PUT REQUEST", data);
    router.push(`/courses/edit/${courseId}`);
  }

  return (
    <div>
      <form onSubmit={editChapter}>
        <div className="p-2">
          <div className="bg-white border border-black rounded-lg p-4 mt-2">
            <label>
              <p className="uppercase font-bold">Chapter Name</p>
              <input
                className="border-none bg-black/[0.1] rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
                type="text"
                name="title"
                value={chapterName}
                placeholder="Enter Chapter Name"
                onChange={(ev) => setChapterName(ev.target.value)}
              />
            </label>
            <label>
              <p className="uppercase font-bold">Chapter Description</p>
              <textarea
                className="border-none bg-black/[0.1] rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
                name="chapterDescription"
                value={chapterDescription}
                placeholder="Enter Chapter Description"
                onChange={(ev) => setChapterDescription(ev.target.value)}
              />
            </label>
            <label>
              <p className="uppercase font-bold">Chapter Content</p>
              <textarea
                className="border-none bg-black/[0.1] rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
                name="content"
                value={chapterContent}
                placeholder="Enter Chapter Content"
                onChange={(ev) => setChapterContent(ev.target.value)}
              />
            </label>
            <label>
              <p className="uppercase font-bold">Chapter Summary</p>
              <textarea
                className="border-none bg-black/[0.1] rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
                name="summary"
                value={chapterSummary}
                placeholder="Enter Chapter summary"
                onChange={(ev) => setChapterSummary(ev.target.value)}
              />
            </label>
            <button
              type="submit"
              className={`btn flex mt-5 border border-black text-black p-1 rounded-md change_button ${
                id ? "" : "hidden"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              {loading ? "UPDATING..." : "UPDATE"}
            </button>
          </div>
        </div>
      </form>

      <MarkdownEditor value={chapterContent} onChange={setChapterContent} />
    </div>
  );
}
