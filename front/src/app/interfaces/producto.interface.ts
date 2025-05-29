// src/app/interfaces/producto.interface.ts

export interface Producto {
    id: number;
    nombre: string;
    juego: string;
    stock: number;
    precio: string;
    expansion: string;
    // agrega aquí más campos si los tienes
  }
  
  export interface RespuestaApiProductos {
    message: string;
    data: Producto[];
  }
  