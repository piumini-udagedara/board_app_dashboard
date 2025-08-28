"use client";
import { create } from "zustand";
import {
  Task,
  TaskStatus,
  Column,
  KanbanState,
  KanbanActions,
} from "@/shared/types";

const STORAGE_KEY = "kanban-tasks";

const defaultColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-gray-100 text-gray-800",
    tasks: [],
  },
  {
    id: "inprogress",
    title: "In Progress",
    color: "bg-yellow-100 text-yellow-800",
    tasks: [],
  },
  {
    id: "approved",
    title: "Approved",
    color: "bg-green-100 text-green-800",
    tasks: [],
  },
  {
    id: "reject",
    title: "Reject",
    color: "bg-red-100 text-red-800",
    tasks: [],
  },
];

export const useKanbanStore = create<KanbanState & KanbanActions>()(
  (set, get) => ({
    tasks: [],
    searchQuery: "",
    filteredTasks: [],
    columns: defaultColumns,
    isLoading: false,
    error: null,

    setTasks: (tasks: Task[]) => {
      set({ tasks });
      get().updateFilteredTasks();
    },

    moveTask: (taskId: string, newStatus: TaskStatus) => {
      const { tasks } = get();
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );

      set({ tasks: updatedTasks });
      get().updateFilteredTasks();
      get().saveTasks();
    },

    setSearchQuery: (query: string) => {
      set({ searchQuery: query });
      get().updateFilteredTasks();
    },

    updateFilteredTasks: () => {
      const { tasks, searchQuery } = get();
      if (!searchQuery) {
        set({ filteredTasks: tasks });
        get().updateColumns();
        return;
      }

      const filtered = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          task.assignees.some((assignee) =>
            assignee.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      set({ filteredTasks: filtered });
      get().updateColumns();
    },

    updateColumns: () => {
      const { filteredTasks } = get();
      const updatedColumns = defaultColumns.map((column) => ({
        ...column,
        tasks: filteredTasks.filter((task) => task.status === column.id),
      }));
      set({ columns: updatedColumns });
    },

    loadTasks: async () => {
      set({ isLoading: true, error: null });

      try {
        // First try to load from localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const tasks = JSON.parse(stored);
          get().setTasks(tasks);
          set({ isLoading: false });
          return;
        }

        // If no stored data, load from JSON file
        const response = await fetch("/tasks.json");
        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        const data = await response.json();
        get().setTasks(data.tasks);
        get().saveTasks(); // Save to localStorage for future use
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : "Failed to load tasks",
          isLoading: false,
        });
      } finally {
        set({ isLoading: false });
      }
    },

    saveTasks: () => {
      const { tasks } = get();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    },

    addTask: (taskData: Omit<Task, "id">) => {
      const { tasks } = get();
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(), // Simple ID generation
      };

      const updatedTasks = [...tasks, newTask];
      get().setTasks(updatedTasks);
      get().saveTasks();
    },

    updateTask: (taskId: string, updates: Partial<Task>) => {
      const { tasks } = get();
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      );

      get().setTasks(updatedTasks);
      get().saveTasks();
    },

    deleteTask: (taskId: string) => {
      const { tasks } = get();
      const updatedTasks = tasks.filter((task) => task.id !== taskId);

      get().setTasks(updatedTasks);
      get().saveTasks();
    },
  })
);
