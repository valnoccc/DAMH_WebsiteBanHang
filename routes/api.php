<?php

use App\Http\Controllers\ImageUploadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/upload-image', [ImageUploadController::class, 'store']);