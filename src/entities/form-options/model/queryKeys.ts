export const formOptionsKeys = {
  all: ['form-options'] as const,
  group: () => [...formOptionsKeys.all, 'group'] as const,
  step: () => [...formOptionsKeys.all, 'step'] as const,
}
