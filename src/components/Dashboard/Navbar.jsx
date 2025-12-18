"use client";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

// const NAVBAR_HEIGHT = 64;

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleLogoutConfirm = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Redirect to login page
    router.push("/");
    setOpenDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          // height: NAVBAR_HEIGHT,
          backgroundColor: "#ea580c", // orange-600
        }}
      >
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Dashboard
            </Link>
          </Typography>

          {user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {user.firstName} {user.lastName}
              </Typography>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleMenuOpen}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>

          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to logout?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                No
              </Button>
              <Button
                onClick={handleLogoutConfirm}
                color="error"
                variant="contained"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// export { NAVBAR_HEIGHT };
