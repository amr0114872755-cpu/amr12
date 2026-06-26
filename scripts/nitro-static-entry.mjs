export default {
  fetch() {
    return new Response("", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
  async close() {},
};