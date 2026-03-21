<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Mission;

#[Fillable(['name', 'address', 'phone', 'is_available', 'notes', 'is_active'])]

class Hospital extends Model
{
    use HasFactory;

    public function missions()
    {
        return $this->hasMany(Mission::class);
    }
}
