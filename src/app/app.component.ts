import { Component, OnInit } from '@angular/core';

import { taskService } from './to-do-lists/taskService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private todolistSL: taskService) {}

  ngOnInit() {

  }
}
