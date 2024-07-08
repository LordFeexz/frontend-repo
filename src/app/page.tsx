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

export default async function Home() {
  const {
    data,
    totalData = 0,
    page = 1,
    limit = 10,
  } = await getUserList({
    page: 1,
    limit: 10,
  });
  const column: (keyof IUser)[] = ["name", "email", "username"];

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
            <TableBody>
              {!!data.length &&
                data.map((el) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={el.id}>
                    {column.map((col) => (
                      <TableCell key={col}>{el[col]}</TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          initialData={data}
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
