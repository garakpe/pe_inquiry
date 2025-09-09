import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Quiz from './Quiz';
import Login from './Login';
import Admin from './Admin';

function App() {
  const [student, setStudent] = useState(null);
  const [isAdminView, setIsAdminView] = useState(false);

  const handleQuizStart = (studentInfo) => {
    setStudent(studentInfo);
  };

  const handleQuizRestart = () => {
    setStudent(null);
  };

  const toggleView = () => {
    if (!isAdminView) {
      const password = window.prompt('관리자 암호를 입력하세요:');
      if (password === 'vegasong') {
        setIsAdminView(true);
      } else {
        alert('암호가 틀렸습니다.');
      }
    } else {
      setIsAdminView(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            체육탐구 온라인 퀴즈
          </Typography>
          <Button variant="outlined" onClick={toggleView}>
            {isAdminView ? '홈으로' : '관리자'}
          </Button>
        </Box>

        {isAdminView ? (
          <Admin />
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            {student && (
              <Typography variant="h6" component="h2" sx={{ my: 2 }}>
                응시자: {student.className} {student.studentId} {student.name}
              </Typography>
            )}
            {!student ? (
              <Login onStart={handleQuizStart} />
            ) : (
              <Quiz student={student} onRestart={handleQuizRestart} />
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
