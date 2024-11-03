export type GradientVariant = 'sunset' | 'ocean' | 'fire' | 'custom';
export type GradientColors = {
  [key in GradientVariant]: string[];
};