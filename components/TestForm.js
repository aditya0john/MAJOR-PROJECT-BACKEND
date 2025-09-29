import { supabase } from "../lib/supabaseClient";
import { React, useState } from "react";

export default function TestForm({ testId, questionData, problemData }) {
  let [question, setQuestion] = useState(questionData?.question || "");
  let [option_a, setO1] = useState(questionData?.option_a || "");
  let [option_b, setO2] = useState(questionData?.option_b || "");
  let [option_c, setO3] = useState(questionData?.option_c || "");
  let [Qans, setQans] = useState(questionData?.Qans || "");
  let [problem, setProblem] = useState(problemData?.problem || "");
  let [Pans, setPans] = useState(problemData?.Pans || "");
  // let router = useRouter();

  async function addTestQuestion(ev) {
    let data = {
      question,
      option_a,
      option_b,
      option_c,
      Qans,
      test_id: testId,
    };
    ev.preventDefault();
    try {
      await supabase
        .from("questions")
        .upsert([{ ...data }], { onConflict: "id" })
        .eq("test_id", testId);
    } catch (error) {
      throw error;
    }
  }

  async function addTestProblem(ev) {
    let data = {
      problem,
      Pans,
      test_id: testId,
    };
    ev.preventDefault();
    try {
      await supabase
        .from("problems")
        .upsert([{ ...data }], { onConflict: "id" })
        .eq("test_id", testId);
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="bg-yellow-100 rounded-lg p-3">
      <h1 className="phdg uppercase text-black font-bold p-3">
        UPDATE QUESTIONS AND PROBLEMS
      </h1>
      <hr className="border-black" />

      <div className="bg-white border border-black rounded-lg p-4 mt-2 ">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase">ADD QUESTIONS</label>
            <textarea
              className="mb-2 h-full border-none bg-black/[0.1] rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
              type="string"
              value={question}
              placeholder="enter question"
              onChange={(ev) => setQuestion(ev.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase">ADD options</label>
            <input
              className="border-none bg-black/[0.1] rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
              type="string"
              value={option_a}
              placeholder="add option a"
              onChange={(ev) => setO1(ev.target.value)}
            />
            <input
              className="border-none bg-black/[0.1] rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
              type="string"
              value={option_b}
              placeholder="add option b"
              onChange={(ev) => setO2(ev.target.value)}
            />
            <input
              className="border-none bg-black/[0.1] rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
              type="string"
              value={option_c}
              placeholder="add option c"
              onChange={(ev) => setO3(ev.target.value)}
            />
          </div>
        </div>

        <label className="font-bold uppercase">ADD ANSWER</label>
        <textarea
          className="mb-2 border-none bg-black/[0.1] rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
          type="string"
          value={Qans}
          placeholder="enter answer"
          onChange={(ev) => setQans(ev.target.value)}
        />

        <button
          onClick={(ev) => addTestQuestion(ev)}
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
          ADD QUESTION
        </button>
      </div>

      <div className="bg-white border border-black rounded-lg p-4 mt-2">
        <label className="font-bold uppercase">ADD PROBLEMS</label>
        <textarea
          className="border-none bg-black/[0.1] rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
          type="string"
          value={problem}
          placeholder="enter problem statement"
          onChange={(ev) => setProblem(ev.target.value)}
        />
        <label className="font-bold uppercase">ADD ANSWER</label>
        <textarea
          className="mb-2 border-none bg-black/[0.1] rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
          type="string"
          value={Pans}
          placeholder="enter question"
          onChange={(ev) => setPans(ev.target.value)}
        />
        <button
          onClick={(ev) => addTestProblem(ev)}
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
          ADD PROBLEM
        </button>
      </div>
    </div>
  );
}
