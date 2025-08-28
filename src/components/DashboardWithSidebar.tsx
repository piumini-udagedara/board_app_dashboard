"use client";
import { Sidebar } from "./Sidebar";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useKanbanStore } from "@/app/store/kanban";

interface DashboardWithSidebarProps {
  children: React.ReactNode;
}

export function DashboardWithSidebar({ children }: DashboardWithSidebarProps) {
  const { searchQuery, setSearchQuery } = useKanbanStore();

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className=" mx-auto bg-white  border border-gray-200 shadow-sm overflow-hidden">
        <header className="p-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 ">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img
                  src="/logo.svg"
                  alt="User"
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
              </div>
              <span className="font-semibold text-gray-900">Board App</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <span className="hidden sm:inline">Create new board</span>
                <img src="/add.svg" className="h-4 w-4 mr-2" />
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64 bg-gray-50 border-gray-200"
                />
              </div>

              <div className="flex items-center space-x-2 justify-end">
                <Button variant="ghost" size="icon">
                  <img src="/setting.svg" className="h-5 w-5" />
                </Button>

                <Button variant="ghost" size="icon">
                  <img src="/notification.svg" className="h-5 w-5" />
                </Button>

                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
