// src/components/Layout.tsx
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600" />
        <div className="absolute -top-24 left-1/2 -z-10 h-80 w-[110%] -translate-x-1/2 rotate-6 rounded-[50%] bg-white/10 blur-3xl" />
        <div className="w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/90 shadow-card" />
              <div>
                <div className="text-lg sm:text-xl font-semibold text-white">
                  Employee Manager
                </div>
                <div className="text-xs sm:text-sm text-white/80">
                  CRUD • Search • Pagination
                </div>
              </div>
            </div>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-white backdrop-blur hover:bg-white/20"
            >
              React + TS + Tailwind
            </a>
          </div>
        </div>
      </header>
      <main className="w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        {children}
      </main>
      <footer className="mt-8 border-t px-4 sm:px-6 lg:px-10 py-6 text-center text-xs sm:text-sm text-slate-500">
        Built with ❤️ for the ASE Challenge
      </footer>
    </div>
  );
}
