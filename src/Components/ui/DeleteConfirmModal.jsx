import Modal from "./Modal";
import Button from "./Button";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-600">
          Are you sure you want to delete{" "}
          <strong className="text-slate-900">{itemName || "this item"}</strong>?
          This action cannot be undone.
        </p>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" text="Cancel" onClick={onClose} />
        <Button variant="danger" text="Delete" onClick={onConfirm} />
      </div>
    </Modal>
  );
}
