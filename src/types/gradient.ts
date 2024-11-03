export type GradientVariant = 'sunset' | 'ocean' | 'fire' | 'custom' | 'inactive' | 'inactiveDark';
export type GradientColors = {
  [key in GradientVariant]: string[];
};