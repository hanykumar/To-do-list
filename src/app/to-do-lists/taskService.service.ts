import { Subject } from 'rxjs';
import { Task } from '../models/task.model';
export class taskService {

    taskChanged = new Subject<Task[]>();
    startEditing = new Subject<number>();

    private todolistM: Task[] = [];

    getTasks() {
        return this.todolistM.slice();
    }
    getTask(index: number) {
        return this.todolistM[index];
    }
    addTask(s: Task) {
        this.todolistM.push(s);
        this.taskChanged.next(this.todolistM.slice());
    }
    addTasks() {

    }
    upDateTask(index: number, newTask: Task) {
        this.todolistM[index] = newTask;
        this.taskChanged.next(this.todolistM.slice())
    }
    deleteTask(index: number) {
        this.todolistM.splice(index, 1);
        this.taskChanged.next(this.todolistM.slice());
    }
    setTasks(task: Task[]) {
        this.todolistM = task;
        this.taskChanged.next(this.todolistM.slice());
    }
}