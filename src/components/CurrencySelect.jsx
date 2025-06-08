import { useState, useEffect } from "react";

const DEV_API = "https://api.frankfurter.dev/v1/";

export default function CurrencySelect({ value, setFunction, setIsLoading }) {
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    getCurrencies()
      .then(setCurrencyList)
      .catch(() => alert("Ошибка получения валют"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <select value={value} className="dropdown" onChange={(event) => setFunction(event.target.value)}>
      {renderCurrencyOptions(currencyList)}
    </select>
  );
}

async function getCurrencies() {
  const response = await fetch(`${DEV_API}currencies`);
  const data = await response.json();
  return Object.entries(data).map(([code, name]) => ({ code, name }));
}

function renderCurrencyOptions(currencyList) {
  return currencyList.map(({ code, name }) => (
    <option key={code} title={`${name}`}>
      {code}
    </option>
  ));
}
