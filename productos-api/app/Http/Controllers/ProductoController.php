<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Producto::query();

            if ($request->filled('nombre')) {
                $query->where('nombre', 'like', '%' . $request->nombre . '%');
            }

            if ($request->filled('juego')) {
                $query->where('juego', $request->juego);
            }

            if ($request->filled('estado')) {
                $query->where('estado', $request->estado);
            }

            if ($request->filled('precio_min')) {
                $query->where('precio', '>=', $request->precio_min);
            }

            if ($request->filled('precio_max')) {
                $query->where('precio', '<=', $request->precio_max);
            }

            $productos = $query->get();

            return response()->json([
                'message' => 'Productos obtenidos correctamente',
                'data' => $productos
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al obtener productos: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al obtener productos'
            ], 500);
        }
    }

    public function show($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json([
            'message' => 'Producto obtenido correctamente',
            'data' => $producto
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'juego' => 'required|in:Magic,Pokemon,One Piece,Lorcana,Star Wars,Yu Gi Oh',
            'stock' => 'required|integer|min:0',
            'precio' => 'required|numeric|min:0',
            'estado' => 'required|in:Nueva,Usada - Excelente,Usada - Buena,Usada - Regular,Dañada',
            'imagen' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048'
        ]);

        try {
            $producto = new Producto($request->except('imagen'));

            if ($request->hasFile('imagen')) {
                $producto->imagen = file_get_contents($request->file('imagen')->getRealPath());
            }

            $producto->save();

            return response()->json([
                'message' => 'Producto creado correctamente',
                'data' => $producto
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error al crear producto: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al crear el producto'
            ], 500);
        }
    }

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

        try {
            $producto->fill($request->except('imagen'));

            if ($request->hasFile('imagen')) {
                $producto->imagen = file_get_contents($request->file('imagen')->getRealPath());
            }

            $producto->save();

            return response()->json([
                'message' => 'Producto actualizado correctamente',
                'data' => $producto
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al actualizar producto: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al actualizar el producto'
            ], 500);
        }
    }

    public function destroy($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        try {
            $producto->delete();

            return response()->json([
                'message' => 'Producto eliminado correctamente'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al eliminar producto: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al eliminar el producto'
            ], 500);
        }
    }
}
