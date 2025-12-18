"use client";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

const drawerWidth = 240;
const navbarHeight = 64;

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Users List", path: "/dashboard/users", icon: <PeopleIcon /> },
    {
      label: "Products List",
      path: "/dashboard/products",
      icon: <ShoppingCartIcon />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          mt: `${navbarHeight}px`,
          height: `calc(100vh - ${navbarHeight}px)`,
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <Link href={`${item?.path}`} className="w-full">
                <ListItemButton
                  selected={pathname === item.path}
                  sx={{
                    backgroundColor:
                      pathname === item.path ? "#ea580c" : "transparent",
                    color: pathname === item.path ? "white" : "inherit",
                    "&:hover": {
                      backgroundColor:
                        pathname === item.path
                          ? "#ea580c"
                          : "rgba(0, 0, 0, 0.04)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#ea580c",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#dc2626",
                      },
                    },
                    "& .MuiListItemIcon-root": {
                      color: pathname === item.path ? "white" : "inherit",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item?.label}</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
