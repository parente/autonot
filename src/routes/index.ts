declare var KV_SECRETS;
declare var crypto;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request, platform }) {
	return {
		status: 200,
        body: {}
	};
}
