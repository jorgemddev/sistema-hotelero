import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="overlay" *ngIf="isLoading">   
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
export class SpinnerComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  domain: string = environment.domain;
  private destroy$ = new Subject<void>();

  constructor(
    private spinnerService: SpinnerService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.spinnerService.isLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoading => {
        this.isLoading = isLoading;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}