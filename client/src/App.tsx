import React, { useEffect, useState } from "react";
import { Column,} from "react-table";
import Table  from "./components/Table";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import { useQuery,useMutation, QueryCache,QueryClient } from "@tanstack/react-query";
import { IUser } from "./components/Type";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";


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
  status?: string | string | undefined;
  last_login?: string;
  role?: string;
  view?: React.ReactNode;
};


export default function App() {
  const [apidata, setData] = useState<IUser[]>([]);
  const queryClient = new QueryClient();

  const fetchData = async () => {
    const uri = "http://localhost:5000/getdata";
    const response = await axios.get<IUser[]>(uri);
    setData(response.data);
    console.log(response.data);
    return response.data
  };


  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Name",
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
        sortType: "basic"
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }: any) => (
          <div className="flex gap-2" >
          {row.original.status==="true"? <span className="badge bg-secondary">invited</span>:<span className="badge bg-success">Active</span>
        }
            
          </div>
         
        ),
        width: "30px",
        sortType: "basic"
      },
      {
        Header: "Role" ,
        accessor: "role",
        width: "80px",
        sortType: "basic"
      },
      {
        Header:"Last Login", 
        accessor: "last_login",
        width: "80px",
        sortType: "basic"
      },
      {
        Header:"View", 
        accessor: "view",
        Cell: ({ row }: any) => (
          <div className="flex gap-2" >
          <DeleteOutlinedIcon onClick={() => handleDelete.mutate(row.original._id)} />

          <ModeEditOutlinedIcon onClick={() => handleEdit(row.original._id)}  />
            
          </div>
         
        ),
      }
    ],
    []
  );

  const { data, isLoading, error } = useQuery<IUser[], Error>(['data'], fetchData);
  const [newUser, setNewUser] = useState<IUser>({
    // Initial values for the new user
  });

  const createUserMutation = useMutation((newUser: IUser) => {
    const uri = "http://localhost:5000/postdata";
    return axios.post(uri, newUser);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['data']);
    },
  });

  const handleCreateUser = async (User:any) => {
    console.log("mai hu handlecreate mai");
    console.log("check",User);
    
    
    setNewUser({
      id: User.id,
      first_name: User.first_name,
      last_name: User.last_name,
      email: User.email,
      gender: User.gender,
      avatar: User.avatar,
      status: User.status,
      last_login: User.last_login,
      role: User.role,
    })
    console.log("data",newUser);
    await createUserMutation.mutateAsync(newUser);
    await fetchData(); 
  };

 
  const handleEdit = (id: any) => {
    console.log(id);
    
  };

  const handleDelete =  useMutation((id) => {
    return axios.delete(`http://localhost:5000/deletedata/${id}`);
  },{
    onSuccess: () => {
      window.alert("You want to delete this data")
      fetchData()
    },
  });

  

  return (
    <div className="App">
      <Table data={apidata} columns={columns}  onCreateUser={handleCreateUser}  />
    </div>
  );
}
