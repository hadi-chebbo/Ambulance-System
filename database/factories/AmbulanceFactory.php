<?php

namespace Database\Factories;

use App\Models\Ambulance;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Ambulance>
 */
class AmbulanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'         => 'Ambulance ' . fake()->unique()->numberBetween(100, 105),
            'plate_number' => fake()->unique()->bothify('??-##-??'),
            'photo'        => null,
            'is_active'    => true,
            'last_checked' => fake()->date(),
            'notes' => fake()->optional()->sentence()
        ];
    }
}
