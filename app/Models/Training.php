<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    use HasFactory;

    protected $fillable = [
        'tabs_title',
        'title',
        'description',
        'url_link',
        'credits',
        'certificate'
    ];
}
