<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarkerLocations extends Model
{
    protected $fillable = [
        'location', 'longitude', 'latitude', 'location_image', 'location_title', 'location_description'
    ];

    public function services()
    {
        return $this->hasMany(LocationServices::class, 'marker_location_id');
    }
    
}


