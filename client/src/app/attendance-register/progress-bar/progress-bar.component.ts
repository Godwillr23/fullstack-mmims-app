import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-survey-progress-bar',
  standalone: false,
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 5;
}