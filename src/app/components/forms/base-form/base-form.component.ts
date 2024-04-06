import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-base-form',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.scss'
})
export class BaseFormComponent {

  @Input({ required: true })
  title = 'Some Form';

}
