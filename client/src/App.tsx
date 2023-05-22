import React, { useEffect, useState } from "react";
import { useTable, Column, usePagination,useSortBy } from "react-table";
import { Table } from "./components/Table";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "./components/Type";
import { BooleanLiteral } from "typescript";


export interface IAddress {
  street: string;
}

type Data = {
  id?: number;
  name?: string;
  username?: string;
  address?: IAddress;
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  avatar?: string;
  status?: string;
  last_login?: string;
  role?: string;
  view: React.ReactNode;
  
};

// const createArr = (n: number): Data[] => {
//   const data: Data[] = [];
//   for (let i = 0; i < 4; i += 1) {
//     data.push({
//       first_name: `ID-${Math.random().toFixed(4)}`,
//       status: new Date().toDateString(),
//       role: `Rick #${i}`,
//       last_login: `Sanchez #${i}`,
//       view: (
//         <div className="flex gap-3 cursor-pointer">
//           <DeleteOutlinedIcon /> <ModeEditOutlinedIcon />
//         </div>
//       ),
//       id: i,
//     });
//   }
//   return data;
// };

export default function App() {
  const [data, setData] = useState<IUser[]>([]);

  const fetchData = async () => {
    const uri = "http://localhost:5000/getdata";
    // const uri = "./MOCK_DATA.json";
    const response = await axios.get<IUser[]>(uri);
    setData(response.data);
    console.log(response.data);
  };
  //fetch the api here.
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id:number )=> {
    // Filter out the item with the provided ID
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  };

  // const data = React.useMemo<Data[]>(() => createArr(100), []);
  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        Header: () => (
          <>
            Name <ArrowDownwardIcon />
          </>
        ),
        accessor: "first_name",
        Cell: ({ row }: any) => (
          <div className="flex gap-2" >
            <div>
            <img src={row.original.avatar} alt="" className=" w-[45px] h-auto rounded-[80px] shadow-sm shadow-black " />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 font-medium " >
            <p>{row.original.first_name}</p>
            <p>{row.original.last_name}</p>
            </div>
            <span>{row.original.email}</span>
            </div>
          </div>
        ),
        width: "250px",
      },
      {
        Header: () => (
          <>
            Status <ArrowDownwardIcon />
          </>
        ),
        accessor: "status",
        Cell: ({ row }: any) => (
          <div className="flex gap-2" >
          {row.original.gender==="male"? <span className="badge bg-secondary">invited</span>:<span className="badge bg-success">Active</span>}
            
          </div>
         
        ),
        width: "30px",
      },
      {
        Header: () => (
          <>
            Role <ArrowDownwardIcon />
          </>
        ),
        accessor: "role",
        width: "80px",
      },
      {
        Header: () => (
          <>
            Last Login <ArrowDownwardIcon />
          </>
        ),
        accessor: "last_login",
        width: "80px",
      },
      
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Data>({ columns, data });

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
