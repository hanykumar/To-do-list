import { SubTask } from './subtask.model';
export interface Task {
    id?: number;
    name?: string;
    description?: string;
    subtasks?: SubTask[];
}