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

    // Define the relationship with the Rating model
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    // Append the average_rating attribute to the model's array form
    protected $appends = ['average_rating'];

    // Define the accessor for the average_rating attribute
    public function getAverageRatingAttribute()
    {
        return $this->ratings()->avg('rating_value');
    }
}
