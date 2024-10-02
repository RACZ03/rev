import { AfterViewInit, Component } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initFlowbite();
  }
}
