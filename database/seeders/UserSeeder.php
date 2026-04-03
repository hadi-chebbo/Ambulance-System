<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Center;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Super Admin (global)
        User::factory()->superAdmin()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@erc.com',
            'password' => Hash::make('superadmin123'),
        ]);

        // 2. Create users per center
        $centers = Center::all();

        foreach ($centers as $center) {

            // Admin for this center
            User::factory()
                ->admin()
                ->for($center)
                ->create([
                    'name' => 'Admin ' . $center->name,
                    'email' => 'admin' . $center->id . '@erc.com',
                    'password' => Hash::make('admin123'),
                ]);

            // EMTs
            User::factory()
                ->emt()
                ->count(10)
                ->for($center)
                ->create();

            // EMT Assistants
            User::factory()
                ->emtAssistant()
                ->count(5)
                ->for($center)
                ->create();

            //drivers
            User::factory()
                ->driver()
                ->count(3)
                ->for($center)
                ->create();
        }
    }
}