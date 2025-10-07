import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserPlus, Briefcase, Users, TrendingUp, Sparkles } from "lucide-react";
import { Employee } from "./types/employee";
import { EmployeeFormData } from "./utils/validation";
import { employeeApi } from "./services/api";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeModal from "./components/EmployeeModal";
import DeleteDialog from "./components/DeleteDialog";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [operationLoading, setOperationLoading] = useState(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Selected employee for edit/delete
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  // Fetch all employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  /**
   * Fetch all employees from API
   */
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeApi.getAll();
      setEmployees(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch employees",
        {
          icon: "❌",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle add employee
   */
  const handleAddEmployee = async (data: EmployeeFormData) => {
    try {
      setOperationLoading(true);
      const newEmployee = await employeeApi.create(data);
      setEmployees((prev) => [...prev, newEmployee]);
      setIsAddModalOpen(false);
      toast.success("Employee added successfully!", {
        icon: "🎉",
        style: {
          borderRadius: "12px",
          background: "#10b981",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add employee",
        {
          icon: "❌",
        }
      );
      throw error;
    } finally {
      setOperationLoading(false);
    }
  };

  /**
   * Handle edit employee
   */
  const handleEditEmployee = async (data: EmployeeFormData) => {
    if (!selectedEmployee) return;

    try {
      setOperationLoading(true);
      const updatedEmployee = await employeeApi.update(
        selectedEmployee.id,
        data
      );
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployee.id ? updatedEmployee : emp
        )
      );
      setIsEditModalOpen(false);
      setSelectedEmployee(null);
      toast.success("Employee updated successfully!", {
        icon: "✅",
        style: {
          borderRadius: "12px",
          background: "#3b82f6",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update employee",
        {
          icon: "❌",
        }
      );
      throw error;
    } finally {
      setOperationLoading(false);
    }
  };

  /**
   * Handle delete employee
   */
  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return;

    try {
      setOperationLoading(true);
      await employeeApi.delete(selectedEmployee.id);
      setEmployees((prev) =>
        prev.filter((emp) => emp.id !== selectedEmployee.id)
      );
      setIsDeleteDialogOpen(false);
      setSelectedEmployee(null);
      toast.success("Employee deleted successfully!", {
        icon: "🗑️",
        style: {
          borderRadius: "12px",
          background: "#ef4444",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete employee",
        {
          icon: "❌",
        }
      );
    } finally {
      setOperationLoading(false);
    }
  };

  /**
   * Open edit modal with selected employee
   */
  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  /**
   * Open delete dialog with selected employee
   */
  const openDeleteDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Close all modals and reset selected employee
   */
  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedEmployee(null);
  };

  // Get unique positions count
  const uniquePositions = new Set(employees.map((emp) => emp.position)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-indigo-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-primary-500 to-indigo-600 p-3 rounded-2xl shadow-xl transform hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                  Employee Management
                </h1>
                <p className="text-sm text-gray-600 mt-1 flex items-center">
                  <Sparkles className="w-4 h-4 mr-1 text-yellow-500" />
                  Manage your team efficiently
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-indigo-600 text-white rounded-xl hover:from-primary-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-fade-in"
            >
              <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <UserPlus className="w-5 h-5 mr-2 transform group-hover:rotate-12 transition-transform" />
              <span className="font-semibold">Add Employee</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-in">
            {/* Total Employees */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Employees
                  </p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                    {employees.length}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary-100 to-indigo-100 p-4 rounded-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="font-medium">Active workforce</span>
              </div>
            </div>

            {/* Unique Positions */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Unique Positions
                  </p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {uniquePositions}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Briefcase className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-purple-600">
                <Sparkles className="w-4 h-4 mr-1" />
                <span className="font-medium">Diverse roles</span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Team Status
                  </p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Active
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="font-medium">All systems operational</span>
              </div>
            </div>
          </div>
        )}

        {/* Employee Table Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Employee Directory
            </h2>
            <p className="text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-2 text-primary-500" />
              {employees.length === 0
                ? "No employees yet. Add your first team member!"
                : `Managing ${employees.length} ${
                    employees.length === 1 ? "employee" : "employees"
                  }`}
            </p>
          </div>

          {/* Employee Table */}
          <EmployeeTable
            employees={employees}
            loading={loading}
            onEdit={openEditModal}
            onDelete={openDeleteDialog}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-white/80 backdrop-blur-lg border-t border-gray-200/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
              Built with ❤️ for the Employee Management System assignment.
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Employee Management System
            </p>
          </div>
        </div>
      </footer>

      {/* Add Employee Modal */}
      <EmployeeModal
        isOpen={isAddModalOpen}
        onClose={closeModals}
        onSubmit={handleAddEmployee}
        loading={operationLoading}
      />

      {/* Edit Employee Modal */}
      <EmployeeModal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        onSubmit={handleEditEmployee}
        employee={selectedEmployee}
        loading={operationLoading}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeModals}
        onConfirm={handleDeleteEmployee}
        employee={selectedEmployee}
        loading={operationLoading}
      />
    </div>
  );
}

export default App;
