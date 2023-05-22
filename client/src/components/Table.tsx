import React, { useState, useEffect } from "react";
import { UseTableInstanceProps,UseSortByColumnProps } from "react-table";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Button from "@mui/material/Button";
import exportFromJSON from "export-from-json";
import { IUser } from "./Type";
import axios from "axios";

export interface TableNewProps<T extends object>
  extends Pick<
    UseTableInstanceProps<T>,
    | 'getTableProps'
    | 'headerGroups'
    | 'getTableBodyProps'
    | 'prepareRow'
    | 'rows'
  > {}

export function Table<T extends object>(props: TableNewProps<T>) {

  const [data, setData] = useState<IUser[]>([]);
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    props;

  const HandleCsv = async () => {
    const uri = "http://localhost:5000/getdata";
    // const uri = "./MOCK_DATA.json";
    const response = await axios.get<IUser[]>(uri);
    setData(response.data);
    console.log("respoanse", response.data);
    console.log("row", data);
    //fetch the api here.

    const fileName = "download";
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };
  // useEffect(() => {
  //   HandleCsv();
  // }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center border-spacing-8 border-cyan-500 border-s-indigo-100 ">
      <div className="w-[1100px]">
        <div className="flex mt-[50px] ">
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
                    <th
                      {...column.getHeaderProps()}
                      className="p-3 text-[#5C5C5C]"
                      style={{ textAlign: "start", width: column.width }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                  <th className="w-[60px] ml-[40px]"></th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="">
              {rows.map((row, rowIndex) => {
                prepareRow(row);
                const isEvenRow = rowIndex % 2 === 0;
                const rowStyles = {
                  height: "70px", // Set the desired height for each row
                  backgroundColor: isEvenRow ? "#FFFFFF" : "	#f9f9f9", // Alternate background colors
                  padding: "10px",
                };
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
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
                    <td style={rowStyles} className=" border-b-2 border-b-[rgb(115 115 115)]">
                      <div className="flex justify-center gap-4 cursor-pointer ">
                      <DeleteOutlinedIcon/>
                      <ModeEditOutlinedIcon/>
                      </div>
                      
                    </td>
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
            >
              Previous
            </Button>
            <span>Page</span>
            <Button
              variant="outlined"
              sx={{
                color: "rgb(113 113 122)",
                borderColor: "#e5e7eb",
                height: "35px",
              }}
              endIcon={<EastOutlinedIcon />}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
