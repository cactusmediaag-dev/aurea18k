// Maps color variant names to hex swatches for the PDP color picker.
const COLOR_MAP: Record<string, string> = {
  green: '#2D5A3D',
  emerald: '#2D5A3D',
  black: '#1a1a1a',
  jet: '#1a1a1a',
  purple: '#7B4F9E',
  violet: '#7B4F9E',
  pink: '#E8A0BF',
  rose: '#E8B4B8',
  gold: '#D4AF37',
  'rose gold': '#E0B0A0',
  'white gold': '#E8E4DC',
  silver: '#C0C0C0',
  white: '#FAFAF7',
  ivory: '#F5F0E1',
  blue: '#2C5F8D',
  navy: '#1B2A4E',
  red: '#B22222',
  ruby: '#9B111E',
  brown: '#6B4423',
  beige: '#D9C9A8',
  champagne: '#E6D2A8',
  pearl: '#F0EAD6',
  turquoise: '#30D5C8',
  amber: '#FFBF00',
  clear: '#E8E8E8',
  crystal: '#E8E8E8',
};

export function getSwatchColor(name: string): string {
  if (!name) return '#CCCCCC';
  const key = name.trim().toLowerCase();
  if (COLOR_MAP[key]) return COLOR_MAP[key];
  // Fallback: try CSS color name natively (handled by browser via inline style)
  return key.replace(/\s+/g, '');
}

export function isColorOption(optionName: string): boolean {
  return /^(cor|color|colour|colors|colours)$/i.test(optionName.trim());
}
