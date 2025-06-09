const DEV_API = "https://api.frankfurter.dev/v1";
const USER_API = "https://api.frankfurter.app";

export const currencyApi = {
  getCurrencyList: async () => await fetch(`${DEV_API}/currencies`),
  calculateResult: async (query) => await fetch(`${USER_API}/latest?${query}`),
};
