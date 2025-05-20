<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    if (!Schema::hasTable('productos')) {
        Schema::create('productos', function (Blueprint $table) {
            $table->id(); 
            $table->string('nombre');
            $table->enum('juego', ['Magic', 'Pokemon', 'One Piece', 'Lorcana', 'Star Wars', 'Yu Gi Oh']);
            $table->integer('stock')->default(0);
            $table->decimal('precio', 10, 2);
            $table->enum('estado', ['Nueva', 'Usada - Excelente', 'Usada - Buena', 'Usada - Regular', 'Dañada']);
            $table->timestamps();
            $table->binary('imagen')->nullable();
        });
    }
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
