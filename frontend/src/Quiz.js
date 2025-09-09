import React, { useState } from 'react';
import questions from './questions'; // Import questions locally
import { db } from './firebase'; // Import firestore instance
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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

const Quiz = ({ student, onRestart }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = async () => {
    const newAnswers = { ...answers, [currentQuestionIndex]: selectedAnswer };
    setAnswers(newAnswers);
    setSelectedAnswer('');

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitting(true);
      await handleQuizCompletion(newAnswers);
      setIsSubmitting(false);
      setShowResult(true);
    }
  };

  const handleQuizCompletion = async (finalAnswers) => {
    let finalScore = 0;
    const detailedAnswers = questions.map((question, index) => {
      const isCorrect = finalAnswers[index] === question.answer;
      if (isCorrect) {
        finalScore++;
      }
      return {
        questionId: question.id,
        question: question.question,
        selectedAnswer: finalAnswers[index],
        correctAnswer: question.answer,
        isCorrect,
      };
    });

    setScore(finalScore);

    try {
      await addDoc(collection(db, 'quizResults'), {
        className: student.className,
        studentId: student.studentId,
        name: student.name,
        submittedAt: serverTimestamp(),
        score: finalScore,
        totalQuestions: questions.length,
        answers: detailedAnswers,
      });
    } catch (error) {
      console.error("Error writing document: ", error);
      // Handle the error appropriately in a real app
    }
  };

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
          <Typography variant="body2" color="text.secondary">
            결과가 성공적으로 저장되었습니다.
          </Typography>
          <Button variant="contained" onClick={restartQuiz} sx={{ mt: 2 }}>
            처음으로
          </Button>
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
            disabled={!selectedAnswer || isSubmitting}
          >
            {isSubmitting
              ? '제출 중...'
              : currentQuestionIndex < questions.length - 1
              ? '다음 문제'
              : '결과 보기'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};


export default Quiz;
