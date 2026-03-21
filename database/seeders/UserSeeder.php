<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->admin()->create([
            'name' => 'Admin',
            'phone' => '030000000',
            'password' => Hash::make('admin123'),
        ]);

        User::factory()->emt()->count(10)->create();
        User::factory()->emtAssistant()->count(20)->create();
        User::factory()->driver()->count(6);
    }
}
