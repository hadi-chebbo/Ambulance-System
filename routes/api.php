<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::middleware('auth:api')
    ->controller(AuthController::class)
    ->group(function () {
        Route::post('/logout', 'logout');
        Route::post('/refresh', 'refresh');
        Route::post('/me', 'me');
    });

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
});

