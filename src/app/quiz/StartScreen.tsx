"use client";
import FadeIn from "@/components/FadeIn";
import RevealText from "@/components/RevealText";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

type Props = { quizData: Content.QuizDocument; onStart: () => void };

const StartScreen = ({ quizData, onStart }: Props) => {
  return (
    <div className="mx-auto max-w-4xl py-40 text-center">
      <FadeIn vars={{ delay: 0, duration: 1.2 }} className="translate-y-8">
        <p className="mb-4 tracking-widest uppercase">
          {quizData.data.eyebrow}
        </p>
      </FadeIn>

      <RevealText
        align="center"
        field={quizData.data.title}
        id="title"
        className="font-display mb-8 text-5xl text-balance sm:text-6xl md:text-7xl"
        duration={2}
      />

      <FadeIn
        vars={{ delay: 1.2, duration: 2 }}
        className="mx-auto mb-12 max-w-2xl text-lg text-balance text-gray-300"
      >
        <PrismicRichText field={quizData.data.body} />
      </FadeIn>

      <FadeIn vars={{ delay: 2, duration: 2 }} className="translate-y-8">
        <button
          className="inline-block cursor-pointer bg-white px-12 py-4 font-extrabold tracking-wider text-black uppercase transition-colors hover:bg-gray-100"
          onClick={onStart}
        >
          {quizData.data.start_button_text ?? "Start the quiz"}
        </button>
      </FadeIn>
    </div>
  );
};

export default StartScreen;
