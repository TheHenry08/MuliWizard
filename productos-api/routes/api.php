<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventoController;

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', fn(Request $request) => $request->user());

// Productos
Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::post('/productos', [ProductoController::class, 'store']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

//Eventos
Route::post('/eventos', [EventoController::class, 'store']);
Route::get('/eventos', [EventoController::class, 'index']);
Route::get('/eventos/filtrados', [EventoController::class, 'indexEvent']);
Route::delete('/eventos/{id}', [EventoController::class, 'destroy']);
Route::patch('/eventos/{id}', [EventoController::class, 'update']);