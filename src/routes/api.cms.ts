import { createServerFn } from "@tanstack/react-start";
import fs from "node:fs";
import path from "node:path";

interface ServerCMSStore {
  version: number;
  updatedAt: string;
  data: any;
}

const STORE_FILE_PATH = path.resolve(process.cwd(), ".cms_store.json");

function loadStoreFromFile(): ServerCMSStore {
  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const content = fs.readFileSync(STORE_FILE_PATH, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed.version === "number" && parsed.data) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not load .cms_store.json file:", err);
  }
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    data: null,
  };
}

let globalCMSStore: ServerCMSStore = loadStoreFromFile();

async function saveStoreToFile(store: ServerCMSStore) {
  try {
    await fs.promises.writeFile(STORE_FILE_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not save .cms_store.json file:", err);
  }
}

export const fetchRemoteCMS = createServerFn({ method: "GET" }).handler(async () => {
  return globalCMSStore;
});

export const postRemoteCMS = createServerFn({ method: "POST" })
  .validator((d: { data: any; updatedAt?: string }) => d)
  .handler(async ({ data }: { data: { data: any; updatedAt?: string } }) => {
    if (data?.data) {
      const nextVersion = (globalCMSStore.version || 1) + 1;
      const nextUpdatedAt = data.updatedAt || new Date().toISOString();
      globalCMSStore = {
        version: nextVersion,
        updatedAt: nextUpdatedAt,
        data: data.data,
      };
      saveStoreToFile(globalCMSStore);
    }
    return {
      success: true,
      version: globalCMSStore.version,
      updatedAt: globalCMSStore.updatedAt,
    };
  });

