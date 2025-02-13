// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');

const data = require('./data.json');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
// POST /students/above-threshold
app.post('/students/above-threshold' , (req , res) => {
  const {threshold} = req.body;
  if (typeof threshold !== 'number'){
    return res.status(400).json({message: 'Bad Request'})
  }
  const studentData = data.filter((e) => e.total > threshold);
 res.json ({
  count: studentData.length,
  students: studentData.map((e) =>({
    name: e.name,
    total: e.total
  })),
 });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


