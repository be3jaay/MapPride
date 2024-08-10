<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocationServices extends Model
{
    protected $fillable = [
        'marker_location_id', 'service_name'
    ];

    public function markerLocation()
    {
        return $this->belongsTo(MarkerLocations::class, 'marker_location_id');
    }
}

