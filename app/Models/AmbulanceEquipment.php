<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Ambulance;
use App\Models\Equipment;


#[Fillable(['equipment_id', 'quantity', 'is_active'])]

class AmbulanceEquipment extends Model
{
    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function ambulance()
    {
        return $this->belongsTo(Ambulance::class);
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
