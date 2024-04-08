import { Component, inject } from '@angular/core';
import { FontStyleComponent } from './font-style/font-style.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-wysiwyg-editor',
  standalone: true,
  imports: [
    FontStyleComponent,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './wysiwyg-editor.component.html',
  styleUrl: './wysiwyg-editor.component.scss'
})
export class WysiwygEditorComponent {

  private fb = inject(FormBuilder);
  editorForm = this.fb.group({
    fontStyle: [''],
  });

}
