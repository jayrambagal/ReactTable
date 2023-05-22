import React,{useMemo} from "react";
import { useTable,Column } from "react-table";
import { IUser } from "./Type";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

type Props = {
    data:IUser[];
}

export function Dummy(props:Props){
    const data = useMemo(()=> props.data, [props.data]) 

    const columns = React.useMemo<Column[]>(
        () => [
          {
            Header: () => (
              <>
                Name <ArrowDownwardIcon />
              </>
            ),
            accessor: "first_name",
            width: "250px",
          },
          {
            Header: () => (
              <>
                Status <ArrowDownwardIcon />
              </>
            ),
            accessor: "status",
          },
          {
            Header: () => (
              <>
                Role <ArrowDownwardIcon />
              </>
            ),
            accessor: "role",
          },
          {
            Header: () => (
              <>
                Last Login <ArrowDownwardIcon />
              </>
            ),
            accessor: "last_login",
          },
          {
            accessor: "view",
            width: "70px",
          },
        ],
        []
      );
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    }= useTable({columns,data})

    return(
        <div>
            hello
        </div>
    )
}

