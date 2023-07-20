import {Component, OnInit} from '@angular/core';
import {LogModel} from "../../shared/models/log.model";
import {LogService} from "../../shared/services/log.service";

@Component({
  selector: 'app-log-panel',
  templateUrl: './log-panel.component.html',
  styleUrls: ['./log-panel.component.css']
})
export class LogPanelComponent implements OnInit{
  logs: LogModel[] = [];
  pageList: number[] = [];
  selectedPage: number = 1;
  logsPerPageList:  number[] = [25, 50, 100]
  selectedLogsPerPage: number = 25
  constructor(private logService: LogService) {
  }

  ngOnInit(): void {
    this.getLogs()
  }

  getLogs(): void {
    this.logService.getAll(this.selectedPage - 1, this.selectedLogsPerPage).subscribe({
      next: (response) => {
        console.log(response.body)
        this.logs = response.body.content
        this.pageList = []
        for (let i: number = 1; i < response.body.totalPages; i++) {
          this.pageList.push(i)
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  selectChanges(): void {
    console.log(this.pageList)
    this.getLogs()
  }
}
