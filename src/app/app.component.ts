import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nghia-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Nghia';
  public routeObj: any = {name: '', url: ''};

  constructor(private router: Router) {}

  ngDoCheck() {
    console.log(this.router.url, 'docheck');
    if(this.router.url === '/profile') {
      this.routeObj = {name: 'Home', url: ''}
      return
    }
    this.routeObj = {name: 'Profile', url: '/profile'}
  }
}
