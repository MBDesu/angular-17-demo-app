import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { PageRoute } from '../../app.routes';

@Component({
  selector: 'app-splash-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './splash-page.component.html',
  styleUrl: './splash-page.component.scss'
})
export class SplashPageComponent {

  constructor(private router: Router) {}

  proceed(): void {
    this.router.navigateByUrl(PageRoute.DASHBOARD);
  }

}
