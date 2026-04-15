<?php

namespace Database\Factories;

use App\Models\Center;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Center>
 */
class CenterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $address = fake()->randomElement(['Barja', 'Tripoly', 'Bekaa', 'Saida']);
        return [
            'name' => 'ERC' . $address . ' ' . fake()->unique()->numberBetween(1, 999),
            'address' => $address,
            'phone' => fake()->numerify('01######'),
            'email' => fake()->unique()->safeEmail(),
            'is_active' => true
        ];
    }
}
