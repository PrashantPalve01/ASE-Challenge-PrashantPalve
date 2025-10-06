import React from "react";
import { Users, Briefcase } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Employee Management System
              </h1>
              <p className="text-blue-100 text-sm">
                Manage your workforce efficiently and professionally
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
            <Users className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Dashboard</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
