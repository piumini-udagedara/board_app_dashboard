export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignees: User[];
  commentsCount: number;
  attachmentsCount: number;
  tags: string[];
}

export type TaskStatus = "todo" | "inprogress" | "approved" | "reject";
export type TaskPriority = "low" | "medium" | "high";

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}

export interface KanbanState {
  tasks: Task[];
  searchQuery: string;
  filteredTasks: Task[];
  columns: Column[];
  isLoading: boolean;
  error: string | null;
}

export interface KanbanActions {
  setTasks: (tasks: Task[]) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  setSearchQuery: (query: string) => void;
  updateFilteredTasks: () => void;
  updateColumns: () => void;
  loadTasks: () => Promise<void>;
  saveTasks: () => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}
