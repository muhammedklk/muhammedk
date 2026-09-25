import { createServerFn } from "@tanstack/react-start";

let globalCMSStore: { updatedAt: string; data: any } = {
  updatedAt: new Date().toISOString(),
  data: null,
};

export const fetchRemoteCMS = createServerFn({ method: "GET" }).handler(async () => {
  return globalCMSStore;
});

export const postRemoteCMS = createServerFn({ method: "POST" })
  .validator((d: { data: any; updatedAt?: string }) => d)
  .handler(async ({ data }: { data: { data: any; updatedAt?: string } }) => {
    if (data?.data) {
      globalCMSStore = {
        updatedAt: data.updatedAt || new Date().toISOString(),
        data: data.data,
      };
    }
    return { success: true, updatedAt: globalCMSStore.updatedAt };
  });
