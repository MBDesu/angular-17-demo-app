import { Component } from '@angular/core';
import { AddressFormComponent } from '../../components/address-form/address-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlStatus } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forms-page',
  standalone: true,
  imports: [
    AddressFormComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './forms-page.component.html',
  styleUrl: './forms-page.component.scss'
})
export class FormsPageComponent {

  addressFormStatus!: FormControlStatus;

  protected updateStatus(status: FormControlStatus): void {
    this.addressFormStatus = status;
  }

}
