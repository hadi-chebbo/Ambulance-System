<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use App\Models\Ambulance;
use App\Models\User;

#[Fillable(['name', 'address', 'phone', 'email', 'is_active'])]

class Center extends Model
{
    /** @use HasFactory<\Database\Factories\CenterFactory> */
    use HasFactory;

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function ambulances()
    {
        return $this->hasMany(Ambulance::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}