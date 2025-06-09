import { currencyApi } from "../currencies";

export async function getCurrencies() {
  //забыл try catch
  const response = await currencyApi.getCurrencyList();
  const data = await response.json();
  return Object.entries(data).map(([code, name]) => ({ code, name }));
}
