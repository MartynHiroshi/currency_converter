import { useState } from "react";
import "./index.css";
import CurrencySelect from "./components/CurrencySelect";

const USER_API = "https://api.frankfurter.app/";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [input, setInput] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div className="app">
      <h1>Валютный калькулятор</h1>
      <div className="converter-container">
        <div className="input-group">
          <input
            type="number"
            placeholder="Кол-во"
            className="input-field"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && calculateResult(input, currencyFrom, currencyTo, setResult, setIsLoading)}
          />
          <CurrencySelect value={currencyFrom} setFunction={setCurrencyFrom} setIsLoading={setIsLoading} />
          <span className="arrow">→</span>
          <CurrencySelect value={currencyTo} setFunction={setCurrencyTo} setIsLoading={setIsLoading} />
        </div>
        <button className="convert-button" onClick={() => calculateResult(input, currencyFrom, currencyTo, setResult, setIsLoading)}>
          Сконвертировать
        </button>
        {isLoading ? <p className="loading">Обработка...</p> : result == 0 || <p className="result">{result}</p>}
      </div>
    </div>
  );
}

async function calculateResult(input, currencyFrom, currencyTo, setResult, setIsLoading) {
  setIsLoading(true);
  try {
    if (!input || input <= 0) {
      setResult(null);
      alert("Введеное значение не может быть равно 0 или меньше");
    } else {
      const response = await fetch(`${USER_API}latest?amount=${input}&from=${currencyFrom}&to=${currencyTo}`);
      const data = await response.json();
      setResult(data?.rates[currencyTo]);
    }
  } catch {
    alert("Не получилось обработать конвертацию");
  } finally {
    setIsLoading(false);
  }
}
