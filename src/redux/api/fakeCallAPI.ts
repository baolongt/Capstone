export const fakeCallApi = async (second: number) => {
	console.count("Call API");
	await new Promise((resolve) => setTimeout(resolve, second * 1000));
	console.count("Call API success after " + second);
};
