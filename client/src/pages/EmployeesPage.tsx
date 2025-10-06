// src/pages/EmployeesPage.tsx
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createEmployee,
  deleteEmployee,
  listEmployees,
  updateEmployee,
} from "../services/employees";
import type { Employee } from "../types/employee";
import { useDebounce } from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import EmployeeForm from "../components/EmployeeForm";
import { Table, THead, TH, TBody, TR, TD } from "../components/Table";
import Skeleton from "../components/Skeleton";

const DEFAULT_LIMIT = 8;

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(DEFAULT_LIMIT);

  const debounced = useDebounce(search, 400);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["employees", { search: debounced, page, limit }],
    queryFn: () => listEmployees({ search: debounced, page, limit }),
  });

  const employees = data?.data ?? [];
  const total = data?.total ?? 0;

  const [createOpen, setCreateOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<number | null>(null);

  const createMut = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      toast.success("Employee created");
      setCreateOpen(false);
      refetch();
    },
    onError: () => toast.error("Failed to create employee"),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, values }: { id: number; values: Partial<Employee> }) =>
      updateEmployee(id, values),
    onMutate: async ({ id, values }) => {
      await refetch(); // ensure baseline
      toast.loading("Updating...", { id: "upd" });
      return { id, values };
    },
    onSuccess: () => {
      toast.success("Employee updated", { id: "upd" });
      setEditEmployee(null);
      refetch();
    },
    onError: () => toast.error("Failed to update employee", { id: "upd" }),
  });

  const deleteMut = useMutation({
    mutationFn: deleteEmployee,
    onMutate: async (id: number) => {
      toast.loading("Deleting...", { id: `del-${id}` });
      return { id };
    },
    onSuccess: (_data, id) => {
      toast.success("Employee deleted", { id: `del-${id}` });
      setDeleteEmployeeId(null);
      refetch();
    },
    onError: (_err, id) => toast.error("Failed to delete", { id: `del-${id}` }),
  });

  const isEmpty = !isLoading && !isError && employees.length === 0;

  const headerRight = useMemo(
    () => (
      <div className="flex items-center gap-3">
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        <button className="btn btn-primary" onClick={() => setCreateOpen(true)}>
          + Add Employee
        </button>
      </div>
    ),
    [search]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-800">Employees</h1>
        {headerRight}
      </div>

      <div className="card">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-9 w-40" />
            <div className="overflow-hidden rounded-xl border">
              <div className="divide-y">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 p-4">
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4" />
                    <Skeleton className="h-9" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="py-12 text-center text-red-600">
            Failed to load.{" "}
            <button className="btn btn-outline ml-2" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        ) : isEmpty ? (
          <div className="py-12 text-center">
            <p className="text-slate-600">No employees found.</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => setCreateOpen(true)}
            >
              Add your first employee
            </button>
          </div>
        ) : (
          <>
            <Table>
              <THead>
                <TH>Name</TH>
                <TH>Email</TH>
                <TH>Position</TH>
                <TH className="w-48 text-right">Actions</TH>
              </THead>
              <TBody>
                {employees.map((e) => (
                  <TR key={e.id}>
                    <TD className="font-medium text-slate-800">{e.name}</TD>
                    <TD className="text-slate-600">{e.email}</TD>
                    <TD className="text-slate-600">{e.position}</TD>
                    <TD className="text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button
                          className="btn btn-outline"
                          onClick={() => setEditEmployee(e)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline text-red-600"
                          onClick={() => setDeleteEmployeeId(e.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>

            <div className="mt-4">
              <Pagination
                page={page}
                limit={limit}
                total={total}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Add Employee"
      >
        <EmployeeForm
          submitting={createMut.isPending}
          onCancel={() => setCreateOpen(false)}
          onSubmit={(values) => createMut.mutate(values)}
        />
      </Modal>

      <Modal
        open={!!editEmployee}
        onClose={() => setEditEmployee(null)}
        title="Edit Employee"
      >
        <EmployeeForm
          defaultValues={
            editEmployee
              ? {
                  name: editEmployee.name,
                  email: editEmployee.email,
                  position: editEmployee.position,
                }
              : undefined
          }
          submitting={updateMut.isPending}
          onCancel={() => setEditEmployee(null)}
          onSubmit={(values) =>
            editEmployee && updateMut.mutate({ id: editEmployee.id, values })
          }
        />
      </Modal>

      <ConfirmDialog
        open={deleteEmployeeId !== null}
        title="Delete Employee"
        description="This action cannot be undone."
        onCancel={() => setDeleteEmployeeId(null)}
        onConfirm={() => deleteEmployeeId && deleteMut.mutate(deleteEmployeeId)}
        loading={deleteMut.isPending}
      />
    </div>
  );
}
