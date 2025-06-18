"use client";

import { Content } from "@prismicio/client";
import { FragranceType } from "./types";

type Props = {
  question: Content.QuizDocumentDataQuestionsItem;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSelected: (fragrance: FragranceType) => void;
  onBack: () => void;
};

const Question = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSelected,
  onBack,
}: Props) => {
  return (
    <div className="mx-auto max-w-4xl py-10 text-center">
      <div className="mb-14">
        <p className="mb-3 tracking-widest uppercase">Step {questionNumber}</p>
        <h2 className="font-display mb-6 text-4xl md:text-5xl lg:text-6xl">
          {question.question_text ?? ""}
        </h2>
      </div>

      <div className="mb-12">
        <p className="py-28">Answers go here</p>
      </div>

      <div className="mx-auto flex max-w-md items-center justify-between">
        <button
          onClick={onBack}
          className="cursor-pointer border border-neutral-700 px-4 py-2 uppercase"
        >
          Back
        </button>

        <div className="text-center">
          {questionNumber}/{totalQuestions}
        </div>

        <button
          onClick={() => onAnswerSelected("Terra")}
          className="cursor-pointer border border-neutral-700 bg-white px-4 py-2 text-black uppercase"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Question;
