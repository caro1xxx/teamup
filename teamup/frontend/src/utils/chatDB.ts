import { openDB } from "idb";

export const createOrOpenDB = (storeName: string, version: number) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("teamup_chat_record_db", version);

    request.onupgradeneeded = function (event: any) {
      const db = event.target.result;

      db.createObjectStore(storeName, { keyPath: "id" });

      // 创建索引（如果需要）
      // objectStore.createIndex("name", "name", { unique: false });
    };

    request.onsuccess = function (event: any) {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = function (event: any) {
      reject(new Error("Error opening database"));
    };
  });
};

export async function getAllItems(
  dbName: string,
  storeName: string,
  version: number
) {
  const db = await openDB(dbName, version);
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const items = await store.getAll();
  return items;
}

export async function addItem(
  dbName: string,
  storeName: string,
  version: number,
  value: any
) {
  const db = await openDB(dbName, version);
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  // @ts-ignore
  await store.put(value);
}

export function deleteDB() {
  const deleteRequest = indexedDB.deleteDatabase("teamup_chat_record_db");
  deleteRequest.onsuccess = function (event) {};
  deleteRequest.onerror = function (event) {};
}
