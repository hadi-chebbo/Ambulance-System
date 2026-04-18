<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Center;
use App\Http\Resources\SuperAdmin\CenterResource;
use App\Http\Requests\SuperAdmin\Center\StoreCenterRequest;
use Illuminate\Http\JsonResponse;

class CenterController extends Controller
{
    public function index()
    {
        $centers = Center::latest()->paginate(10);

        return CenterResource::collection($centers);
    }

    public function store(StoreCenterRequest $request): JsonResponse
    {
        $center = Center::create($request->validated());

        return response()->json([
            'message' => 'Center created successfully',
            'data' => new CenterResource($center),
        ], 201);
    }
}
