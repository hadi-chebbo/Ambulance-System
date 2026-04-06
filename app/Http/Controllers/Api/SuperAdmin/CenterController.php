<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Center;
use App\Http\Resources\SuperAdmin\CenterResource;

class CenterController extends Controller
{
    public function index()
    {
        $centers = Center::latest()->paginate(10);

        return CenterResource::collection($centers);
    }
}
