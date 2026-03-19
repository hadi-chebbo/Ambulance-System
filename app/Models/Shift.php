<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

#[Fillable(['date', 'type', 'notes'])]
#[Cast(['date'])]

class Shift extends Model
{
    public function shiftSupervisor(){
        return $this->belongsTo(User::class , 'shift_supervisor_id');
    }
}
