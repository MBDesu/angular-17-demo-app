import { Component, OnInit } from '@angular/core';
import mermaid from 'mermaid';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { WysiwygEditorComponent } from '../../components/wysiwyg-editor/wysiwyg-editor.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatDividerModule,
    WysiwygEditorComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {

  ngOnInit(): void {
    mermaid.initialize({
      securityLevel: 'loose',
      theme: 'dark',
      gitGraph: {
        showCommitLabel: false,
        mainBranchName: 'Development',
        mainBranchOrder: 2,
        parallelCommits: true,
      }
    });
    mermaid.init().then(() => { return; });
  }

}
