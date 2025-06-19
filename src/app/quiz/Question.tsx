"use client";

import { Content } from "@prismicio/client";
import { FragranceType } from "./types";
import { Fragment } from "react";
import clsx from "clsx";

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
      {/* Step Counter */}
      <div className="mx-auto mb-10 flex w-full max-w-md items-center">
        {Array.from({ length: totalQuestions }).map((_, idx) => (
          <Fragment key={idx}>
            <div
              className={clsx(
                "flex size-14 items-center justify-center rounded-full border border-gray-600 text-xl font-semibold transition-all duration-1000",
                idx + 1 < questionNumber &&
                  "scale-100 bg-neutral-700 text-neutral-50",
                idx + 1 === questionNumber &&
                  "scale-105 bg-neutral-50 text-neutral-950",
                idx + 1 > questionNumber &&
                  "scale-100 bg-neutral-900 text-neutral-50",
              )}
            >
              {idx + 1}
            </div>
            <div className="h-px w-full flex-1 bg-gray-600 last:hidden"></div>
          </Fragment>
        ))}
      </div>

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
