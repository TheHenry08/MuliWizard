<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/productos', [ProductoController::class, 'index']);        // Listar productos (con filtros opcionales)
Route::get('/productos/{id}', [ProductoController::class, 'show']);    // Obtener producto por ID
Route::post('/productos', [ProductoController::class, 'store']);       // Crear nuevo producto
Route::put('/productos/{id}', [ProductoController::class, 'update']);  // Actualizar producto
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']); // Eliminar producto