export function hasUpdatableField(payload: Record<string, unknown>) {
  return Object.values(payload).some(value => value !== undefined)
}
