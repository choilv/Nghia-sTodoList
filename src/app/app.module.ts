import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { TodoUnDoneLengthPipe } from './todolist/length-todo-undone.pipe';
import { TodoItemComponent } from './todolist/todo-item/todo-item.component';
import { FooterComponent } from './todolist/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    ProfileComponent,
    TodoUnDoneLengthPipe,
    TodoItemComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
