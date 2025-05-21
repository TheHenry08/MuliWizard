import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { boundingExtent } from 'ol/extent';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const coordenadasNegocio = [-3.629175, 40.387333];
    const ubicacionNegocio = fromLonLat(coordenadasNegocio);

    const mapa = new Map({
      target: 'mapa',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: ubicacionNegocio,
        zoom: 17,
      }),
    });

    const marcadorNegocio = new Feature({
      geometry: new Point(ubicacionNegocio),
    });

    marcadorNegocio.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        }),
      })
    );

    const fuenteVectorial = new VectorSource({
      features: [marcadorNegocio],
    });

    const capaVectorial = new VectorLayer({
      source: fuenteVectorial,
    });

    mapa.addLayer(capaVectorial);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          const coordenadasUsuario = [
            posicion.coords.longitude,
            posicion.coords.latitude,
          ];
          const ubicacionUsuario = fromLonLat(coordenadasUsuario);

          const marcadorUsuario = new Feature({
            geometry: new Point(ubicacionUsuario),
          });

          marcadorUsuario.setStyle(
            new Style({
              image: new Icon({
                anchor: [0.5, 1],
                src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                color: 'blue',
              }),
            })
          );

          fuenteVectorial.addFeature(marcadorUsuario);

          const extension = boundingExtent([
            ubicacionNegocio,
            ubicacionUsuario,
          ]);
          mapa.getView().fit(extension, { padding: [50, 50, 50, 50] });
        },
        () => {
          alert('No se pudo obtener la ubicación del usuario.');
        }
      );
    }
  }
}

