import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography, Box } from '@mui/material';

const Login = ({ onStart }) => {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');

  const handleStart = () => {
    if (studentId.trim() && name.trim()) {
      onStart({ studentId, name });
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          퀴즈 시작하기
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          학번과 이름을 입력해주세요.
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => { e.preventDefault(); handleStart(); }}
        >
          <TextField
            fullWidth
            label="학번"
            variant="outlined"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="이름"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleStart}
            disabled={!studentId.trim() || !name.trim()}
          >
            퀴즈 시작
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Login;
