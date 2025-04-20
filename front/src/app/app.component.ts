import { Component } from '@angular/core';
import { PlantillaBaseComponent } from './plantilla-base/plantilla-base.component'
import { CuerpoHomeComponent } from './cuerpo-home/cuerpo-home.component'

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [PlantillaBaseComponent,CuerpoHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
