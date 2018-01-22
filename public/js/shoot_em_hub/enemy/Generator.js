const ENEMY_GENERATOR = [
  // Single line
  {
    duration: 300,
    enemies: [
      {
        pos: {
          x: 0.1,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.3,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.5,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.7,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.9,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
    ],
  },
  // V Shape
  {
    duration: 200,
    enemies: [
      {
        pos: {
          x: 0.1,
          y: -0.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.3,
          y: -0.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.5,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.7,
          y: -0.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.9,
          y: -0.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
    ],
  },
  // / shape
  {
    duration: 200,
    enemies: [
      {
        pos: {
          x: 0.1,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.3,
          y: -0.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.5,
          y: -0.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.7,
          y: -1.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.9,
          y: -1.3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
    ],
  },
  // \ shape
  {
    duration: 200,
    enemies: [
      {
        pos: {
          x: 0.1,
          y: -1.3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.3,
          y: -1.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.5,
          y: -0.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.7,
          y: -0.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.9,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
    ],
  },
  // Electric enemies introduction
  {
    duration: 800,
    enemies: [
      {
        pos: {
          x: 0.3,
          y: -3.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.7,
          y: -3.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.5,
          y: -2.8,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.5,
          y: -2.4,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.5,
          y: -2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.5,
          y: -1.6,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.5,
          y: -1.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.5,
          y: -0.8,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.5,
          y: -0.4,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
    ],
  },
  // Electric and basic
  {
    duration: 600,
    enemies: [
      {
        pos: {
          x: 0.5,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.5,
          y: -1.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.7,
          y: -0.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.9,
          y: -1.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.5,
          y: -1.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.5,
          y: -2.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.3,
          y: -1.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.1,
          y: -2.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
    ],
  },
  // Rocket introduction
  {
    duration: 100,
    enemies: [
      {
        pos: {
          x: 0.1,
          y: -1.3,
        },
        speed: {
          x: 0,
          y: 6,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.3,
          y: -0.9,
        },
        speed: {
          x: 0,
          y: 6,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 6,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.7,
          y: -0.9,
        },
        speed: {
          x: 0,
          y: 6,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.9,
          y: -1.3,
        },
        speed: {
          x: 0,
          y: 6,
        },
        type: 'ROCKET',
      },
    ],
  },
  {
    duration: 200,
    enemies: [
      {
        pos: {
          x: 0.1,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 6,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.2,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.3,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 6,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.4,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.5,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 6,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.6,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.7,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 6,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.8,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.9,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 6,
        },
        type: 'ROCKET',
      },
    ],
  },
  // least Final wave
  {
    duration: 500,
    enemies: [
      {
        pos: {
          x: 0.3,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.7,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.5,
          y: -0.8,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.6,
          y: -1.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.8,
          y: -1.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.7,
          y: -1.4,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.6,
          y: -1.6,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.8,
          y: -1.6,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'BASIC',
      },
      {
        pos: {
          x: 0.2,
          y: -2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.3,
          y: -3.8,
        },
        speed: {
          x: 0,
          y: 6,
        },
        type: 'ROCKET',
      },
    ],
  },
  {
    duration: 800,
    enemies: [
      {
        pos: {
          x: 0.4,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -0.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -0.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -0.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -0.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -1.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -1.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -1.3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -1.3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -1.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -1.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -1.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -1.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -1.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -1.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -2.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -2.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -2.3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -2.3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -2.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -2.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -2.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -2.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -2.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -2.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -3.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -3.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -3.3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -3.3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.4,
          y: -3.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: -1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.6,
          y: -3.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        direction: 1,
        type: 'ELECTRIC',
      },
      {
        pos: {
          x: 0.47,
          y: -0.6,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -0.6,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -0.8,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -0.8,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -1.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -1.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -1.4,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -1.4,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -1.6,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -1.8,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -0.6,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -1.8,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -2.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -2.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -2.4,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -2.4,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -2.6,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -2.6,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -2.8,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -2.8,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.47,
          y: -3.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.53,
          y: -3.2,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -0.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -0.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -0.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -1.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -1.3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -1.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -1.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -1.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -2.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -2.3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -2.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -2.7,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -2.9,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -3.1,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -3.3,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
      {
        pos: {
          x: 0.5,
          y: -3.5,
        },
        speed: {
          x: 0,
          y: 3,
        },
        type: 'ROCKET',
      },
    ],
  },
];
