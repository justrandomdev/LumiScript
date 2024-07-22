import { useState, useEffect, useCallback, useRef } from 'react';
import { openDB } from 'idb';

const DB_NAME = 'PromptWizardDB';
const DB_VERSION = 1;
const STORE_NAME = 'stories';

let dbInstance = null; // Shared database instance

async function initDB() {
  if (!dbInstance) {
    dbInstance = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }
  return dbInstance;
}

function useIndexedDB(storeName = STORE_NAME) {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initializeDB = async () => {
      const database = await initDB();
      setDb(database);
    };
    initializeDB();
  }, []);

  const getAll = useCallback(async () => {
    if (!db) return [];
    return await db.getAll(storeName);
  }, [db, storeName]);

  const get = useCallback(async (id) => {
    if (!db) return null;
    return await db.get(storeName, id);
  }, [db, storeName]);

  const add = useCallback(async (item) => {
    if (!db) return null;
    return await db.add(storeName, item);
  }, [db, storeName]);

  const update = useCallback(async (item) => {
    if (!db) return null;
    return await db.put(storeName, item);
  }, [db, storeName]);

  const remove = useCallback(async (id) => {
    if (!db) return;
    await db.delete(storeName, id);
  }, [db, storeName]);

  return {
    getAll,
    get,
    add,
    update,
    remove,
  };
}

export default useIndexedDB;
