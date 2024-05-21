// src/components/DetailsTable.tsx
import React from 'react';
import { Table } from 'antd';

interface JobDetail {
  title: string;
  count: number;
}

interface Props {
  data: JobDetail[];
}

const DetailsTable: React.FC<Props> = ({ data }) => {
  const columns = [
    { title: 'Job Title', dataIndex: 'title', key: 'title' },
    { title: 'Count', dataIndex: 'count', key: 'count' },
  ];

  return <Table dataSource={data} columns={columns} rowKey="title" />;
};

export default DetailsTable;
