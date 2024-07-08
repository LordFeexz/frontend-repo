"use client";

import type { IUser } from "@/interfaces/entities";
import { Box, TextField } from "@/components/ui/Mui";
import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import SubmitBtn from "@/components/SubmitBtn";
import { updateUser } from "../login/action";
import { swalError } from "@/utils/swal";
import { useDispatch } from "react-redux";
import { UPDATE_USER } from "@/store/action";

export interface EditFormProps {
  user: IUser;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditForm({ user, setOpen }: EditFormProps) {
  const dispatch = useDispatch();
  const [{ email, name, username }, setData] = useState<IUser>(user);

  const actionHandler = async (formData: FormData) => {
    if (!email || !name || !username) return;

    formData.append("id", user.id);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("username", username);

    const { error } = await updateUser(formData);
    if (error) {
      swalError(error);
      return;
    }

    dispatch({
      type: UPDATE_USER,
      data: { id: user.id, email, name, username },
    });
    setOpen(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      component="form"
      sx={{
        mt: 1,
        border: "1px solid #E2E8F0",
        m: "auto",
        width: "100%",
        maxWidth: "400px",
        p: 4,
        borderRadius: "6px",
      }}
      autoComplete="on"
      action={actionHandler}
    >
      <TextField
        margin="normal"
        fullWidth
        sx={{ borderRadius: "6px" }}
        id="email"
        label={`Email`}
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={onChangeHandler}
      />
      <TextField
        margin="normal"
        fullWidth
        sx={{ borderRadius: "6px" }}
        id="username"
        label={`Username`}
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={onChangeHandler}
      />
      <TextField
        margin="normal"
        fullWidth
        sx={{ borderRadius: "6px" }}
        id="name"
        label={`Name`}
        name="name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={onChangeHandler}
      />
      <SubmitBtn
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        text="Save"
        disabled={
          email === user.email &&
          username === user.username &&
          name === user.name
        }
      />
    </Box>
  );
}
