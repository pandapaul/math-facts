"use client"

import React, { useState } from 'react';
import './App.css';

function App() {
  const [maxValue, setMaxValue] = useState(20); // Default max value
  const [fact, setFact] = useState(generateMathFact(maxValue)); // Initial fact
  const [inputValue, setInputValue] = useState('');
  const [correct, setCorrect] = useState<null | boolean>(null); // null: unanswered, true: correct, false: incorrect
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  // Function to generate a math fact based on maxValue
  function generateMathFact(maxValue: number) {
    const isAddition = Math.random() > 0.5;
    let num1, num2, answer;

    if (isAddition) {
      num1 = Math.floor(Math.random() * maxValue) + 1;
      num2 = Math.floor(Math.random() * (maxValue - num1 + 1));
      answer = num1 + num2;
      return { question: `${num1} + ${num2} = ?`, answer };
    } else {
      num1 = Math.floor(Math.random() * maxValue) + 1;
      num2 = Math.floor(Math.random() * (num1 + 1));
      answer = num1 - num2;
      return { question: `${num1} - ${num2} = ?`, answer };
    }
  }
  // Handle answer submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isCorrect = parseInt(inputValue) === fact.answer;
    setCorrect(isCorrect);
    setTotal(total + 1);
    if (isCorrect) setScore(score + 1);
  };

  // Move to the next flash card
  const handleNext = () => {
    setFact(generateMathFact(maxValue));
    setInputValue('');
    setCorrect(null);
  };

  // Handle changing maxValue
  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(parseInt(e.target.value));
    setFact(generateMathFact(parseInt(e.target.value)));
    setInputValue('');
    setCorrect(null);
  };

  return (
    <div className="App">
      <h1>Milo&apos;s Math Facts</h1>

      <div>
        <label>Up to </label>
        <input
          type="number"
          value={maxValue}
          onChange={handleMaxValueChange}
          min="1"
        />
      </div>

      <div className="flash-card">
        <h2>{fact.question}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Your answer"
          disabled={correct !== null}
          className='answer'
        />
        <button type="submit" disabled={correct !== null}>Submit</button>
      </form>

      {correct !== null && (
        <div>
          {correct ? <p>Correct! 🎉</p> : <p>Incorrect 😕. The correct answer is {fact.answer}.</p>}
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      <div className="score">
        <p>Score: {score}/{total} ({total > 0 ? ((score / total) * 100).toFixed(2) : 0}%)</p>
      </div>
    </div>
  );
}

export default App;
