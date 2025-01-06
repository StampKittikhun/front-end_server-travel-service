import React from "react";
import { Typography, Box } from "@mui/material";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import CommuteOutlinedIcon from "@mui/icons-material/CommuteOutlined";

function HeaderSAU() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <CommuteOutlinedIcon size="large" edge="start" color="inherit" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Travel App
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Box width={"100%"} textAlign={"center"} p={2}>
        <Typography variant="h2">WELCOME TO MY TRAVEL APP</Typography>
        <Typography variant="h4">(version by dti-sau)</Typography>
      </Box>
    </>
  );
}

export default HeaderSAU;
