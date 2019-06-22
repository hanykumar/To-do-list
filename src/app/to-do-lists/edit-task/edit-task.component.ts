import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms'

import { taskService } from '../taskService.service';
import { Task } from 'src/app/models/task.model';
import { DataStorageService } from 'src/app/data-storage.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTaskComponent implements OnInit {
  @ViewChild('ngform1',{static: true}) NgForm1: FormGroupDirective;
  taskForm: FormGroup;
  isEdit: boolean = false;
  index: number;
  constructor(private todolistSL: taskService, private fb: FormBuilder, private cdr: ChangeDetectorRef, private dsS: DataStorageService) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      subtasks: this.fb.array([])
    });

    this.todolistSL.startEditing.subscribe((index: number) => {
      this.fillTastForm(index);
    });
  }

  addTask(formdirective: FormGroupDirective) {
    if (this.taskForm.valid) {
      if (this.isEdit) {
        this.todolistSL.upDateTask(this.index, this.taskForm.value);
      } else {
        this.todolistSL.addTask(this.taskForm.value);
      }
      this.isEdit = false;
      formdirective.resetForm();
      this.taskForm.reset();
      this.taskForm.setControl("subtasks",this.fb.array([]));
      // this.resetForm();
      //this.subtasks.reset();
      this.dsS.storeData().subscribe(
        (response: Response) => {
          console.log(response)
        }
      );
      alert("Your List is saved!");
    }
  }

  fillTastForm(index: number) {
    if(!this.isEdit){
      this.index = index;
    const task: Task = this.todolistSL.getTask(index);
    this.taskForm.reset();
    this.NgForm1.resetForm();
    this.isEdit = true;
    this.cdr.markForCheck();
    this.name.setValue(task.name);
    this.description.setValue(task.description);
    this.subtasks.reset();
    if(task.subtasks && task.subtasks.length){
      task.subtasks.forEach(subtask => {
        const subtaskForm = this.fb.group({
          name: subtask.name
        })
        this.subtasks.push(subtaskForm);
        
      });
    }
    }
    
  }

  addSubtask() {
    const subtasks = this.fb.group({
      name: ["", Validators.required]
    });
    this.subtasks.push(subtasks);
  }

  deleteSubtask(index: number) {
    this.subtasks.removeAt(index);
  }
  // formControls
  get name() {
    return this.taskForm.get("name") as FormControl;
  }
  get description() {
    return this.taskForm.get("description") as FormControl;
  }
  get subtasks() {
    return this.taskForm.get("subtasks") as FormArray;
  }
  

  // onAddTask(form: NgForm) {
  //   const value = form.value;
  //  console.log(value.name, value.description);
  //   const newtask = new ToDoListModel(value.name, value.description,);
  //   if(this.editMode)
  //   {
  //     this.todolistSL.upDateTask(this.editedTaskIndex, newtask)
  //   }
  //   else {
  //   this.todolistSL.addTask(newtask);
  //   }
  //   this.editMode=false;
  //   form.reset();
  // }

  // onCancel() {
  //   this.tdForm.reset();
  //   this.editMode= false;
  // }

  // resetForm() {
  //   this.taskForm.reset();
  //   Object.keys(this.taskForm.controls).forEach(control => {
  //     delete this.taskForm.get(control).errors;
  //   })
  // }

  // onClear() {
  //   this.taskForm.reset();
  //   this.isEdit=false;
  // }
  onCancel() {
    this.taskForm.reset();
    this.isEdit = false;
    this.taskForm.setControl("subtasks",this.fb.array([]));
  }

  onDelete() {
    this.todolistSL.deleteTask(this.index);
    console.log(this.index);
    this.onCancel();

    
  }

  // onAddSubtask() {
  //   (<FormArray>this.taskForm.get('subtasks')).push(
  //     new FormGroup({
  //       'subtaskname': new FormControl(null),
  //       'status': new FormControl(null)
  //     })
  //   )
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
