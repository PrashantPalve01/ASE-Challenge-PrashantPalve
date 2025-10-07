import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, User, Mail, Briefcase, Sparkles } from "lucide-react";
import { Employee } from "../types/employee";
import { employeeSchema, EmployeeFormData } from "../utils/validation";

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  employee?: Employee | null;
  loading: boolean;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  employee,
  loading,
}) => {
  const isEditMode = !!employee;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
    },
  });

  useEffect(() => {
    if (isOpen && employee) {
      reset({
        name: employee.name,
        email: employee.email,
        position: employee.position,
      });
    } else if (isOpen && !employee) {
      reset({
        name: "",
        email: "",
        position: "",
      });
    }
  }, [isOpen, employee, reset]);

  const handleFormSubmit = async (data: EmployeeFormData) => {
    await onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={loading ? undefined : handleClose}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all animate-scale-in border border-gray-100">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <div className="relative bg-gradient-to-r from-primary-500 to-indigo-600 rounded-t-3xl p-6 overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {isEditMode ? "Edit Employee" : "Add New Employee"}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-lg"
                disabled={loading}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="relative text-white/90 text-sm mt-2">
              {isEditMode
                ? "Update employee information"
                : "Fill in the details to add a new team member"}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="relative p-6 space-y-5"
          >
            <div className="space-y-2 animate-slide-in">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    className={`w-5 h-5 transition-colors ${
                      errors.name
                        ? "text-red-500"
                        : "text-gray-400 group-focus-within:text-primary-600"
                    }`}
                  />
                </div>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-300 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-primary-500 hover:border-gray-300"
                  }`}
                  placeholder="e.g., John Doe"
                  disabled={loading}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 flex items-center animate-slide-in">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div
              className="space-y-2 animate-slide-in"
              style={{ animationDelay: "0.1s" }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    className={`w-5 h-5 transition-colors ${
                      errors.email
                        ? "text-red-500"
                        : "text-gray-400 group-focus-within:text-primary-600"
                    }`}
                  />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-300 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-primary-500 hover:border-gray-300"
                  }`}
                  placeholder="e.g., john.doe@company.com"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center animate-slide-in">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div
              className="space-y-2 animate-slide-in"
              style={{ animationDelay: "0.2s" }}
            >
              <label
                htmlFor="position"
                className="block text-sm font-semibold text-gray-700"
              >
                Position <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase
                    className={`w-5 h-5 transition-colors ${
                      errors.position
                        ? "text-red-500"
                        : "text-gray-400 group-focus-within:text-primary-600"
                    }`}
                  />
                </div>
                <input
                  {...register("position")}
                  type="text"
                  id="position"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-300 ${
                    errors.position
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-primary-500 hover:border-gray-300"
                  }`}
                  placeholder="e.g., Software Developer"
                  disabled={loading}
                />
              </div>
              {errors.position && (
                <p className="text-sm text-red-600 flex items-center animate-slide-in">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.position.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 transform hover:scale-105"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="group relative px-6 py-3 bg-gradient-to-r from-primary-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
                disabled={loading}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                {loading ? (
                  <span className="flex items-center">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isEditMode ? "Updating..." : "Creating..."}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    {isEditMode ? "Update Employee" : "Add Employee"}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
