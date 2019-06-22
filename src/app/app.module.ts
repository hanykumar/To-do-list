import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ToDoListsComponent } from './to-do-lists/to-do-lists.component';
import { EditTaskComponent } from './to-do-lists/edit-task/edit-task.component';
import { taskService } from './to-do-lists/taskService.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import {
  MatButtonModule,
  MatInputModule,
  MatExpansionModule
} from '@angular/material';
import { DataStorageService } from './data-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToDoListsComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [taskService, DataStorageService, taskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
