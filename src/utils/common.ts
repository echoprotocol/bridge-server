export function dotsCaseToCamelCase(value: string): string {
	return value.replace(/\.([a-z])/g, ([, char]) => char.toUpperCase());
}
