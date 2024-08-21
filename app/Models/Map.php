<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Map extends Model
{
    use HasFactory;

    protected $fillable = [
        'location',
        'longitude',
        'latitude',
        'image',
        'title',
        'description',
        'address',
        'phone',
        'services',
    ];

    protected $casts = [
        'services' => 'array', 
    ];
}
