"use client";
import { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";
import { Table, TableRow, TableCell, TextField } from "@mui/material";

export default function UsersPage() {
  const { users, fetchUsers } = useUserStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers(10, 0, search);
  }, [search]);

  return (
    <>
      <TextField label="Search Users" onChange={(e)=>setSearch(e.target.value)} />
      <Table>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{u.firstName} {u.lastName}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.gender}</TableCell>
            <TableCell>{u.phone}</TableCell>
            <TableCell>{u.company?.name}</TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  );
}
