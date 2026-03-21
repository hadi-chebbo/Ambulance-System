<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Mission;

#[Fillable(['photo_url'])]

class MissionPhoto extends Model
{
    public function mission()
    {
        return $this->belongsTo(Mission::class);
    }
}
