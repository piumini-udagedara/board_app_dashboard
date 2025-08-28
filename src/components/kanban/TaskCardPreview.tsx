"use client";
import { Task, TaskPriority } from "@/shared/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskCardPreviewProps {
  task: Task;
}

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-blue-400",
  medium: "bg-yellow-400",
  high: "bg-red-400",
};

export function TaskCardPreview({ task }: TaskCardPreviewProps) {
  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== "approved";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 transition-all duration-200 hover:shadow-md border-l-4">
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
      </div>

      <h3 className="font-medium text-sm mb-2 text-gray-900 leading-5">
        {task.title}
      </h3>

      {task.description && (
        <p className="text-xs text-gray-500 mb-3 leading-4 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center space-x-3 text-xs text-gray-500 mt-4 border-t border-gray-100 pt-3">
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
