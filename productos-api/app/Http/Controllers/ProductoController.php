<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{

    public function index(Request $request)
    {
        $query = Producto::query();

        if ($request->has('nombre') && !empty($request->input('nombre'))) {
            $query->where('nombre', 'like', '%' . $request->input('nombre') . '%');
        }

        if ($request->has('juego') && !empty($request->input('juego'))) {
            $query->where('juego', $request->input('juego'));
        }

        if ($request->has('estado') && !empty($request->input('estado'))) {
            $query->where('estado', $request->input('estado'));
        }

        if ($request->has('precio_min')) {
            $query->where('precio', '>=', $request->input('precio_min'));
        }

        if ($request->has('precio_max')) {
            $query->where('precio', '<=', $request->input('precio_max'));
        }

        $productos = $query->get();
        return response()->json($productos);
    }

    // Obtener producto por ID
    public function show($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json($producto);
    }

    // Crear producto
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'juego' => 'required|in:Magic,Pokemon,One Piece,Lorcana,Star Wars,Yu Gi Oh',
            'stock' => 'required|integer|min:0',
            'precio' => 'required|numeric|min:0',
            'estado' => 'required|in:Nueva,Usada - Excelente,Usada - Buena,Usada - Regular,Dañada',
            'imagen' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048'
        ]);

        $producto = new Producto($request->except('imagen'));

        if ($request->hasFile('imagen')) {
            $producto->imagen = file_get_contents($request->file('imagen')->getRealPath());
        }

        $producto->save();

        return response()->json($producto, 201);
    }

    // Actualizar producto
    public function update(Request $request, $id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'juego' => 'sometimes|in:Magic,Pokemon,One Piece,Lorcana,Star Wars,Yu Gi Oh',
            'stock' => 'sometimes|integer|min:0',
            'precio' => 'sometimes|numeric|min:0',
            'estado' => 'sometimes|in:Nueva,Usada - Excelente,Usada - Buena,Usada - Regular,Dañada',
            'imagen' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048'
        ]);

        $producto->fill($request->except('imagen'));

        if ($request->hasFile('imagen')) {
            $producto->imagen = file_get_contents($request->file('imagen')->getRealPath());
        }

        $producto->save();

        return response()->json($producto);
    }

    // Eliminar producto
    public function destroy($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $producto->delete();

        return response()->json(['message' => 'Producto eliminado'], 200);
    }
}
