import {QuizState} from "@/utils/atom";
import {spaceQuizData} from "@/utils/quizData";
import {ChangeEvent, useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import styled from "styled-components";

interface quizType {
  answer: string;
  options: string[];
  question: string;
}

function Quiz() {
  const [quizToggle, setQuizToggle] = useRecoilState(QuizState);
  const [quizData, setQuizData] = useState<quizType>();
  const [userAnswer, setUserAnswer] = useState("");
  const randomNumber = Math.floor(Math.random() * 20);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUserAnswer(value);
  };
  const onSubmit = () => {
    if (quizData?.answer !== userAnswer) {
      alert("오답입니다.");
    } else {
      alert("정답입니다.");
    }
    setQuizToggle(false);
  };
  useEffect(() => {
    setQuizData(spaceQuizData[randomNumber]);
  }, []);
  return (
    <Wrap>
      <div>{quizData?.question}</div>
      <div>
        {quizData?.options.map((item: string, index: number) => (
          <div key={index}>
            <label>
              <input
                name="quiz"
                type="radio"
                onChange={onChange}
                value={item}
              />
              {item}
            </label>
          </div>
        ))}
      </div>
      <button onClick={onSubmit}>제출</button>
    </Wrap>
  );
}

export default Quiz;

const Wrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 400px;
  background-color: #252525;
`;
