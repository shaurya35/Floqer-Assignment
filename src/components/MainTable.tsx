// src/components/MainTable.tsx
import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import data from '../data/data.json';
import DetailsTable from './DetailsTable';

interface DataType {
  work_year: number;
  total_jobs: number;
  average_salary_usd: number;
}

const MainTable: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [detailsData, setDetailsData] = useState<any[]>([]);

  const handleRowClick = (record: DataType) => {
    setSelectedYear(record.work_year);
    const jobDetails = getJobDetailsForYear(record.work_year);
    setDetailsData(jobDetails);
  };

  const columns: ColumnsType<DataType> = [
    { title: 'Year', dataIndex: 'work_year', key: 'work_year', sorter: (a, b) => a.work_year - b.work_year },
    { title: 'Total Jobs', dataIndex: 'total_jobs', key: 'total_jobs', sorter: (a, b) => a.total_jobs - b.total_jobs },
    { title: 'Average Salary (USD)', dataIndex: 'average_salary_usd', key: 'average_salary_usd', sorter: (a, b) => a.average_salary_usd - b.average_salary_usd },
  ];

  const getJobDetailsForYear = (year: number): any[] => {
    const filteredData = data.filter(item => item.work_year === year);
    const jobCount = filteredData.reduce((acc, curr) => {
      acc[curr.job_title] = (acc[curr.job_title] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(jobCount).map(([title, count]) => ({ title, count }));
  };

  const tableData = data.reduce((acc, curr) => {
    const yearIndex = acc.findIndex(item => item.work_year === curr.work_year);
    if (yearIndex > -1) {
      acc[yearIndex].total_jobs += 1;
      acc[yearIndex].average_salary_usd += curr.salary_in_usd;
    } else {
      acc.push({ work_year: curr.work_year, total_jobs: 1, average_salary_usd: curr.salary_in_usd });
    }
    return acc;
  }, [] as DataType[]).map(item => ({ ...item, average_salary_usd: item.average_salary_usd / item.total_jobs }));

  return (
    <div>
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey="work_year"
        onRow={(record) => ({ onClick: () => handleRowClick(record) })}
      />
      {selectedYear && <DetailsTable data={detailsData} />}
    </div>
  );
};

export default MainTable;
