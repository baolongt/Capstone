import { fakeCallApi } from "./fakeCallAPI";

export async function fetchCounter() {
	await fakeCallApi(1);
	return 100;
}
