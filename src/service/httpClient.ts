interface IHttpClientRequest<T> {
	url: string;
	payload?: T;
	param?: T;
}

export async function getAll(url: string) {
	try {
		const response = await fetch(url, { method: "GET" });
		const data = response.json();
		return data;
	} catch (error: any) {
		console.error(`Something went wrong: ${error.message}`);
	}
}

export async function getById<T>(parameters: IHttpClientRequest<T>) {
	try {
		const { url, param } = parameters;

		const response = await fetch(`${url}/${param}`, { method: "GET" });
		const data = response.json();
		return data;
	} catch (error: any) {
		console.error(`Something went wrong: ${error.message}`);
	}
}

export async function post<T>(parameters: IHttpClientRequest<T>) {
	try {
		const { url, payload } = parameters;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		return await response.json();
	} catch (error: any) {
		console.error(`Something went wrong: ${error.message}`);
	}
}

export async function put<T>(parameters: IHttpClientRequest<T>) {
	try {
		const { url, payload, param } = parameters;
		const response = await fetch(`${url}/${param}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		return await response.json();
	} catch (error: any) {
		console.error(`Something went wrong: ${error.message}`);
	}
}

export async function deleteById<T>(parameters: IHttpClientRequest<T>) {
	try {
		const { url, param } = parameters;

		const response = await fetch(`${url}/${param}`, { method: "DELETE" });
		const data = response.json();
		return data;
	} catch (error: any) {
		console.error(`Something went wrong: ${error.message}`);
	}
}
