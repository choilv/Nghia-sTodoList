import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lengthListTodoUnDone' })
export class TodoUnDoneLengthPipe implements PipeTransform {
  transform(value: any[]) {
    return value.filter((item) => !item.done).length;
  }
}
