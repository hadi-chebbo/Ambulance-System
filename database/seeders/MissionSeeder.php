<?php

namespace Database\Seeders;

use App\Models\Ambulance;
use App\Models\Hospital;
use App\Models\Mission;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Database\Seeder;

class MissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shifts = Shift::all();
        $hospitals = Hospital::all();
        $ambulances = Ambulance::all();
        $recorders = User::all();

        foreach ($shifts as $shift) {
            if ($hospitals->isEmpty() || $ambulances->isEmpty() || $recorders->isEmpty()) {
                continue;
            }

            $shiftUsers = $shift->shiftUsers()->with('user')->get();

            if ($shiftUsers->isEmpty()) {
                continue;
            }

            $mission = $shift->missions()->create([
                ...Mission::factory()->make()->toArray(),
                'hospital_id' => $hospitals->random()->id,
                'ambulance_id' => $ambulances->random()->id,
                'recorded_by' => $recorders->random()->id,
            ]);

            $attachedUserIds = [];

            $driver = $shiftUsers->first(fn ($shiftUser) => $shiftUser->user?->role === 'driver');

            if ($driver) {
                $mission->users()->attach($driver->user_id, [
                    'role' => 'driver',
                ]);
                $attachedUserIds[] = $driver->user_id;
            }

            $emts = $shiftUsers
                ->filter(fn ($shiftUser) => $shiftUser->user?->role === 'EMT')
                ->take(2);

            foreach ($emts as $emt) {
                if (! in_array($emt->user_id, $attachedUserIds)) {
                    $mission->users()->attach($emt->user_id, [
                        'role' => 'EMT',
                    ]);
                    $attachedUserIds[] = $emt->user_id;
                }
            }

            if (! in_array($shift->supervisor_id, $attachedUserIds)) {
                $mission->users()->attach($shift->supervisor_id, [
                    'role' => 'supervisor',
                ]);
            }
        }
    }
}