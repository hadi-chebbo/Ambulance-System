<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Ambulance;
use App\Models\Shift;
use App\Models\User;

#[Fillable(['checked_at', 'results', 'notes'])]

class EquipmentCheck extends Model
{
    protected $casts = [
        'checked_at' => 'datetime'
    ];

    public function ambulance()
    {
        return $this->belongsTo(Ambulance::class);
    }
    
    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function checkedBy()
    {
        return $this->belongsTo(User::class, 'checked_by');
    }
}
