import Container from "@/components/Container";
import { getUserList } from "./action";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Box,
  Typography,
} from "@/components/ui/Mui";
import type { IUser } from "@/interfaces/entities";
import Pagination from "./components/Pagination";
import { getServerSideSession } from "@/utils/session";
import UserTableBody from "./components/TableBody";
import Link from "next/link";

export default async function Home() {
  const [{ data, totalData = 0, page = 1, limit = 10 }, session] =
    await Promise.all([
      getUserList({
        page: 1,
        limit: 10,
      }),
      getServerSideSession(),
    ]);

  const column: (keyof IUser | "edit")[] = [
    "name",
    "email",
    "username",
    "edit",
  ];

  return (
    <Container
      as="main"
      data-aos="fade-up"
      className="flex flex-col justify-center h-full w-full no-scrollbar scroll-smooth transition-all duration-300 mx-auto"
    >
      <Paper sx={{ width: "97%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {column.map((el, idx) => (
                  <TableCell key={idx} sx={{ minWidth: "170px" }}>
                    {el}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <UserTableBody
              initialData={data}
              column={column}
              session={session}
            />
          </Table>
        </TableContainer>
        <Pagination
          as="div"
          totalData={totalData}
          rowsPerPageOptions={[10, 25, 100]}
          page={page}
          limit={limit}
        />
      </Paper>
      {!session && (
        <Box
          sx={{ display: "flex", width: "full", justifyContent: "flex-end" }}
        >
          <Link href={"/login"} prefetch className="mt-4 relative right-[20%]">
            <Button variant="contained">
              <Typography>Login</Typography>
            </Button>
          </Link>
        </Box>
      )}
    </Container>
  );
}
