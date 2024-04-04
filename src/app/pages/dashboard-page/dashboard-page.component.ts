import { Component, OnInit } from '@angular/core';
import mermaid from 'mermaid';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatDividerModule,
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
