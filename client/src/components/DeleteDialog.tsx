import React from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";
import { Employee } from "../types/employee";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  employee: Employee | null;
  loading: boolean;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  employee,
  loading,
}) => {
  if (!isOpen || !employee) return null;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={loading ? undefined : onClose}
      ></div>

      {/* Dialog Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all animate-scale-in border border-gray-100 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          {/* Content */}
          <div className="relative p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={loading}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon with Animation */}
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-orange-100 mb-6 animate-bounce">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                <AlertTriangle className="relative w-8 h-8 text-red-600" />
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center animate-slide-in">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Delete Employee?
              </h3>
              <div className="space-y-2 mb-6">
                <p className="text-gray-600">Are you sure you want to delete</p>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 animate-pulse">
                  <p className="font-bold text-gray-900 text-lg">
                    {employee.name}
                  </p>
                  <p className="text-sm text-gray-600">{employee.email}</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold mt-2">
                    {employee.position}
                  </span>
                </div>
                <p className="text-sm text-red-600 font-medium">
                  ⚠️ This action cannot be undone
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className="flex items-center justify-center space-x-3 animate-slide-in"
              style={{ animationDelay: "0.1s" }}
            >
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 transform hover:scale-105"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="group relative flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
                disabled={loading}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Deleting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
