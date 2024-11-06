export interface GradientConfig {
  colors: string[]
  start?: { x: number; y: number }
  end?: { x: number; y: number }
  locations?: number[]
}

// Base configuration for all gradients
const baseGradientConfig = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
} as const

export const gradients = {
  primary: {
    ...baseGradientConfig,
    colors: ['#1E90FF', '#47ADFF'],
    locations: [0, 1],
  },
  secondary: {
    ...baseGradientConfig,
    colors: ['#7928CA', '#FF0080'],
    locations: [0, 1],
  },
  success: {
    ...baseGradientConfig,
    colors: ['#10B981', '#34D399'],
    locations: [0, 1],
  },
  warning: {
    ...baseGradientConfig,
    colors: ['#F59E0B', '#FBBF24'],
    locations: [0, 1],
  },
  error: {
    ...baseGradientConfig,
    colors: ['#EF4444', '#F87171'],
    locations: [0, 1],
  },
  ocean: {
    ...baseGradientConfig,
    colors: ['#2193b0', '#6dd5ed'],
    locations: [0, 1],
  },
} as const

export type GradientPreset = keyof typeof gradients

export const defaultGradientConfig: GradientConfig = {
  ...baseGradientConfig,
  colors: ['#1E90FF', '#47ADFF'],
  locations: [0, 1],
}
