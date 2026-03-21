<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Attendance;
use App\Models\User;
use App\Models\Mission;
use App\Models\EquipmentCheck;
use App\Models\ShiftUser;

#[Fillable(['date', 'type', 'notes'])]

class Shift extends Model
{
    use HasFactory;

    protected $casts = [
        'date' => 'date',
    ];

    public function shiftSupervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id');
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

    public function shiftUsers()
    {
        return $this->hasMany(ShiftUser::class);
    }
}
