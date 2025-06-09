export default function CurrencySelect({ value, setFunction, currencyList }) {
  return (
    <select value={value} className="dropdown" onChange={(event) => setFunction(event.target.value)}>
      {renderCurrencyOptions(currencyList)}
    </select>
  );
}

function renderCurrencyOptions(currencyList) {
  return currencyList.map(({ code, name }) => (
    <option key={code} title={`${name}`}>
      {code}
    </option>
  ));
}
