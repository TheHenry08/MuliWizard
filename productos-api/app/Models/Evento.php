<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    public $timestamps = false;
    protected $fillable = ['organizador_id','direccion', 'juego', 'descripcion' ,'fecha'];

}
