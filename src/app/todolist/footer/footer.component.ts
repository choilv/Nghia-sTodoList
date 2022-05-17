import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() listTodo!: any[];
  @Output() isFilterEvent = new EventEmitter<any>();

  handleFilter(status: string) {
    this.isFilterEvent.emit(status);
  }
  constructor() {}

  ngOnInit(): void {}
}
