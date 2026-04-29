import { useState } from "react";

export function useCrudModals() {
  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  return {
    // Delete modal controls
    deleteModal: {
      isOpen: isDeleteOpen,
      item: itemToDelete,
      open: (item) => {
        setItemToDelete(item);
        setIsDeleteOpen(true);
      },
      close: () => {
        setIsDeleteOpen(false);
        setItemToDelete(null);
      },
    },

    // Edit modal controls
    editModal: {
      isOpen: isEditOpen,
      item: itemToEdit,
      open: (item) => {
        setItemToEdit(item);
        setIsEditOpen(true);
      },
      close: () => {
        setIsEditOpen(false);
        setItemToEdit(null);
      },
    },
  };
}
