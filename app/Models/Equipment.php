<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\AmbulanceEquipment;

#[Fillable(['name', 'quantity', 'is_active'])]

class Equipment extends Model
{
    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function ambulanceEquipments()
    {
        return $this->hasMany(AmbulanceEquipment::class);
    }
}
