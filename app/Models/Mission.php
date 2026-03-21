<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Shift;
use App\Models\Hospital;
use App\Models\User;
use App\Models\Ambulance;
use App\Models\MissionPhoto;

#[Fillable(['type', 'status', 'patient_name', 'patient_age', 'patient_weight', 'patient_phone', 'patient_notes', 'started_at', 'ended_at', 'notes'])]

class Mission extends Model
{
    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime'
    ];

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }

    public function recorderBy()
    {
        return $this->belongsTo(User::class, 'recorder_by');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'mission_users')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function ambulance()
    {
        return $this->belongsTo(Ambulance::class);
    }

    public function missionPhotos()
    {
        return $this->hasMany(MissionPhoto::class);
    }
}
