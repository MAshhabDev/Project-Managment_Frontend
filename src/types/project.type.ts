export enum ProjectStatus {
  PLANNING = "PLANNING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface IComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
  };
}

export interface IActivityLog {
  id: string;
  organizationId: string;
  userId: string;
  action: string;
  details: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
  };
}

export interface ITask {
  id: string;
  projectId: string;
  columnId: string;
  userId?: string | null;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
  } | null;
  comments?: IComment[];
}

export interface IColumn {
  id: string;
  boardId: string;
  title: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  tasks?: ITask[];
}

export interface IBoard {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  columns?: IColumn[];
}

export interface IProject {
  id: string;
  organizationId: string;
  userId: string;
  name: string;
  description?: string | null;
  status: ProjectStatus;
  startDate?: string | null;
  endDate?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  organization?: {
    id: string;
    name: string;
    slug: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
  };
  boards?: IBoard[];
}

export interface ICreateProjectPayload {
  organizationId: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface ICreateTaskPayload {
  projectId: string;
  columnId: string;
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string;
  assigneeId?: string;
}

export interface IUpdateTaskStatusPayload {
  columnId: string;
  status: TaskStatus;
}

export interface IAddCommentPayload {
  content: string;
}