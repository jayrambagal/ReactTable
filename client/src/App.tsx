import React, { useState } from "react";
import { Column } from "react-table";
import Table from "./components/Table";
import axios from "axios";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
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
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('')
  const [newLastname,setNewLastname] = useState('')
  const [flag, setFlag] = useState(false) 

  const [_id,set_Id] = useState('')
  const [id, setId] =useState('')
  const [firstname,setFirstname] = useState('')
  const [lastname,setlastname] = useState('')
  const [email,setEmail] = useState('')
  const [gender,setGender] = useState('')
  const [avatar,setAvatar] = useState('')
  const [status,setStatus] = useState('')
  const [lastlogin,setLastlogin] = useState('')
  const [role,setRole] = useState('')
  
  
  const [apidata, setData] = useState<IUser[]>([]);
  const queryClient = new QueryClient();

  const fetchData = async () => {
    const uri = "http://localhost:5000/getdata";
    const response = await axios.get<IUser[]>(uri);
    setData(response.data);
    console.log(response.data);
    return response.data;
  };

  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Name",
        accessor: "first_name",
        Cell: ({ row }: any) => (
          <div className="flex gap-2">
            <div>
              <img
                src={row.original.avatar}
                alt=""
                className=" w-[45px] h-auto rounded-[80px] shadow-sm shadow-black "
              />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 font-medium ">
                <p>{row.original.first_name}</p>
                <p>{row.original.last_name}</p>
              </div>
              <span>{row.original.email}</span>
            </div>
          </div>
        ),
        width: "250px",
        sortType: "basic",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }: any) => (
          <div className="flex gap-2">
            {row.original.status === "true" ? (
              <span className="badge bg-secondary">invited</span>
            ) : (
              <span className="badge bg-success">Active</span>
            )}
          </div>
        ),
        width: "30px",
        sortType: "basic",
      },
      {
        Header: "Role",
        accessor: "role",
        width: "80px",
        sortType: "basic",
      },
      {
        Header: "Last Login",
        accessor: "last_login",
        width: "80px",
        sortType: "basic",
      },
      {
        Header: "View",
        accessor: "view",
        Cell: ({ row }: any) => (
          <div className="flex gap-4 cursor-pointer w-[70px] justify-center">
            <DeleteOutlinedIcon
              onClick={() => handleDelete.mutate(row.original._id)}
            />

            <ModeEditOutlinedIcon
              onClick={() => handleEdit(row.original)}
            />
          </div>
        ),
        width: "90px",
      },
    ],
    []
  );

  const { data } = useQuery<IUser[], Error>(["data"], fetchData);
  const [newUser, setNewUser] = useState<IUser>({
    // Initial values for the new user
  });

  const createUserMutation = useMutation(
    (newUser: IUser) => {
      const uri = "http://localhost:5000/postdata";
      return axios.post(uri, newUser);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["data"]);
      },
    }
  );

  const handleCreateUser = async (User: any) => {
    console.log("mai hu handlecreate mai");
    console.log("check", User);

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
    });
    console.log("data", newUser);
    await createUserMutation.mutateAsync(newUser);
    await fetchData();
  };

  const updateData = useMutation(async (newData :any) => {
    console.log(_id);
    console.log(newData);
    
    
    const response = await fetch(`http://localhost:5000/updatedata/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    const data = await response.json();
    return data;
  },{
    onSuccess:()=>{
      fetchData()
    }
  })

  const UpdateDataById = async (event:any) => {
    event.preventDefault()
    const UpdatedData = {
      id:id,
      first_name: newName,
      last_name: newLastname,
      email: email,
      gender: gender,
      avatar: avatar,
      status: status,
      last_login: lastlogin,
      role: newRole,
    }

    console.log("helo",updateData);
    
  await updateData.mutateAsync(UpdatedData);

  setFlag(!flag)
  };
  

  const handleEdit = (row: any) => {
    setFlag(true)
    set_Id(row._id)
    setId(row.id)
    setFirstname(row.first_name)
    setlastname(row.last_name)
    setEmail(row.email)
    setGender(row.gender)
    setAvatar(row.avatar)
    setStatus(row.status)
    setLastlogin(row.last_login)
    setRole(row.role)
  };

  const handleDelete = useMutation(
    (id) => {
      return axios.delete(`http://localhost:5000/deletedata/${id}`);
    },
    {
      onSuccess: () => {
        window.alert("You want to delete this data");
        fetchData();
      },
    }
  );

  return (
    <div className="App flex justify-center">
      {!flag ?
      <Table data={apidata} columns={columns} onCreateUser={handleCreateUser} />
        :
      <form className="flex flex-col mt-[60px] gap-3" onSubmit={UpdateDataById}>
        <h2 className="font-bold"> upadate the data </h2>
        <label>
          FirstName:
          <input
            className=" ml-4 border-solid border-2 border-black-600"
            placeholder="name"
            type="text"
            value={newName}
            onChange={(e)=>{setNewName(e.target.value)}}
            required
          />
        </label>

        <label>
          LastName:
          <input
            className=" ml-4 border-solid border-2 border-black-600"
            placeholder="role"
            type="text"
            value={newLastname}
            onChange={(e)=>{setNewLastname(e.target.value)}}
            required
          />
        </label>

        <label>
          Role:
          <input
            className=" ml-4 border-solid border-2 border-black-600"
            placeholder="role"
            type="text"
            value={newRole}
            onChange={(e)=>{setNewRole(e.target.value)}}
            required
          />
        </label>

        <button className="w-[80px] border border-black" type="submit">Update</button>

      </form>}
    </div>
  );
}
