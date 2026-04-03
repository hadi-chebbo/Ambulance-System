<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ambulances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('center_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('plate_number')->unique()->nullable();
            $table->string('photo')->nullable();
            $table->boolean('is_active')->default(true);
            $table->date('last_checked');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['center_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ambulances');
    }
};
