const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("FinanceDB", 2);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("transactions")) {
        db.createObjectStore("transactions", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", { keyPath: "id" });
      }
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject("Database error: " + event.target.errorCode);
    };
  });
};


export const addTransaction = async (transaction) => {
  const db = await openDatabase();
  const transactionDb = db.transaction("transactions", "readwrite");
  const store = transactionDb.objectStore("transactions");
  store.add(transaction);
};

export const getTransactions = async () => {
  const db = await openDatabase();
  const transactionDb = db.transaction("transactions", "readonly");
  const store = transactionDb.objectStore("transactions");
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
    request.onerror = function (event) {
      reject("Fetch error: ", event.target.error);
    };
  });
};

export const deleteTransaction = async (id) => {
  const db = await openDatabase();
  const transactionDb = db.transaction("transactions", "readwrite");
  const store = transactionDb.objectStore("transactions");
  store.delete(id);
};

export const setMonthlyIncome = async (income) => {
  const db = await openDatabase();
  const settingsDb = db.transaction("settings", "readwrite");
  const store = settingsDb.objectStore("settings");
  store.put({ id: "monthlyIncome", value: income });
};


export const getMonthlyIncome = async () => {
  const db = await openDatabase();
  const settingsDb = db.transaction("settings", "readonly");
  const store = settingsDb.objectStore("settings");
  const request = store.get("monthlyIncome");

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result ? request.result.value : "");
    };
    request.onerror = (event) => {
      reject("Fetch error: ", event.target.error);
    };
  });
};

