<?php

namespace App\Http\Controllers;
use App\Models\Evento;
use Illuminate\Http\Request;

class EventoController extends Controller
{
    public function store(Request $request){
        try {
            $validated = $request->validate([
                'organizador_id' => 'required|exists:users,id',
                'direccion' => 'required|string|max:255',
                'juego' => 'required|string|max:255',
                'descripcion' => 'nullable|string',
                'fecha' => 'required|date',
            ]);
    
            $evento = Evento::create($validated);
    
            return response()->json($evento, 201);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    // Obtener eventos por id del usuario
    public function indexUserEvent(Request $request)
    {
        $organizadorId = $request->query('organizador_id');

        if ($organizadorId) {
            $eventos = Evento::where('organizador_id', $organizadorId)->get();
        } else {
            $eventos = Evento::all();
        }

        return response()->json($eventos);
    }
    //Obtener todos los eventos
    public function index(Request $request)
    {
        
        $eventos = Evento::all();
        return response()->json($eventos);
    }
    //Obtener los datos del evento seleccionado
    public function indexEvent(Request $request)
    {
        $eventoId = $request->query('id');

        if ($eventoId) {
            $evento = Evento::where('id', $eventoId)->first();

            if (!$evento) {
                return response()->json(['error' => 'Evento no encontrado'], 404);
            }

            return response()->json($evento);
        }

        return response()->json(['error' => 'ID de evento no proporcionado'], 400);
    }


    // Actualizar evento parcialmente
    public function update(Request $request, $id)
    {
        $evento = Evento::find($id);

        if (!$evento) {
            return response()->json(['error' => 'Evento no encontrado'], 404);
        }

        $validated = $request->validate([
            'organizador_id' => 'sometimes|required',
            'direccion' => 'sometimes|required|string|max:255',
            'juego' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
            'fecha' => 'sometimes|required|date',
        ]);

        $evento->update($validated);

        return response()->json($evento);
    }

    // Eliminar evento
    public function destroy($id)
    {
        $evento = Evento::find($id);

        if (!$evento) {
            return response()->json(['error' => 'Evento no encontrado'], 404);
        }

        $evento->delete();

        return response()->json(['mensaje' => 'Evento eliminado correctamente']);
    }
}
