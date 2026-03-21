<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Attendance;
use App\Models\Mission;
use App\Models\EquipmentCheck;

#[Fillable(['date', 'type', 'notes'])]

class Shift extends Model
{
    protected $casts = [
        'date' => 'date'
    ];

    public function shiftSupervisor()
    {
        return $this->belongsTo(User::class , 'supervisor_id');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
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
