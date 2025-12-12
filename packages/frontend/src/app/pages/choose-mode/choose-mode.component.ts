import { Component } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ActivatedRoute } from '@angular/router';
import { EnumLang } from '../../../../../backend/src/models';
import { LangiconComponent } from '../../components/langicon/langicon.component';

@Component({
  selector: 'app-choose-mode',
  imports: [BasicModule, LangiconComponent],
  templateUrl: './choose-mode.component.html',
  styleUrl: './choose-mode.component.scss'
})
export class ChooseModeComponent {
  lang: EnumLang;

  constructor(private route: ActivatedRoute) {
    this.lang = this.route.snapshot.paramMap.get('id')! as EnumLang;
  }
}
