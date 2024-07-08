"use client";

import { TableBody, TableRow, TableCell } from "@/components/ui/Mui";
import type { CustomSession } from "@/interfaces";
import type { IUser } from "@/interfaces/entities";
import type { InitialState } from "@/store/reducers";
import { useDispatch, useSelector } from "react-redux";
import EditBtn from "./EditButton";
import { useEffect } from "react";
import { GET_USER } from "@/store/action";

export interface UserTableBodyProps {
  column: (keyof IUser | "edit")[];
  session: CustomSession | null;
  initialData: IUser[];
}

export default function UserTableBody({
  column,
  session,
  initialData,
}: UserTableBodyProps) {
  const dispatch = useDispatch();
  const datas = useSelector<InitialState, IUser[]>(({ datas }) => datas);

  useEffect(() => {
    dispatch({ type: GET_USER, data: initialData });
  }, [dispatch, initialData]);
  return (
    <TableBody>
      {!!datas.length &&
        datas.map((el) => (
          <TableRow hover role="checkbox" tabIndex={-1} key={el.id}>
            {column.map((col) => (
              <TableCell key={col}>
                {col === "edit" ? (
                  <EditBtn text="Edit" session={session} id={el.id} />
                ) : (
                  el[col]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
    </TableBody>
  );
}
