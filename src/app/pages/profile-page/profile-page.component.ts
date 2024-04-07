import { Component, inject, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../components/forms/base-form/base-form.component';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { SessionManagementService } from '../../common/services/session-management/session-management.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    BaseFormComponent,
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {

  userProfile!: any;
  sessionManagementService = inject(SessionManagementService);

  ngOnInit(): void {
    this.userProfile = this.sessionManagementService.getProfile();
  }

}
