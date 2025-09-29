"use client";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mdParser = new MarkdownIt();

export default function MarkdownEditor({ value, onChange }) {
  return (
    <MdEditor
      style={{ height: "500px" }}
      value={value}
      renderHTML={(text) => mdParser.render(text)}
      onChange={({ text }) => onChange(text)}
    />
  );
}
