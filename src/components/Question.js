import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const { id, prompt, answers, correctIndex } = question;

  // add useEffect code
  useEffect(() => {
    let timerID;
    if (timeRemaining > 0) {
      timerID = setTimeout(() => setTimeRemaining((timeRemaining) => timeRemaining - 1), 1000);
    } else {
      onAnswered(false);
      setTimeRemaining(10);
    }

    return function cleanup() {
      console.log('Cleanup function called');
      clearTimeout(timerID)
    }
  }, [timeRemaining, onAnswered])

  function handleAnswer(isCorrect) {
    onAnswered(isCorrect);
    setTimeRemaining(10);
  }
  
  const answerItems = answers.map((answer, index) => {
    const isCorrect = index === correctIndex;

    return (
      <button key={answer}onClick={() => handleAnswer(isCorrect)}>{answer}</button>
    );
  });


  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answerItems}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  )
}

export default Question;




// function Question({ question, onAnswered }) {
//   const [timeRemaining, setTimeRemaining] = useState(10);

//   // add useEffect code

//   function handleAnswer(isCorrect) {
//     setTimeRemaining(10);
//     onAnswered(isCorrect);
//   }

//   const { id, prompt, answers, correctIndex } = question;

//   return (
//     <>
//       <h1>Question {id}</h1>
//       <h3>{prompt}</h3>
//       {answers.map((answer, index) => {
//         const isCorrect = index === correctIndex;
//         return (
//           <button key={answer} onClick={() => handleAnswer(isCorrect)}>
//             {answer}
//           </button>
//         );
//       })}
//       <h5>{timeRemaining} seconds remaining</h5>
//     </>
//   );
// }

// export default Question;
