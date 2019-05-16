export default abstract class AbstractError extends Error {

	// FIXME:
	// constructor(public message: string) {
	constructor(public message: string) {
		super(message);
	}

	get name() {
		return this.constructor.name;
	}

}
