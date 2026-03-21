<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Shift;
use App\Models\User;

#[Fillable(['user_id', 'is_switch', 'switch_user'])]

class ShiftUser extends Model
{
    protected $casts = [
        'is_switch' => 'boolean',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function shift() {
        return $this->belongsTo(Shift::class);
    }
}
