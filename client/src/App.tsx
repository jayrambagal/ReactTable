import React from "react";
import { useTable, Column } from "react-table";
import { Table } from "./components/Table";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


type Data = {
  Name: string;
  Status: string;
  Role: string;
  lastLogin: string;
  view: React.ReactNode;
};
interface Props {
  data: Data[];
}

const createArr = (n: number): Data[] => {
  const data: Data[] = [];
  for (let i = 0; i < n; i += 1) {
    data.push({
      Name: `ID-${Math.random().toFixed(4)}`,
      Status: new Date().toDateString(),
      Role: `Rick #${i}`,
      lastLogin: `Sanchez #${i}`,
      view: <button>View</button>
    });
  }
  return data;
};

export default function App() {
  const data = React.useMemo<Data[]>(() => createArr(10), []);
  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        Header: () => (
          <>
            Name <ArrowDownwardIcon /> 
          </>
        ),
        accessor: "Name", 
        width:"250px",
      },
      {
        Header: () => (
          <>
            Status <ArrowDownwardIcon /> 
          </>
        ),
        accessor: "Status"
      },
      {
        Header: () => (
          <>
            Role <ArrowDownwardIcon /> 
          </>
        ),
        accessor: "Role"
      },
      {
        Header: () => (
          <>
            Last Login <ArrowDownwardIcon /> 
          </>
        ),
        accessor: "lastLogin"
      },
      {
        accessor: "view"
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable<Data>({ columns, data });

  return (
    <div className="App">
      
      <Table<Data>
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
      />
    </div>
  );
}
