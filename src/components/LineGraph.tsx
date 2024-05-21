// src/components/LineGraph.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import data from '../data/data.json';

const lineData = data.reduce((acc, curr) => {
  const yearIndex = acc.findIndex(item => item.work_year === curr.work_year);
  if (yearIndex > -1) {
    acc[yearIndex].total_jobs += 1;
    acc[yearIndex].average_salary_usd += curr.salary_in_usd;
  } else {
    acc.push({ work_year: curr.work_year, total_jobs: 1, average_salary_usd: curr.salary_in_usd });
  }
  return acc;
}, [] as any[]).map(item => ({ ...item, average_salary_usd: item.average_salary_usd / item.total_jobs }));

const LineGraph: React.FC = () => (
  <LineChart width={600} height={300} data={lineData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="work_year" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="total_jobs" stroke="#8884d8" />
    <Line type="monotone" dataKey="average_salary_usd" stroke="#82ca9d" />
  </LineChart>
);

export default LineGraph;
