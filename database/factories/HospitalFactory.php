<?php

namespace Database\Factories;

use App\Models\Hospital;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Hospital>
 */
class HospitalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'         => fake()->company() . ' Hospital',
            'address'      => fake()->address(),
            'phone'        => fake()->numerify('01#######'),
            'is_available' => true,
            'notes'        => fake()->optional()->sentence(),
            'is_active'    => true,
        ];
    }
}
