const api = new Api('e4e5b7ba5044823a32db3cfc211e39b93f1f57b88caa475abe1c935cfb7df111')
const ui = new Interface();
const form = document.getElementById("formulario");

form.addEventListener("submit", reqQuote);
function reqQuote(e) {
  e.preventDefault();
  const currency = document.getElementById("moneda");
  const selectedCurrency = currency.options[currency.selectedIndex].value;
  const cryptoCurrency = document.getElementById("criptomoneda");
  const selectedCryptoCurrency =
    cryptoCurrency.options[cryptoCurrency.selectedIndex].value;
  if (selectedCurrency === "" || selectedCryptoCurrency === "") {
    ui.showMessage(
      "Las opciones son obligatorias",
      "alert bg-danger text-center"
    );
    setTimeout(() => {
      document.querySelector(".mensajes").remove();
    }, 3000);
    return;
  } else {
    api.getValues(selectedCurrency,selectedCryptoCurrency)
    .then(data  => {
        console.log('data en app', data)
        ui.showResult(data.valueResult.RAW,selectedCryptoCurrency,selectedCurrency)
    })
  }
}
