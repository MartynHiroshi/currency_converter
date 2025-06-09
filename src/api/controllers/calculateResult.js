import { currencyApi } from "../currencies";

export async function calculateResult(input, currencyFrom, currencyTo, setResult, setIsLoading) {
  setIsLoading(true);
  try {
    const query = { amount: input, from: currencyFrom, to: currencyTo };
    // используем query параметры а не форматированую строку
    const queryString = new URLSearchParams(query).toString();
    const response = await currencyApi.calculateResult(queryString);
    const data = await response.json();
    setResult(data?.rates[currencyTo]);
  } catch {
    alert("Не получилось обработать конвертацию");
  } finally {
    setIsLoading(false);
  }
}
