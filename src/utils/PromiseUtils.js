/**
 * Transform an ES6 promise into cancelable promise
 * Code from: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 * @param  {Promise} promise 	Promise to transform
 * @return {Object}         	Custom cancelable promise
 */
export function makeCancelable(promise) {
	let hasCanceled = false;

	const wrappedPromise = new Promise((resolve, reject) => {
		promise.then(
			val => hasCanceled ? reject({
				isCanceled: true
			}) : resolve(val),
			error => hasCanceled ? reject({
				isCanceled: true
			}) : reject(error)
		);
	});

	return {
		promise: wrappedPromise,
		cancel() {
			hasCanceled = true;
		}
	};
}
