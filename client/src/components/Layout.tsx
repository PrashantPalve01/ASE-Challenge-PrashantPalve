import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="w-full px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-brand-600 shadow-card" />
              <div>
                <div className="text-lg sm:text-xl font-semibold text-slate-900">
                  Employee Mangement System
                </div>
              </div>
            </div>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-200 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Admin
            </a>
          </div>
        </div>
      </header>
      <main className="w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        {children}
      </main>
      <footer className="mt-8 border-t bg-white px-4 sm:px-6 lg:px-10 py-6 text-center text-xs sm:text-sm text-slate-500">
        Built with ❤️ for the ASE Challenge
      </footer>
    </div>
  );
}
