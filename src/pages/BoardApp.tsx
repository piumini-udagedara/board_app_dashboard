"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import KanbanBoard from "@/components/kanban/KanbanBoard";

// Sample project data
const projectInfo = {
  name: "Sport XI Project",
  description: "event production",
  status: "In progress",
  lastUpdated: "04 April, 2024",
  assignees: [
    { id: "1", name: "John Doe", avatar: "JD" },
    { id: "2", name: "Sarah Smith", avatar: "SS" },
    { id: "3", name: "Mike Johnson", avatar: "MJ" },
    { id: "4", name: "Emily Davis", avatar: "ED" },
  ],
  messages: 7,
};

export default function BoardApp() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          {/* Left side - Project info */}
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {projectInfo.name}
                </h1>
                <Badge variant="secondary" className="bg-[#FFA800]  ">
                  {projectInfo.status}
                </Badge>
              </div>
              <p className="text-base text-gray-400 mb-1">
                {projectInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* Project details row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4  border-b border-gray-200 pb-6">
          {/* Assigned users */}
          <div className="flex items-center ">
            <span className="text-base text-gray-400">assigned</span>
            <div className="flex -space-x-2">
              {projectInfo.assignees.map((assignee) => (
                <Avatar
                  key={assignee.id}
                  className="h-8 w-8 border-2 border-white ring-1 ring-gray-100"
                >
                  <AvatarImage src="/placeholder.svg" alt={assignee.name} />
                  <AvatarFallback className="text-xs bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                    {assignee.avatar}
                  </AvatarFallback>
                </Avatar>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 rounded-full p-0 border-2 border-dashed border-gray-300"
              >
                <img src="/add.svg" className="border-gray-300" />
              </Button>
            </div>
            <div className="ml-6 flex items-center space-x-2">
              <Button
                variant="secondary"
                className="px-2 py-1 rounded-full  border border-gray-400"
              >
                <img src="/manage.svg" />
                <span className="text-1 text-gray-400"> Manage</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs text-gray-500">
            Last updated on {projectInfo.lastUpdated}
          </p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 bg-gray-50">
        <KanbanBoard />
      </div>
    </div>
  );
}
