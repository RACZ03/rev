import { Component } from '@angular/core';

@Component({
  selector: 'app-features-section',
  templateUrl: './features-section.component.html',
})
export class FeaturesSectionComponent {
  public features = [
    { text: 'Get there faster' },
    { text: 'Connect more bots' },
    { text: 'Leave nothing to chance' },
  ];

  uncertainties = [
    'Seeking to expand your market reach and coverage?',
    'Looking to boost your sales team’s lead generation?',
    'Unstructured data and communication slows down your decision making process?',
    'Inefficient matching of supply and demand?',
    'Inefficient counterparty risk appraisal process?',
    'Increasing exposure to frauds?',
  ];
}
