<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Equipment;
use App\Models\Ambulance;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Equipment::factory()->count(10)->create();

        $ambulances = Ambulance::all();
        $equipmentItems = Equipment::all();

        foreach ($ambulances as $ambulance) {
            foreach ($equipmentItems as $item) {
                $ambulance->ambulanceEquipments()->create([
                    'equipment_id' => $item->id,
                    'quantity' => rand(1, 3),
                    'is_active' => true,
                ]);
            }
        }
    }
}
