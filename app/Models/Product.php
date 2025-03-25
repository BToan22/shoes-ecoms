<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = ['name', 'brand', 'description', 'price'];

    protected $casts = [
        'price' => 'integer',
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
