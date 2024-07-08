"use client";

import { TablePagination } from "@/components/ui/Mui";
import type { IUser } from "@/interfaces/entities";
import { GET_USER } from "@/store/action";
import { useEffect, useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";

export interface PaginationProps {
  as: "div" | "section" | "article";
  rowsPerPageOptions: number[];
  totalData: number;
  limit: number;
  page: number;
  initialData: IUser[];
}

export default function Pagination({
  as,
  rowsPerPageOptions,
  totalData,
  limit: _limit,
  initialData,
  page: _page,
}: PaginationProps) {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(_page);
  const [limit, setLimit] = useState<number>(_limit);

  const handlePageChange = (e: any, newPage: number) => {
    if (newPage < 0) return;
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 0) return;
    setLimit(+e.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch({ type: GET_USER, data: initialData });
  }, [dispatch, initialData]);

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component={as}
      count={totalData}
      rowsPerPage={limit}
      page={page - 1}
      onRowsPerPageChange={handleRowsPerPageChange}
      onPageChange={handlePageChange}
    />
  );
}
