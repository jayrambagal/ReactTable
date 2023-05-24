import React, { useState, useEffect, useMemo } from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Button from "@mui/material/Button";
import exportFromJSON from "export-from-json";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import axios from "axios";
import {
  useTable,
  Column,
  usePagination,
  useSortBy,
  TableInstance,
  HeaderGroup,
  TableState,
  Row,
  UseSortByInstanceProps,
  UseSortByColumnProps,
  UsePaginationInstanceProps,
} from "react-table";
import { IUser } from "./Type";

interface FormData {
  id?: number;
      name?: string;
      username?: string;
      first_name?: string;
      last_name?: string;
      email?: string;
      gender?: string;
      avatar?: string;
      status?: boolean | undefined | string;
      last_login?: string;
      role?: string;
      view?: React.ReactNode;
      width?:string;
      accessor?:string
}

interface TableProps<T extends object> {
  columns: any[];
  data: T[];
  onDelete?: (id: number) => void;
  page?: any[];
  nextPage?: () => void;
  previousPage?: () => void;
  canNextPage?: boolean;
  canPreviousPage?: boolean;
  pageIndex?: number;
  state?:any
  onCreateUser?: (newUser:FormData) => void;
}



function Table<T extends object>(props: TableProps<T>) {
  const { columns, data,onCreateUser } = props;

  // Create the table instance using the provided columns and data
  const tableInstance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 } as Partial<TableState<T>>,
    },
    useSortBy,
    usePagination
  ) as TableInstance<T> &
    UseSortByInstanceProps<T> &
    UsePaginationInstanceProps<T>;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    state
  
  } = tableInstance;

  const [flag , setFlag] = useState(false)
  const [formData, setFormData] = useState<IUser>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    avatar: "",
    status: "",
    last_login: "",
    role: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if(onCreateUser){
      onCreateUser(formData)
      setFormData({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        avatar: "",
        status: "",
        last_login: "",
        role: "",
      })
      console.log("data will add",formData);
      setFlag(!flag)
      
    }
    
  };
  const HandleCsv = async () => {
    const fileName = "download";
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };


  return (
    <div className="w-screen h-screen flex flex-col items-center border-spacing-8 border-cyan-500 border-s-indigo-100 ">
      { !flag ? <div className="w-[1100px]">
        <div className="flex mt-[30px] ">
          <p className="text-xl font-semibold"> Company Setting</p>
        </div>

        <div className=" mt-[20px] w-[335px] flex border border-black-600 rounded-md overflow-hidden ">
          <div className="px-2 py-1 border border-black-600">General</div>
          <div className="px-2 py-1 bg-slate-300 border font-[400] border-black-600">
            Users
          </div>
          <div className="px-2 py-1 border border-black-600">Plan</div>
          <div className="px-2 py-1 border border-black-600">Billing</div>
          <div className="px-2 py-1 border border-black-600">Intigrations</div>
        </div>
        <div className="mt-[20px] border-2 border-black-800 rounded-md">
          <div className="flex justify-between p-6  border-b-2 border-b-[rgb(115 115 115)]">
            <div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold text-lg">Users</p>
                <span className="badge bg-success w-15 h-5 flex gap-1">
                  <div>{rows.length}</div>users
                </span>
              </div>
              <p className="text-[#5C5C5C]">
                Managing your team members and their accound permissions here.
              </p>
            </div>
            <div className="flex gap-2 ">
              <Button
                variant="outlined"
                sx={{
                  color: "rgb(113 113 122)",
                  borderColor: "#e5e7eb",
                  height: "35px",
                }}
                startIcon={<CloudDownloadOutlinedIcon />}
                onClick={HandleCsv}
              >
                Download CSV
              </Button>

              <Button
                variant="contained"
                sx={{ color: "white", height: "35px" }}
                startIcon={<AddOutlinedIcon />}
                onClick={()=>{setFlag(!flag)}}
              >
                Add user
              </Button>
            </div>
          </div>
          <table {...getTableProps()} className="w-full ">
            <thead className="">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    // <th
                    //   {...column.getHeaderProps(getSortByToggleProps())}
                    //   className="p-3 text-[#5C5C5C]"
                    //   style={{ textAlign: "start", width: column.width }}
                    // >
                    //   {column.render("Header")}
                    // </th>
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ textAlign: "start", width: column.width }} className="p-3 text-[#5C5C5C]">
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span className="cursor-pointer" >
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <ArrowDownwardIcon />
                          : <ArrowUpwardIcon/>
                        : <ArrowDownwardIcon />}
                    </span>
                  </th>
                  ))}
                
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="">
              {page.map((row, rowIndex) => {
                prepareRow(row);
                const isEvenRow = rowIndex % 2 === 0;
                const rowStyles = {
                  height: "70px", // Set the desired height for each row
                  backgroundColor: isEvenRow ? "#FFFFFF" : "	#f9f9f9", // Alternate background colors
                  padding: "10px",
                };
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    
                    {row.cells.map((cell) => {
                      // console.log();
                      // console.log(row);
                      return (
                        
                        <td
                          {...cell.getCellProps()}
                          style={rowStyles}
                          className="border-b-2 border-b-[rgb(115 115 115)]"
                        >
                          {cell.render("Cell")}
                        </td>
                        

                      );
                    })}
                   
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <div className="flex justify-between p-4 mt-[-20px]">
            <Button
              variant="outlined"
              sx={{
                color: "rgb(113 113 122)",
                borderColor: "#e5e7eb",
                height: "35px",
              }}
              startIcon={<KeyboardBackspaceOutlinedIcon />}
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              Previous
            </Button>
            <div className="flex gap-[40px] cursor-pointer font-medium">
            {pageOptions.map((pageNumber, index) => (
                // <button
                //   key={index}
                //   onClick={() => {
                //     setPageIndex(index);
                //   }}
                //   className={pageIndex === index ? 'active' : ''}
                // >
                  <p>{pageNumber + 1}</p>
                // </button>
              ))}
              </div>
            <Button
              variant="outlined"
              sx={{
                color: "rgb(113 113 122)",
                borderColor: "#e5e7eb",
                height: "35px",
              }}
              endIcon={<EastOutlinedIcon />}
              onClick={nextPage}
              disabled={!canNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </div> :
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
      <label>
        ID:
        <input className="ml-4 border-solid border-2 border-black-600" placeholder="id" type="number" name="id" value={formData.id} onChange={handleInputChange} />
      </label>
      <label>
        First Name:
        <input className=" ml-4 border-solid border-2 border-black-600" placeholder="first name" type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
      </label>
      <label>
        Last Name:
        <input className=" ml-4 border-solid border-2 border-black-600" placeholder="last name" type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input className=" ml-4 border-solid border-2 border-black-600" placeholder="email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Gender:
        <input className=" ml-4 border-solid border-2 border-black-600" placeholder="gender" type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
      </label>
      <label>
        Avatar:
        <input className=" ml-4 border-solid border-2 border-black-600" placeholder="avatar" type="text" name="avatar" value={formData.avatar} onChange={handleInputChange} />
      </label>
      <label>
        Status:
        <input className=" ml-4 border-solid border-2 border-black-600" placeholder="status" type="text" name="status"  onChange={handleInputChange} />
      </label>
      <label>
        Last Login:
        <input className=" ml-4 border-solid border-2 border-black-600" placeholder="last name" type="text" name="last_login" value={formData.last_login} onChange={handleInputChange} />
      </label>
      <label>
        Role:
        <input className=" ml-4 border-solid border-2 border-black-600" placeholder="role" type="text" name="role" value={formData.role} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit</button>
    </form>}
    </div>
  );
}
export default Table;
