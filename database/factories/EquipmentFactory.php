<?php

namespace Database\Factories;

use App\Models\Equipment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Equipment>
 */
class EquipmentFactory extends Factory
{
    private static array $items = [
        'Defibrillator',
        'Oxygen Tank',
        'Stretcher',
        'Blood Pressure Monitor',
        'First Aid Kit',
        'Cervical Collar',
        'Pulse Oximeter',
        'Suction Device',
        'IV Kit',
        'Bandages Set',
    ];

    private static int $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => self::$items[self::$index++ % count(self::$items)],
            'quantity' => fake()->numberBetween(1, 10),
            'is_active' => true,
        ];
    }
}
