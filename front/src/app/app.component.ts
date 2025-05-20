import { Component } from '@angular/core';
import { PlantillaBaseComponent } from './plantilla-base/plantilla-base.component'
import { CuerpoHomeComponent } from './cuerpo-home/cuerpo-home.component'
import { RouterOutlet, RouterModule } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'front';
}