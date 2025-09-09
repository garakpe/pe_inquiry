import React, { useState } from 'react';
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const Login = ({ onStart }) => {
  const [className, setClassName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');

  const handleStart = () => {
    if (className && studentId.trim() && name.trim()) {
      onStart({ className, studentId, name });
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          퀴즈 시작하기
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          반, 학번, 이름을 입력해주세요.
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => { e.preventDefault(); handleStart(); }}
        >
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="class-select-label">반</InputLabel>
            <Select
              labelId="class-select-label"
              id="class-select"
              value={className}
              label="반"
              onChange={(e) => setClassName(e.target.value)}
            >
              <MenuItem value="3-1b">3-1b</MenuItem>
              <MenuItem value="3-1c">3-1c</MenuItem>
            </Select>
          </FormControl>
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
            disabled={!className || !studentId.trim() || !name.trim()}
          >
            퀴즈 시작
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Login;
