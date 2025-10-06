import Modal from "./Modal";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export default function ConfirmDialog({
  open,
  title = "Confirm",
  description = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      maxWidthClass="max-w-md"
    >
      <p className="text-slate-600">{description}</p>
      <div className="mt-5 flex justify-end gap-3">
        <button
          className="btn btn-outline"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelText}
        </button>
        <button
          className="btn btn-primary"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Processing..." : confirmText}
        </button>
      </div>
    </Modal>
  );
}
