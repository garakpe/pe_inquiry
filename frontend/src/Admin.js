import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';

const Admin = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, 'quizResults'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const resultsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(resultsData);
      } catch (error) {
        console.error("Error fetching results: ", error);
      }
      setIsLoading(false);
    };

    fetchResults();
  }, []);

  const downloadCSV = () => {
    const headers = ['Class', 'Student ID', 'Name', 'Submitted At', 'Score', 'Total Questions'];
    const csvRows = [
      headers.join(','),
      ...results.map(row => {
        const submittedAt = row.submittedAt?.toDate ? row.submittedAt.toDate().toLocaleString() : 'N/A';
        const values = [row.className, row.studentId, row.name, submittedAt, row.score, row.totalQuestions];
        return values.join(',');
      })
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'quiz_scores.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">퀴즈 결과</Typography>
          <Button variant="contained" onClick={downloadCSV} disabled={results.length === 0}>
            CSV로 내보내기
          </Button>
        </Box>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>반</TableCell>
                  <TableCell>학번</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell align="right">제출 일시</TableCell>
                  <TableCell align="right">점수</TableCell>
                  <TableCell align="right">총 문항 수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.className}</TableCell>
                    <TableCell component="th" scope="row">{row.studentId}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">
                      {row.submittedAt?.toDate ? row.submittedAt.toDate().toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell align="right">{row.score}</TableCell>
                    <TableCell align="right">{row.totalQuestions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default Admin;
