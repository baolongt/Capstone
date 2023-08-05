import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { CellContext, createColumnHelper } from '@tanstack/react-table';
import * as React from 'react';
import { toast } from 'react-toastify';

import BaseTable from '@/components/common/base-table';
import { ToastMessage } from '@/components/toast';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

// folder api
const fakeCall = () => {
  return new Promise<Person[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          firstName: 'tanner',
          lastName: 'linsley',
          age: 24,
          visits: 100,
          status: 'In Relationship',
          progress: 50
        },
        {
          firstName: 'tandy',
          lastName: 'miller',
          age: 40,
          visits: 40,
          status: 'Single',
          progress: 80
        },
        {
          firstName: 'joe',
          lastName: 'dirte',
          age: 45,
          visits: 20,
          status: 'Complicated',
          progress: 10
        },
        {
          firstName: 'tanner',
          lastName: 'linsley',
          age: 24,
          visits: 100,
          status: 'In Relationship',
          progress: 50
        },
        {
          firstName: 'tandy',
          lastName: 'miller',
          age: 40,
          visits: 40,
          status: 'Single',
          progress: 80
        },
        {
          firstName: 'joe',
          lastName: 'dirte',
          age: 45,
          visits: 20,
          status: 'Complicated',
          progress: 10
        },
        {
          firstName: 'tanner',
          lastName: 'linsley',
          age: 24,
          visits: 100,
          status: 'In Relationship',
          progress: 50
        },
        {
          firstName: 'tandy',
          lastName: 'miller',
          age: 40,
          visits: 40,
          status: 'Single',
          progress: 80
        },
        {
          firstName: 'joe',
          lastName: 'dirte',
          age: 45,
          visits: 20,
          status: 'Complicated',
          progress: 10
        }
      ]);
    }, 1000);
  });
};

//
const columnHelper = createColumnHelper<Person>();

const TableDemo = () => {
  const { data, isLoading } = useQuery(['demo'], fakeCall);

  const onTriggered = (row: CellContext<Person, string>) => {
    console.log(row);
    toast.success(
      <ToastMessage message={`My first name is ${row.getValue()}`} />
    );
  };

  const columns = [
    columnHelper.accessor('firstName', {
      header: 'Name',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor((row) => row.lastName, {
      header: 'lastName',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('age', {
      header: 'Age',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('visits', {
      header: () => 'visits',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('progress', {
      header: 'Profile Progress',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('firstName', {
      header: 'Action',
      cell: (row) => (
        <>
          <Button color="error" onClick={() => onTriggered(row)}>
            Trigger
          </Button>
        </>
      )
    })
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <>
        <BaseTable data={data} columns={columns} />;
      </>
    );
  }

  return <>error</>;
};

export default TableDemo;
