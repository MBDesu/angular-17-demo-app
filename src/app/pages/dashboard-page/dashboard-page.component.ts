import { Component, OnInit } from '@angular/core';
import mermaid from 'mermaid';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatExpansionModule,
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
