import { Component, OnInit } from '@angular/core';
import { RequestService } from '@ridder/request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ridder';

  constructor(private request: RequestService) {
  }

  ngOnInit() {
    this.request.get('/assets/test.json').subscribe((response)=>{
      console.log('Response:', response);
    })
  }
}
