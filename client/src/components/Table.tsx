// src/components/Table.tsx
import { ReactNode } from "react";
import clsx from "clsx";

export function Table({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("rounded-xl border bg-white", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          {children}
        </table>
      </div>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-slate-50">
      <tr>{children}</tr>
    </thead>
  );
}

export function TH({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={clsx(
        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-slate-200">{children}</tbody>;
}

export function TR({ children }: { children: ReactNode }) {
  return <tr className="hover:bg-slate-50">{children}</tr>;
}

export function TD({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={clsx("px-4 py-3 text-sm align-middle", className)}>
      {children}
    </td>
  );
}
