<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'blog_id',
        'username',
        'content',
        'icon',
    ];

    public function blog()
    {
        return $this->belongsTo(Blogs::class);
    }
}
