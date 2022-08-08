import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const ToolbarButton = ({deleteUser, arrIds, blockUser, unblockUser}) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => blockUser(arrIds)} color="inherit">
            Block
            <LockIcon />
          </Button>
          <Button onClick={() => unblockUser(arrIds)} color="inherit">
            Unblock
            <LockOpenIcon />
          </Button>
          <Button onClick={() => deleteUser(arrIds)} color="inherit">
            Delete
            <DeleteIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ToolbarButton;
