<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SuperAdmin\CenterController;

Route::controller(CenterController::class)->group(function () {
    Route::get('/centers', 'index');
    Route::post('/center', 'store');
});

