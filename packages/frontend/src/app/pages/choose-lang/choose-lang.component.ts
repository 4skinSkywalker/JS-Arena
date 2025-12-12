import { Component } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { LangiconComponent } from '../../components/langicon/langicon.component';

@Component({
  selector: 'app-choose-lang',
  imports: [BasicModule, LangiconComponent],
  templateUrl: './choose-lang.component.html',
  styleUrl: './choose-lang.component.scss'
})
export class ChooseLangComponent {

}
