"use client";

import { TablePagination } from "@/components/ui/Mui";
import type { IUser } from "@/interfaces/entities";
import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";

export interface PaginationProps {
  as: "div" | "section" | "article";
  rowsPerPageOptions: number[];
  totalData: number;
  limit: number;
  page: number;
}

export default function Pagination({
  as,
  rowsPerPageOptions,
  totalData,
  limit: _limit,
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
