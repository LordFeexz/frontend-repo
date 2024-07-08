import Container from "@/components/Container";
import { getUserList } from "./action";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/Mui";
import type { IUser } from "@/interfaces/entities";
import Pagination from "./components/Pagination";
import EditBtn from "./components/EditButton";
import { getServerSideSession } from "@/utils/session";
import UserTableBody from "./components/TableBody";

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
    </Container>
  );
}
