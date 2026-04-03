<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ambulance;
use App\Models\Center;

class AmbulanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $centers = Center::all();

        foreach($centers as $center){
            Ambulance::factory()
                ->count(4)
                ->for($center)
                ->create();
        }
    }
}
