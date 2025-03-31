<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('productos', function (Blueprint $table) {
            $table->id(); // Crea una columna auto incremental llamada 'id'
            $table->string('nombre');
            $table->enum('juego', ['Magic', 'Pokemon', 'One Piece', 'Lorcana', 'Star Wars', 'Yu Gi Oh']);
            $table->integer('stock')->default(0);
            $table->decimal('precio', 10, 2);
            $table->enum('estado', ['Nueva', 'Usada - Excelente', 'Usada - Buena', 'Usada - Regular', 'Dañada']);
            $table->timestamps(); // Crea columnas 'created_at' y 'updated_at'
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
