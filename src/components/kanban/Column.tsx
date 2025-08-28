/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Column as ColumnType } from "@/shared/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";

interface ColumnProps {
  column: ColumnType;
}

const columnStyles = {
  todo: {
    header: "bg-white",
    badge: "bg-gray-100 text-gray-600 border border-gray-200 py-1 px-4",
    title: "text-black",
  },
  inprogress: {
    header: "bg-white",
    badge: "bg-[#FFA800] text-white border-0  py-1 px-4",
    title: "text-black",
  },
  approved: {
    header: "bg-white",
    badge: "bg-[#AEE753] text-white border-0  py-1 px-4",
    title: "text-black",
  },
  reject: {
    header: "bg-white",
    badge: "bg-[#F90430] text-white border-0  py-1 px-4",
    title: "text-white",
  },
};

export function Column({ column }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const taskIds = column.tasks.map((task) => task.id);
  const styles = columnStyles[column.id];

  return (
    <div className="flex-1 min-w-[280px] max-w-[300px]">
      <div className="h-full flex flex-col bg-white rounded-lg">
        {/* Column Header */}
        <div
          className={cn(
            "p-4 border-b border-gray-100 rounded-t-lg",
            styles.header
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  styles.badge
                )}
              >
                <h4 className={cn("text-sm font-medium", styles.title)}>
                  {column.title}
                </h4>
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <img src="/plus.svg" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <img src="/moreHorizontal.svg" />
              </Button>
            </div>
          </div>
        </div>

        {/* Column Content */}
        <div
          ref={setNodeRef}
          className={cn(
            "flex-1 p-4 min-h-[500px] transition-colors duration-200 bg-gray-50 rounded-b-lg",
            isOver && "bg-blue-50 border-blue-200"
          )}
        >
          <SortableContext
            id={column.id}
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {column.tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <img src="/plus.svg" alt="Placeholder" className="w-8 h-8" />
                </div>
                <p className="text-sm text-gray-500 font-medium">No tasks</p>
                <p className="text-xs text-gray-400 mt-1">
                  Drag tasks here or click + to add
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}
