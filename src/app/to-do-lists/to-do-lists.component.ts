import { Component, OnInit, OnDestroy } from '@angular/core';
import { taskService } from './taskService.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Task } from '../models/task.model';
import { DataStorageService } from '../data-storage.service';
import { SubTask } from '../models/subtask.model';

@Component({
  selector: 'app-to-do-lists',
  templateUrl: './to-do-lists.component.html',
  styleUrls: ['./to-do-lists.component.css']
})
export class ToDoListsComponent implements OnInit, OnDestroy {
  tasked: Task[];
  index: number;
  subtasked: SubTask[];
  private subscription1: Subscription;

  constructor(private todolistSL: taskService, private dsS: DataStorageService) { }

  ngOnInit() {
    this.tasked = this.todolistSL.getTasks();
    this.subscription1 = this.todolistSL.taskChanged.subscribe(
      (tasked: Task[]) => {
        this.tasked = tasked;
      }
    );
  }

  onDelete(index1: number) {
    //console.log(index1);
    //this.onCancel();
    const delete1 = confirm("Do you really want to delete?");
    if (delete1) {
      this.todolistSL.deleteTask(index1);
      this.dsS.storeData().subscribe(
        (response: Response) => {
          console.log(response)
        }
      );
    }
  }

  onEditTask(index: number) {
    this.todolistSL.startEditing.next(index);
    console.log("index: " + index)
  }
  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }


  dropItem(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.dsS.storeDataToCloud(this.tasked).subscribe();
    }
    else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.dsS.storeDataToCloud(this.tasked).subscribe();
    }
  }
  getConnectedList(): any[] {
    return this.tasked.map(x => `${x.id}`);
  }

  dropGroup(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasked, event.previousIndex, event.currentIndex);
    this.dsS.storeDataToCloud(this.tasked).subscribe();
  }
}
