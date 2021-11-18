import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isScreenSmall: boolean;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe(
      state => {
        this.isScreenSmall = state.matches
      }
    );
  }

}
