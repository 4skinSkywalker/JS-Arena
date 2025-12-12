import { Component, Input } from '@angular/core';
import { BasicModule } from '../../basic.module';

@Component({
  selector: 'app-langicon',
  imports: [BasicModule],
  templateUrl: './langicon.component.html',
  styleUrl: './langicon.component.scss'
})
export class LangiconComponent {
  @Input('lang') lang!: string;
  @Input('size') size = 64;
}
