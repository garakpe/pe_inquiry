import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Quiz from './Quiz';
import Login from './Login';

function App() {
  const [student, setStudent] = useState(null);

  const handleQuizStart = (studentInfo) => {
    setStudent(studentInfo);
  };

  const handleQuizRestart = () => {
    setStudent(null);
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          체육탐구 온라인 퀴즈
        </Typography>
        {student && (
            <Typography variant="h6" component="h2">
              응시자: {student.studentId} {student.name}
            </Typography>
        )}
      </Box>
      
      {!student ? (
        <Login onStart={handleQuizStart} />
      ) : (
        <Quiz onRestart={handleQuizRestart} />
      )}
    </Container>
  );
}

export default App;
