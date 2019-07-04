import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './models/task.model'
import { taskService } from './to-do-lists/taskService.service';

@Injectable()
export class DataStorageService {
    
    constructor(private http: HttpClient, private taskS: taskService) {
       
    }
    storeData() {
        return this.http.put('https://todolist-7de41.firebaseio.com/list.json', this.taskS.getTasks()) 
    }

    storeDataToCloud(data: any) {
        return this.http.put('https://todolist-7de41.firebaseio.com/list.json', data) 
    }
    getData() {
        this.http.get('https://todolist-7de41.firebaseio.com/list.json').subscribe(
            (response: any) => {
                let task: Task[] = response;
                this.taskS.setTasks(task);
                //console.log(response);
            } 
        )
    }
    
}