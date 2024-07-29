<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingTabs extends Model
{
    use HasFactory;

    protected $fillable = [
        'tabs_type',
        'tabs_title',
    ];
}
