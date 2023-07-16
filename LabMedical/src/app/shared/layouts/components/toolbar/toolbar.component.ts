import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  title = ' ';
  constructor(
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.route.title
      .subscribe(title => {
          typeof title === "string" ? this.title = title : ' '
        }
      );
  }
}
