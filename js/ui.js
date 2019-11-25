class Interface {
  constructor() {
    this.init();
  }
  init() {
    this.populateCryptoCurrencySelect();
  }
  showMessage(message, classElement) {
    const div = document.createElement("div");
    div.className = classElement;
    div.appendChild(document.createTextNode(message));
    //select a message
    const divMessage = document.querySelector(".mensajes");
    divMessage.appendChild(div);
  }
  populateCryptoCurrencySelect() {
    api.getCryptoCurrency().then(res => {
      const select = document.getElementById("criptomoneda");
      for (const [key, value] of Object.entries(res.cryptoCurrency.Data)) {
        const option = document.createElement("option");
        option.value = value.Symbol;
        option.appendChild(document.createTextNode(value.CoinName));
        select.appendChild(option);
      }
    });
  }
  //print result of quote
  showResult(result, currency, cryptoCurrency) {
    const lastResult = document.querySelector('#resultado > div')
    if(lastResult){
        lastResult.remove()
    }
    const data = result[currency][cryptoCurrency];
    //building template
    const {
      FROMSYMBOL,
      PRICE,
      TOSYMBOL,
      IMAGEURL,
      CHANGEPCTDAY,
      LASTUPDATE
    } = data;
    const dateFixed = new Date(LASTUPDATE * 1000).toLocaleDateString("es-AR");
    let quoteTemplate = `
        <div class="card bg-warning">
            <div class="card-body text-light">
                <h2 class="card-title"> Result </h2>
                <p>Price of <strong>${FROMSYMBOL} </strong>  equals to 
                <strong>${PRICE.toFixed(2)} ${TOSYMBOL} </strong> 
                <img width="25" heigth="25" src=${"https://www.cryptocompare.com" +
                  IMAGEURL}>
                </p>
                <p>Last day variation %${CHANGEPCTDAY}</p>
                <p>Last update ${dateFixed}</p>
            </div>
        </div>
    `;
    console.log(quoteTemplate);

    this.toggleSpinner('block');
    setTimeout(() => {
       document.getElementById("resultado").innerHTML = quoteTemplate;
       this.toggleSpinner('none')
    }, 1000);
  }
  toggleSpinner(displayType) {
    const spinner = document.querySelector(".lds-default");
    spinner.style.display = displayType ;
  }
  
}
