import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-spinner',
  template: `
    <div class="overlay" *ngIf="isLoading$ | async">   
        <img src="/assets/images/beda.png" style="max-width: 40px; max-height: 50px;">
      <h3>{{ domain }}</h3>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `,
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  isLoading$: Subject<boolean>;
  domain: string = environment.domain;
  constructor(private spinnerService: SpinnerService) { 
  }
  ngOnInit(): void {
    this.isLoading$ = this.spinnerService.isLoading$;
  }
}
