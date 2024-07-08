"use client";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
} from "@/components/ui/Mui";
import { useState, type MouseEventHandler, forwardRef } from "react";
import { swalError } from "@/utils/swal";
import type { CustomSession } from "@/interfaces";
import { useSelector } from "react-redux";
import type { InitialState } from "@/store/reducers";
import type { IUser } from "@/interfaces/entities";
import EditForm from "./EditForm";

export interface EditBtnProps {
  text: string;
  session: CustomSession | null;
  id: string;
}

const Transition = forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditBtn({ text, session, id }: EditBtnProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<IUser | null>(null);

  const datas = useSelector<InitialState, IUser[]>(({ datas }) => datas);

  const onOpen: MouseEventHandler = (e) => {
    e.preventDefault();

    if (!session) {
      swalError("Unauthorized, You must login first");
      return;
    }

    const user = datas.find((el) => el.id === id);
    if (!user) {
      swalError("unexpected error");
      return;
    }
    setData(user);

    setOpen(true);
  };

  const onClose: MouseEventHandler = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <>
      <Button onClick={onOpen} variant="contained">
        {text}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="dialog-form-description"
      >
        <DialogTitle>Update User</DialogTitle>
        {!!data && (
          <DialogContent>
            <EditForm user={data} setOpen={setOpen} />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
