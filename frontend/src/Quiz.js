import React, { useState } from 'react';
import questions from './questions'; // Import questions locally
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

const Quiz = ({ onRestart }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    const newAnswers = { ...answers, [currentQuestionIndex]: selectedAnswer };
    setAnswers(newAnswers);
    setSelectedAnswer('');

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore(newAnswers);
      setShowResult(true);
    }
  };

  const calculateScore = (finalAnswers) => {
    let finalScore = 0;
    questions.forEach((question, index) => {
      if (finalAnswers[index] === question.answer) {
        finalScore++;
      }
    });
    setScore(finalScore);
  };

  // Use the onRestart function passed from App.js
  const restartQuiz = () => {
    onRestart();
  };

  if (showResult) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>퀴즈 결과</Typography>
          <Typography variant="h6" sx={{ my: 2 }}>
            총 {questions.length}문제 중 {score}문제를 맞혔습니다!
          </Typography>
          <Button variant="contained" onClick={restartQuiz}>처음으로</Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          문제 {currentQuestionIndex + 1}/{questions.length}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {currentQuestion.question}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="quiz-option"
            name="quiz-option-group"
            value={selectedAnswer}
            onChange={handleAnswerChange}
          >
            {currentQuestion.options.map((option, index) => (
              <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </FormControl>
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Button
            variant="contained"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            {currentQuestionIndex < questions.length - 1 ? '다음 문제' : '결과 보기'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Quiz;
