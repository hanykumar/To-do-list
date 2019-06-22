import { Component, OnInit, OnDestroy } from '@angular/core';
import { taskService } from './taskService.service';

import { Subscription } from 'rxjs';
import { Task } from '../models/task.model';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-to-do-lists',
  templateUrl: './to-do-lists.component.html',
  styleUrls: ['./to-do-lists.component.css']
})
export class ToDoListsComponent implements OnInit, OnDestroy {
  tasked: Task[];
  index: number;
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
    
    console.log(index1);
    //this.onCancel();
    const delete1= confirm("Do you really want to delete?");
    if (delete1) 
    {
      this.todolistSL.deleteTask(index1);
      this.dsS.storeData().subscribe(
        (response: Response) => {
          console.log(response)
        }
      );
    }
    
  }

  onEditTask(index:number) {
    this.todolistSL.startEditing.next(index);
    console.log("index: "+index)
  }
  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
