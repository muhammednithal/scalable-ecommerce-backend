export default function removeProperties<T>(
  obj: T,
  ...propsToRemove: (keyof T)[]
): Omit<T, (typeof propsToRemove)[number]> {
  const copy = { ...obj };
  for (const prop of propsToRemove) {
    delete copy[prop];
  }
  return copy;
}
