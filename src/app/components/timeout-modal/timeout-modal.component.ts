import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { timer } from 'rxjs';

@Component({
  selector: 'app-timeout-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './timeout-modal.component.html',
  styleUrl: './timeout-modal.component.scss'
})
export class TimeoutModalComponent implements OnInit {

  protected count = 0;

  constructor(
    public dialogRef: MatDialogRef<TimeoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { countdownStart: number },
  ) {}

  ngOnInit(): void {
    timer(0, 1000)
      .subscribe((countdown: number): void => {
        this.count = this.data.countdownStart - countdown;
        if (countdown >= this.data.countdownStart) {
          this.dialogRef.close(false);
        }
      }
    );
  }

}
