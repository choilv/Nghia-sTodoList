import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: any;
  @Input() listTodo: any[] = [];
  @ViewChild('nameTodo') nameTodo!: ElementRef;

  isEdit: Boolean = false;

  @Output() newItemEvent = new EventEmitter<any>();
  @Output() isEditEvent = new EventEmitter<any>();
  @Output() isChangeEvent = new EventEmitter<any>();
  @Output() isDeleteEvent = new EventEmitter<any>();

  @ViewChild('editInput')
  editInput!: ElementRef;

  handleCompleted(value: any) {
    this.newItemEvent.emit(value);
  }

  handleShowEdit(id: any) {
    this.isEditEvent.emit(id);
  }

  handleEdit(edit: any, id: any) {
    this.isChangeEvent.emit({ edit, id });
  }
  handleDelete(id: any) {
    this.isDeleteEvent.emit(id);
  }
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
  ngOnInit(): void {}

  handleOutside() {
    console.log(1);
    this.listTodo = this.listTodo.map((item) => {
      return { ...item, isEdit: false };
    });
    console.log(this.listTodo);
  }
}
