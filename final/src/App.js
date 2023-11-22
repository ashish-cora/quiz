import React, { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  //   const [currentQuestion, setCurrentQuestion] = useState(0);

  //   const handleAnswerOptionClick = (isCorrect) => {
  //     if (isCorrect) {
  //       setScore(score + 1);
  //     }

  //     const nextQuestion = currentQuestion + 1;
  //     if (nextQuestion < questions.length) {
  //       setCurrentQuestion(nextQuestion);
  //     }
  //   };
  const [data, setData] = useState([]);
  const [quizDataArr, setQuizDataArr] = useState([]);
  const [quizArrIndex, setQuizArrIndex] = useState(0);
  const [optionStyles, setOptionStyles] = useState(Array(4).fill(null));
  const [divStyle, setDivStyle] = useState(null);

  const getData = () => {
    fetch("quiz.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log("res", response);
        return response.json();
      })
      .then(function (myJson) {
        console.log("myJson", myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setQuizDataArr(data.quizData);
  }, [data]);
  console.log("asd--", data);

  const showNextQuestion = () => {
    setQuizArrIndex(quizArrIndex + 1);
  };

  // const checkAnswer = () => {

  //   quizDataArr? quizDataArr.map((x) => x.answerOptions.filter((x) => x.isCorrect === true) )
  // };

  const checkAnswer = (options, index) => {
    const correctAnswer = quizDataArr[quizArrIndex].answerOptions.filter(
      (x) => x.isCorrect === true
    );

    console.log("correct ans", correctAnswer);
    console.log("argument", options.answerText);

    console.log("index===", index);
    const updatedOptionStyles = [...optionStyles];
    // setDivStyle(
    //   isCorrect ? { backgroundColor: "green" } : { backgroundColor: "red" }
    // );

    // if (options.answerText === correctAnswer[0].answerText) {
    //   setDivStyle({ backgroundColor: "green" });
    // } else setDivStyle({ backgroundColor: "red" });

    if (options.answerText === correctAnswer[0].answerText) {
      updatedOptionStyles[index] = { backgroundColor: "green" };
    } else {
      updatedOptionStyles[index] = { backgroundColor: "red" };
    }

    setOptionStyles(updatedOptionStyles);
  };

  return (
    // <div className="app">
    //   {showScore ? (
    //     <div className="score-section">
    //       You scored {score} out of {questions.length}
    //     </div>
    //   ) : (
    //     <>
    //       <div className="question-section">
    //         <div className="question-count">
    //           <span>Question {currentQuestion + 1}</span>/{questions.length}
    //         </div>
    //         <div className="question-text">
    //           {questions[currentQuestion].questionText}
    //         </div>
    //       </div>
    //       <div className="answer-section">
    //         {questions[currentQuestion].answerOptions.map((answerOption) => (
    //           <button
    //             onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
    //           >
    //             {answerOption.answerText}
    //           </button>
    //         ))}
    //       </div>
    //     </>
    //   )}
    // </div>
    // <div>
    //   <p>hello</p>
    // </div>
    <div className="App bg-orange-900">
      <div className="container">
        {data.quizData ? console.log("dqD", data.quizData) : null}
        {quizDataArr && quizDataArr.length > 0 ? (
          <>
            <p>{quizDataArr[quizArrIndex]?.questionText}</p>

            {quizDataArr[quizArrIndex]?.answerOptions.map((options, index) => (
              <div
                className="answerDiv"
                onClick={() => checkAnswer(options, index)}
                style={optionStyles[index]}
                key={index}
                id={index}
              >
                {options.answerText}
              </div>
            ))}
          </>
        ) : (
          console.log("no data")
        )}
        <button onClick={showNextQuestion}>next</button>
      </div>
    </div>
  );
}
