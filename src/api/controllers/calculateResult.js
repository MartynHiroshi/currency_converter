import { currencyApi } from "../currencies";
// если аргументов у функции больше 3 то делаем объект
export async function calculateResult({ input, currencyFrom, currencyTo, setResult, setIsLoading }) {
  setIsLoading(true);
  try {
    // убрал валидацию на пустой инпут потому что теперь это делает кнопка
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
