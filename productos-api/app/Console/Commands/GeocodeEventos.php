<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Evento;

class GeocodeEventos extends Command
{
    protected $signature = 'eventos:geocode';
    protected $description = 'Geocodifica eventos que aún no tienen coordenadas';

    public function handle()
    {
        $eventos = Evento::whereNull('lat')->whereNotNull('direccion')->get();

        foreach ($eventos as $evento) {
            $this->info("Geocodificando: {$evento->direccion}");

            $response = Http::get('https://nominatim.openstreetmap.org/search', [
                'q' => $evento->direccion,
                'format' => 'json',
                'limit' => 1
            ]);

            $data = $response->json();

            if (!empty($data)) {
                $evento->lat = $data[0]['lat'];
                $evento->lng = $data[0]['lon'];
                $evento->save();
                $this->info("-> Coordenadas guardadas: {$evento->lat}, {$evento->lng}");
            } else {
                $this->warn("-> No se encontró ubicación.");
            }

            sleep(1); // Respetar la política de uso de Nominatim
        }

        $this->info('Geocodificación finalizada.');
    }
}
// php artisan eventos:geocode 

