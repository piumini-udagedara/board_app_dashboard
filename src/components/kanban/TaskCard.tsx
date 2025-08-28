"use client";
import { Task, TaskPriority } from "@/shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
}

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-blue-400",
  medium: "bg-yellow-400",
  high: "bg-red-400",
};

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== "approved";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md border-l-4"
      )}
    >
      {/* Priority Indicator and Menu */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              priorityColors[task.priority]
            )}
          />
          <span className="text-xs text-gray-500 font-medium">
            {task.priority === "high"
              ? "High"
              : task.priority === "medium"
                ? "Medium"
                : "Low"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-5 w-5 p-0 opacity-60 hover:opacity-100"
        >
          <img src="/moreHorizontal.svg" />
        </Button>
      </div>

      {/* Task Title */}
      <h3 className="font-medium text-sm mb-2 text-gray-900 leading-5">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-xs text-gray-500 mb-3 leading-4 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {task.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 2 && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
              +{task.tags.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Placeholder for image/preview if needed */}
      {(task.title.toLowerCase().includes("detail") ||
        task.title.toLowerCase().includes("prototype")) && (
        <div className="w-full h-20 bg-gray-600 rounded-md mb-4 flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded opacity-50" />
        </div>
      )}

      {/* Bottom Section */}
      <div className=" items-center justify-between">
        {/* Assignees */}
        <div className="flex -space-x-1">
          {task.assignees.slice(0, 3).map((assignee, index) => (
            <Avatar
              key={assignee.id}
              className="h-6 w-6 border-2 border-white"
              style={{ zIndex: task.assignees.length - index }}
            >
              <AvatarImage src="/placeholder.svg" alt={assignee.name} />
              <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                {assignee.avatar}
              </AvatarFallback>
            </Avatar>
          ))}
          {task.assignees.length > 3 && (
            <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
              <span className="text-xs text-gray-600 font-medium">
                +{task.assignees.length - 3}
              </span>
            </div>
          )}
        </div>

        {/* Right side - Stats and Due Date */}
        <div className="flex items-center space-x-3 text-xs text-gray-500 mt-4 border-t border-gray-100 pt-3">
          {/* Comments */}
          {task.commentsCount > 0 && (
            <div className="flex items-center space-x-1">
              <img src="/messageCircle.svg" />
              <span>{task.commentsCount}</span>
            </div>
          )}

          {/* Attachments */}
          {task.attachmentsCount > 0 && (
            <div className="flex items-center space-x-1">
              <img src="/papercli.svg" />
              <span>{task.attachmentsCount}</span>
            </div>
          )}

          {/* Due Date */}
          <div
            className={cn(
              "flex items-center space-x-1",
              isOverdue ? "text-red-500" : "text-gray-500"
            )}
          >
            <img src="/calendar.svg" />
            <span>{format(new Date(task.dueDate), "MMM dd")}</span>
          </div>
        </div>
      </div>

      {/* Status badges for completed/rejected tasks */}
      {task.status === "approved" && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Badge className="bg-green-100 text-green-700 text-xs font-medium">
            ✓ Done
          </Badge>
        </div>
      )}
      {task.status === "reject" && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Badge className="bg-red-100 text-red-700 text-xs font-medium">
            ✗ Rejected
          </Badge>
        </div>
      )}
    </div>
  );
}
