import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ToolbarButton from "./Toolbar";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [arrIds, setArrIds] = useState([]);
  const [logedUser, setLogedUser] = useState({});

  const navigate = useNavigate();

  const fetchUsers = async () => {
    const url = "http://localhost:1337/api/users";
    try {
      const response = await fetch(url);
      const users = await response.json();
      return users;
    } catch (error) {
      console.log("error", error);
    }
  };

  const checkBlocked = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedUser = jwtDecode(token);
      if (!decodedUser) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setLogedUser(decodedUser);
        const users = await fetchUsers();
        console.log("users:", users);
        console.log("logedUser:", logedUser);

        if (
          users.find((user) => user.id === decodedUser.id && user.isBlocked)
        ) {
          navigate("/login");
        }

        setUsers(users);
      }
    }
  };

  useEffect(() => {
    checkBlocked();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "UpdatedAt", headerName: "Last login time", width: 150 },
    { field: "CreatedAt", headerName: "Registration time", width: 150 },
    { field: "isBlocked", headerName: "Blocked ", type: "boolean" },
  ];

  const deleteUser = async (ids) => {
    // console.log(ids, "id");
    if (ids.includes(logedUser.id)) {
      alert("loged user");
    } else {
      const userId = await fetch(`http://localhost:1337/api/users`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(ids),
      });
    }
  };

  const blockUser = async (ids) => {
    const response = await fetch(`http://localhost:1337/api/users/block`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(ids),
    });

    const users = await response.json();
    setUsers(users);

    if (users.find((user) => user.id === logedUser.id && user.isBlocked)) {
      navigate("/login");
    }
  };

  const unblockUser = async (ids) => {
    const response = await fetch(`http://localhost:1337/api/users/unblock`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(ids),
    });

    const users = await response.json();
    setUsers(users);
  };

  return (
    <div>
      <p>You are logged as {logedUser.email}</p>
      <h2>USERS LIST</h2>

      <ToolbarButton
        blockUser={blockUser}
        deleteUser={deleteUser}
        arrIds={arrIds}
        unblockUser={unblockUser}
      />
      <div style={{ height: 380, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={true}
          onSelectionModelChange={(ids) => {
            setArrIds(ids);
          }}
        />
      </div>
    </div>
  );
};

export default UsersList;
