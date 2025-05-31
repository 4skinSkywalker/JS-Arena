import { Component } from '@angular/core';
import { LoaderService } from './loader-service.service';
import { BasicModule } from '../../basic.module';

@Component({
  selector: 'app-loader',
  imports: [BasicModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  constructor(
    public loaderService: LoaderService
  ) { }
}
