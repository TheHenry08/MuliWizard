import { Routes } from '@angular/router';
import { PlantillaBaseComponent } from './plantilla-base/plantilla-base.component';
import { CuerpoHomeComponent } from './cuerpo-home/cuerpo-home.component';
import { PruebaComponent } from './prueba/prueba.component';

export const routes: Routes = [
  {
    path: '',
    component: PlantillaBaseComponent, // Siempre muestra la plantilla base
    children: [
      { path: '', component: CuerpoHomeComponent }, // Dentro de la plantilla base
      { path: 'prueba', component: PruebaComponent }
    ]
  }
];