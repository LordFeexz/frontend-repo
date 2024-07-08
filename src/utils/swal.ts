import Swal from "sweetalert2";

export const swalError = (text: string) => {
  Swal.fire({
    title: "Error",
    text: text,
    icon: "error",
  });
};
