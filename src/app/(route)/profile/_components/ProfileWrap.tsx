"use client";

import Quiz from "@/app/_components/_portalItem/Quiz";
import {LoadingState, QuizState} from "@/utils/atom";
import {useEffect} from "react";
import {useRecoilState} from "recoil";

function ProfileWrap() {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [quizToggle, setQuizToggle] = useRecoilState(QuizState);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div>
      <div></div>
      <button onClick={() => setQuizToggle(!quizToggle)}>Quiz</button>
      {quizToggle && <Quiz />}
    </div>
  );
}

export default ProfileWrap;
