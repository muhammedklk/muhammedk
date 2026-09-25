import { createAPIFileRoute } from "@tanstack/react-start/api";

let globalCMSStore: { updatedAt: string; data: any } = {
  updatedAt: new Date().toISOString(),
  data: null,
};

export const Route = createAPIFileRoute("/api/cms")({
  GET: async () => {
    return new Response(JSON.stringify(globalCMSStore), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  },
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      if (body?.data) {
        globalCMSStore = {
          updatedAt: body.updatedAt || new Date().toISOString(),
          data: body.data,
        };
      }
      return new Response(JSON.stringify({ success: true, updatedAt: globalCMSStore.updatedAt }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
});
