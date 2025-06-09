
// убрал из компонента запрос на получение списка валют 
// во первых ты его использовал 2 раза а следовательно и запрос бесмысленно дублировался.
// во вторых ui компонент должен быть тупым и делать только какую то минимальную работу что будет повышать его переиспользуемость.
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
