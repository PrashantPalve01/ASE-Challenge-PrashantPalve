import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronUp,
  ChevronDown,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Briefcase,
  User,
} from "lucide-react";
import { Employee, SortConfig, SortField } from "../types/employee";
import { useDebounce } from "../hooks/useDebounce";

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const ITEMS_PER_PAGE = 10;

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  loading,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "name",
    order: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEmployees = useMemo(() => {
    if (!debouncedSearch.trim()) return employees;

    const query = debouncedSearch.toLowerCase();
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.position.toLowerCase().includes(query)
    );
  }, [employees, debouncedSearch]);

  const sortedEmployees = useMemo(() => {
    const sorted = [...filteredEmployees];
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.field].toLowerCase();
      const bValue = b[sortConfig.field].toLowerCase();

      if (aValue < bValue) return sortConfig.order === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.order === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredEmployees, sortConfig]);

  const totalPages = Math.ceil(sortedEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedEmployees, currentPage]);

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const renderSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }
    return sortConfig.order === "asc" ? (
      <ChevronUp className="w-4 h-4 text-primary-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-primary-600" />
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-primary-400 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1s" }}
          ></div>
        </div>
        <p className="mt-4 text-gray-600 animate-pulse">Loading employees...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-primary-600" />
        <input
          type="text"
          placeholder="Search employees by name, email, or position..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all duration-300 placeholder:text-gray-400 shadow-sm hover:shadow-md"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {paginatedEmployees.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-4 animate-bounce">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No employees found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery
              ? "Try adjusting your search query"
              : "Add your first employee to get started"}
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-primary-50 to-primary-100">
                  <tr>
                    <th
                      onClick={() => handleSort("name")}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-primary-200 transition-colors duration-200 group"
                    >
                      <div className="flex items-center space-x-2">
                        <span>Name</span>
                        <div className="transform group-hover:scale-110 transition-transform">
                          {renderSortIcon("name")}
                        </div>
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("email")}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-primary-200 transition-colors duration-200 group"
                    >
                      <div className="flex items-center space-x-2">
                        <span>Email</span>
                        <div className="transform group-hover:scale-110 transition-transform">
                          {renderSortIcon("email")}
                        </div>
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("position")}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-primary-200 transition-colors duration-200 group"
                    >
                      <div className="flex items-center space-x-2">
                        <span>Position</span>
                        <div className="transform group-hover:scale-110 transition-transform">
                          {renderSortIcon("position")}
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {paginatedEmployees.map((employee, index) => (
                    <tr
                      key={employee.id}
                      className="hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent transition-all duration-200 group"
                      style={{
                        animation: `fadeIn 0.3s ease-in-out ${
                          index * 0.05
                        }s both`,
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                            {employee.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {employee.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {employee.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 shadow-sm">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {employee.position}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => onEdit(employee)}
                          className="text-primary-600 hover:text-primary-900 mr-4 inline-flex items-center transition-all duration-200 transform hover:scale-110"
                          title="Edit employee"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          <span className="font-medium">Edit</span>
                        </button>
                        <button
                          onClick={() => onDelete(employee)}
                          className="text-red-500 hover:text-red-700 inline-flex items-center transition-all duration-200 transform hover:scale-110"
                          title="Delete employee"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          <span className="font-medium">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-4">
            {paginatedEmployees.map((employee, index) => (
              <div
                key={employee.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {employee.name}
                      </h3>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 mt-1">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {employee.position}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-primary-500" />
                    <span>{employee.email}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => onEdit(employee)}
                    className="flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-all duration-200 font-medium shadow-sm hover:shadow"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(employee)}
                    className="flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium shadow-sm hover:shadow"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-semibold text-primary-600">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-primary-600">
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      sortedEmployees.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-primary-600">
                    {sortedEmployees.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md transform hover:-translate-x-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <div className="flex items-center px-4 py-2 text-sm font-semibold text-primary-700 bg-primary-50 border border-primary-200 rounded-lg">
                  <span className="hidden sm:inline">Page </span>
                  {currentPage}{" "}
                  <span className="mx-1 hidden sm:inline">of</span>{" "}
                  <span className="mx-1 sm:hidden">/</span> {totalPages}
                </div>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md transform hover:translate-x-1"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeTable;
