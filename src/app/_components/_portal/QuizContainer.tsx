import {QuizState} from "@/utils/atom";
import React from "react";
import {useRecoilValue} from "recoil";
import QuizPortal from "./QuizPortal";
function QuizContainer() {
  const isQuiz = useRecoilValue(QuizState);

  return <QuizPortal></QuizPortal>;
}

export default React.memo(QuizContainer);
