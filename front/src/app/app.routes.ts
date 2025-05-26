import { PlantillaBaseComponent } from './plantilla-base/plantilla-base.component';
import { CuerpoHomeComponent } from './cuerpo-home/cuerpo-home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CuerpoBusquedaComponent } from './cuerpo-busqueda/cuerpo-busqueda.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component'
import { Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { EventosComponent } from './eventos/eventos.component';
import { CrearEditarComponent } from './eventos/crear-editar/crear-editar.component';
import { ConsultarComponent } from './eventos/consultar/consultar.component';

export const routes: Routes = [
  {
    path: '',
    component: PlantillaBaseComponent, // Siempre muestra la plantilla base
    children: [
      { path: '', component: CuerpoHomeComponent }, // Dentro de la plantilla base
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'detalle/:id', component: ProductoDetalleComponent },
      { path: 'search', component: CuerpoBusquedaComponent},
      { path: 'cuerpo-home', component: CuerpoHomeComponent},
      { path: 'carrito', component: CarritoComponent},
      { path: 'aboutus', component: AboutusComponent},
      { path: 'events', 
        component: EventosComponent, 
        children: [ 
        { path: 'event-handler', component: CrearEditarComponent },
        { path: 'events-view', component: ConsultarComponent }
      ]}
    ]
  }
];