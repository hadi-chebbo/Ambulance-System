<?php

namespace Database\Seeders;

use App\Models\Shift;
use App\Models\User;
use Illuminate\Database\Seeder;

class ShiftSeeder extends Seeder
{
    public function run(): void
    {
        $supervisors = User::where('role', 'EMT')->get();
        $emts = User::whereIn('role', ['EMT', 'EMT-assistant', 'driver'])->get();

        for ($i = 0; $i < 20; $i++) {
            $supervisor = $supervisors->random();

            // Create shift through supervisor relationship
            $shift = $supervisor->supervisedShifts()->create(
                Shift::factory()->make()->toArray()
            );

            // Assign EMTs through relationship
            $emts->random(4)->each(function ($emt) use ($shift) {
                $shift->shiftUsers()->create([
                    'user_id' => $emt->id,
                    'is_switch' => false,
                    'switch_reason' => null,
                ]);
            });

            // Mark attendance through relationship
            $shift->shiftUsers()->each(function ($shiftUser) use ($shift) {
                $shift->attendances()->create([
                    'user_id' => $shiftUser->user_id,
                    'marked_by' => $shift->supervisor_id,
                    'status' => fake()->randomElement([
                        'present', 'absent', 'late', 'excused',
                    ]),
                    'notes' => null,
                    'marked_at' => now(),
                ]);
            });
        }
    }
}
