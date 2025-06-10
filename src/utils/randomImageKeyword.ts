const keywords = [
  { country: 'South Korea', city: 'Seoul' },
  { country: 'France', city: 'Paris' },
  { country: 'Japan', city: 'Tokyo' },
  { country: 'United States', city: 'New York' },
  { country: 'United Kingdom', city: 'London' },
  { country: 'Italy', city: 'Rome' },
  { country: 'Thailand', city: 'Bangkok' },
  { country: 'Spain', city: 'Barcelona' },
  { country: 'Turkey', city: 'Istanbul' },
  { country: 'Greece', city: 'Santorini' },
  { country: 'Australia', city: 'Sydney' },
  { country: 'Indonesia', city: 'Bali' },
  { country: 'Canada', city: 'Vancouver' },
];

export const selectedLocation = keywords[Math.floor(Math.random() * keywords.length)];
