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

    public function setServicesAttribute($value)
    {
        // Check if value is a string, if so convert to array
        if (is_string($value)) {
            $value = explode(',', $value); // Assuming comma-separated values
        }

        $this->attributes['services'] = json_encode($value);
    }
}
