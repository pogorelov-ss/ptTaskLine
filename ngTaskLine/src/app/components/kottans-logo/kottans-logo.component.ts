import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kottans-logo',
  templateUrl: './kottans-logo.component.html',
  styleUrls: ['./kottans-logo.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class KottansLogoComponent implements OnInit {
  @Input() svgwidth:string;
  @Input() svgheight:string;
  @Input() color:string;
  @Input() animated:boolean;
  constructor() {

  }

  ngOnInit() {
      console.log(this.svgwidth, this.svgheight, this.animated);
  }


}
