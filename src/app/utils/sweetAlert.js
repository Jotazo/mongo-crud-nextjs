import Swal from "sweetalert2";

export const showDeleteModal = async () => {
  return await Swal.fire({
    title: "Delete Task",
    width: 350,
    text: "¿Are you sure you want to delete this task?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#15803D",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};
