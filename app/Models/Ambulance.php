<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\AmbulanceEquipment;
use App\Models\Mission;
use App\Models\EquipmentCheck;

#[Fillable(['name','plate_number','photo','is_active','last_checked','notes'])]

class Ambulance extends Model
{
    use HasFactory;
    
    protected $casts = [
        'is_active' => 'boolean',
        'last_checked' => 'date'
    ];

    public function ambulanceEquipments()
    {
        return $this->hasMany(AmbulanceEquipment::class);
    }

    public function missions()
    {
        return $this->hasMany(Mission::class);
    }

    public function equipmentChecks()
    {
        return $this->hasMany(EquipmentCheck::class);
    }
}
