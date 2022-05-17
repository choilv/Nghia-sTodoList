import {
  Component,
  ElementRef,
  OnInit,
  Pipe,
  PipeTransform,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  @ViewChild('editInput')
  editInput!: ElementRef;
  @ViewChild('nameTodo') nameTodo!: ElementRef;

  listTodo: Array<any> = [];

  listTodoShow: any[] = [];
  public showEdit: Boolean = false;

  constructor(private renderer: Renderer2) {
    /**
     * This events get called by all clicks on the page
     */
    this.renderer.listen('window', 'click', (e: Event) => {
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if (
        !!this.editInput?.nativeElement &&
        e.target !== this.editInput.nativeElement
      ) {
        this.listTodo = this.listTodo.map((item) => {
          return { ...item, isEdit: false };
        });
        return;
      }
    });
    this.renderer.listen('window', 'dblclick', (e: Event) => {
      if (
        !!this.nameTodo?.nativeElement &&
        e.target === this.nameTodo.nativeElement
      ) {
        console.log(1);
        this.editInput?.nativeElement.focus();
        return;
      }
    });
  }

  ngOnInit(): void {
    this.listTodoShow = [...this.listTodo];
  }

  // ngDoCheck() {
  //   this.listTodoShow = [...this.listTodo];
  //   console.log(this.listTodoShow);
  // }
  handleCreate(f: NgForm) {
    if (!f.value.name) {
      return;
    }
    this.listTodo = [
      { id: this.listTodo.length + 1, name: f.value.name },
      ...this.listTodo,
    ];
    this.listTodoShow = [...this.listTodo];
    f.resetForm();
  }

  handleCompleted(todo: any) {
    if (todo.isEdit) {
      return;
    }
    let index = this.listTodo.findIndex((item) => item.id === todo.id);
    let itemUpdate = this.listTodo.find((item) => item.id === todo.id);

    if (itemUpdate?.done) {
      this.listTodo = [
        ...this.listTodo.slice(0, index),
        { ...itemUpdate, done: false },
        ...this.listTodo.slice(index + 1),
      ];
      this.listTodoShow = [...this.listTodo];
      return;
    }
    let newList = [
      ...this.listTodo.slice(0, index),
      { ...itemUpdate, done: true },
      ...this.listTodo.slice(index + 1),
    ];
    this.listTodo = [...newList];
    this.listTodoShow = [...this.listTodo];
  }

  handleDelete(id: number) {
    let index = this.listTodo.findIndex((item) => item.id === id);

    let newList = this.listTodo;

    newList.splice(index, 1);

    this.listTodo = newList;
    this.listTodoShow = [...this.listTodo];
  }

  handleShowEdit(id: number) {
    let index = this.listTodo.findIndex((item) => item.id === id);
    let itemUpdate = this.listTodo.find((item) => item.id === id);

    let newList = [
      ...this.listTodo.slice(0, index),
      { ...itemUpdate, isEdit: true },
      ...this.listTodo.slice(index + 1),
    ];
    this.listTodo = [...newList];
    this.listTodoShow = [...this.listTodo];
  }

  handleEdit({ edit, id }: { edit: NgForm; id: number }) {
    if (!edit.value.name) {
      return;
    }

    let index = this.listTodo.findIndex((item) => item.id === id);
    let itemUpdate = this.listTodo.find((item) => item.id === id);

    let newList = [
      ...this.listTodo.slice(0, index),
      { ...itemUpdate, isEdit: false, name: edit.value.name },
      ...this.listTodo.slice(index + 1),
    ];
    this.listTodo = [...newList];
    this.listTodoShow = [...this.listTodo];
  }

  handleCheckAll() {
    if (!this.listTodo.filter((item) => !item.done).length) {
      this.listTodo = this.listTodo.map((item) => {
        return { ...item, done: false };
      });
      this.listTodoShow = [...this.listTodo];
      return;
    }
    this.listTodo = this.listTodo.map((item) => {
      return { ...item, done: true };
    });
    this.listTodoShow = [...this.listTodo];
  }

  handleFilter(status: string) {
    console.log(status);
    if (status === 'active') {
      this.listTodoShow = this.listTodo.filter((item) => !item.done);
      return;
    }
    if (status === 'completed') {
      this.listTodoShow = this.listTodo.filter((item) => item.done);
      return;
    }
    this.listTodoShow = [...this.listTodo];
  }
}
