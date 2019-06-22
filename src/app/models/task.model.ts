import { SubTask } from './subtask.model';
export interface Task {
    name?: string;
    description?: string;
    subtasks?: SubTask[];
}