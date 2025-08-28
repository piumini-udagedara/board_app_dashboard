"use client";
import { useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";

import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKanbanStore } from "@/app/store/kanban";
import { Task, TaskStatus } from "@/shared/types";

const KanbanBoard = () => {
  const { columns, isLoading, error, loadTasks, moveTask } = useKanbanStore();

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    // Find the task being dragged
    const task = columns
      .flatMap((col) => col.tasks)
      .find((task) => task.id === active.id);

    setActiveTask(task || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Optional: Add visual feedback during drag
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    // Find current task
    const currentTask = columns
      .flatMap((col) => col.tasks)
      .find((task) => task.id === taskId);

    if (!currentTask) return;

    // Only move if status actually changed
    if (currentTask.status !== newStatus) {
      moveTask(taskId, newStatus);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="flex space-x-6 overflow-x-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1 ">
              <Card>
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="p-4 border rounded-lg">
                        <Skeleton className=" w-24 mb-2" />
                        <Skeleton className="w-full mb-2" />
                        <Skeleton className=" w-3/4" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Failed to load tasks</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={loadTasks} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 ">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-6 overflow-x-auto pb-4 ">
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-2 scale-105">
              <TaskCard task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
export default KanbanBoard;
