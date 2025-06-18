"use client";

import { Content } from "@prismicio/client";
import gsap from "gsap";
import { useRef, useState } from "react";
import Question from "./Question";
import StartScreen from "./StartScreen";
import { FragranceType, Vote, Votes } from "./types";

type Props = {
  quizData: Content.QuizDocument;
};
type QuizStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

const Quiz = ({ quizData }: Props) => {
  const startScreenRef = useRef<HTMLDivElement>(null);

  const [quizStatus, setQuizStatus] = useState<QuizStatus>("NOT_STARTED");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [votes, setVotes] = useState<Votes>([]);

  const currentQuestion = quizData.data.questions[currentQuestionIndex];

  const start = () => {
    if (!startScreenRef.current) return;

    gsap.to(startScreenRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setQuizStatus("IN_PROGRESS");
      },
    });
  };

  const addVote = (fragranceType: FragranceType) => {
    const newVote: Vote = {
      Terra: fragranceType === "Terra" ? 1 : 0,
      Ignis: fragranceType === "Ignis" ? 1 : 0,
      Aqua: fragranceType === "Aqua" ? 1 : 0,
    };

    setVotes((prev) => {
      const newVotes = [...prev];
      newVotes[currentQuestionIndex] = newVote;
      return newVotes;
    });

    if (currentQuestionIndex >= quizData.data.questions.length - 1) {
      setQuizStatus("COMPLETED");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const back = () => {
    if (currentQuestionIndex > 0) {
      setVotes((prev) => {
        const newVotes = [...prev];
        newVotes.pop();
        return newVotes;
      });

      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setQuizStatus("NOT_STARTED");
    }
  };

  console.log("votes: ", votes);
  return (
    <div className="min-h-screen">
      {quizStatus === "NOT_STARTED" && (
        <div ref={startScreenRef}>
          <StartScreen quizData={quizData} onStart={start} />
        </div>
      )}
      {quizStatus === "IN_PROGRESS" && (
        <Question
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizData.data.questions.length}
          onAnswerSelected={addVote}
          onBack={back}
        />
      )}
    </div>
  );
};

export default Quiz;
