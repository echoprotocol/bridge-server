export function removeExtension(value: string): string {
	return value.replace(/\.[a-z]+$/, '');
}

export function dotsCaseToCamelCase(value: string): string {
	return value.replace(/\.([a-z])/g, ([, char]) => char.toUpperCase());
}
