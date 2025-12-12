import { Component } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-choose-mode',
  imports: [BasicModule],
  templateUrl: './choose-mode.component.html',
  styleUrl: './choose-mode.component.scss'
})
export class ChooseModeComponent {
  id: string;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
}
