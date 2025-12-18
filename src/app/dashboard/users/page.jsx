"use client";
import { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function UsersPage() {
  const { users, fetchUsers, loading } = useUserStore();
  const [search, setSearch] = useState("");

  // 🔥 Debounce search (real-world behavior)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(10, 0, search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="mt-20 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" fontWeight={600} color="black">
          Users List
        </Typography>

        <TextField
          size="small"
          label="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <TableContainer component={Paper} elevation={2}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Gender</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Company</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              users.map((u) => (
                <TableRow
                  key={u.id}
                  hover
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    {u.firstName} {u.lastName}
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {u.gender}
                  </TableCell>
                  <TableCell>{u.phone}</TableCell>
                  <TableCell>{u.company?.name || "-"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
