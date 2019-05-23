export default abstract class AbstractError extends Error {

	constructor(public message: string) {
		super(message);
	}

	get name() {
		return this.constructor.name;
	}

}
