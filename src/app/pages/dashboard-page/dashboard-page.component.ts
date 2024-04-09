import { Component, inject, OnInit } from '@angular/core';
import mermaid, { MermaidConfig } from 'mermaid';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ThemingService } from '../../common/services/theming/theming.service';

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

  private graphs!: NodeListOf<HTMLElement>;
  private themingService = inject(ThemingService);
  protected mermaidConfig: MermaidConfig = {
    securityLevel: 'loose',
    gitGraph: {
      showCommitLabel: false,
      mainBranchName: 'Development',
      mainBranchOrder: 2,
      parallelCommits: true,
    }
  };

  ngOnInit(): void {
    mermaid.initialize(this.mermaidConfig);
    this.initMermaid(this.themingService.isDarkTheme ? 'dark' : 'default');
    this.themingService.themeSwitch.subscribe((isDarkTheme) => {
      this.initMermaid(isDarkTheme ? 'dark' : 'default');
    });
  }

  private initMermaid(theme: string): void {
    const graphs = document.querySelectorAll('pre.mermaid');

    graphs.forEach((el) => {
      if (el.getAttribute('data-processed')) {
        el.removeAttribute('data-processed');
        const mermaidCode = el.getAttribute('mermaid-code') ?? '';
        const themeRegex = /(theme: )([A-Za-z]+)/;
        const matches = mermaidCode.match(themeRegex);
        el.innerHTML = mermaidCode.replace(`${matches?.[1]}${matches?.[2]}`, `${matches?.[1]}${theme}`);
      } else {
        document.querySelectorAll('pre.mermaid')?.forEach((el) => el.setAttribute('mermaid-code', el.innerHTML));
      }

      el.setAttribute('mermaid-code', el.innerHTML);
    });

    mermaid.run();
  }

}
