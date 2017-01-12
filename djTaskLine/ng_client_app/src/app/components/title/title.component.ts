import { Component, OnInit } from '@angular/core';
import { TaskTableComponent } from '../task-table/task-table.component';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.sass']
})
export class TitleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
