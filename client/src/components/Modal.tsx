// src/components/Modal.tsx
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidthClass?: string;
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidthClass = "max-w-lg",
}: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 sm:p-6"
      onMouseDown={onClose}
    >
      <div
        className={clsx(
          "card w-full max-h-[85vh] overflow-y-auto",
          maxWidthClass,
          "relative"
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="mb-3 text-lg font-semibold text-slate-800">
            {title}
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
