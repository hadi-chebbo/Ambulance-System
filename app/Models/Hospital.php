<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Mission;

#[Fillable(['name', 'address', 'phone', 'is_available', 'note', 'is_active'])]

class Hospital extends Model
{
    public function missions()
    {
        return $this->hasMany(Mission::class);
    }
}
