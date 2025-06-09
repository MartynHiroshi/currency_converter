import "./index.css";
import { useEffect, useState } from "react";
import { calculateResult } from "./api/controllers/calculateResult";
import { getCurrencies } from "./api/controllers/getCurrencyList";
import CurrencySelect from "./components/CurrencySelect";

export default function App() {
  const [currencyList, setCurrencyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [input, setInput] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    getCurrencies()
      .then(setCurrencyList)
      .catch(() => alert("Ошибка получения валют"))
      .finally(() => setIsLoading(false));
  }, []);

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
            onKeyDown={(event) => {
              if (event.key === "Enter" && !isInvalidInput(input, isLoading))
                calculateResult(input, currencyFrom, currencyTo, setResult, setIsLoading);
            }}
          />
          <CurrencySelect value={currencyFrom} setFunction={setCurrencyFrom} currencyList={currencyList} />
          <span className="arrow">→</span>
          <CurrencySelect value={currencyTo} setFunction={setCurrencyTo} currencyList={currencyList} />
        </div>
        <button
          className="convert-button"
          onClick={() => calculateResult(input, currencyFrom, currencyTo, setResult, setIsLoading)}
          // что бы не валидировать инпут, когда он пуст
          disabled={isInvalidInput(input, isLoading)}
        >
          Сконвертировать
        </button>
        {isLoading ? <p className="loading">Обработка...</p> : result == 0 || <p className="result">{result}</p>}
      </div>
    </div>
  );
}

function isInvalidInput(input, isLoading) {
  return input == 0 || !input || isLoading;
}
