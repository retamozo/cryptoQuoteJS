class Api {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  async getCryptoCurrency() {
    const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}`;
    const apiFetch = await fetch(url);
    const cryptoCurrency = await apiFetch.json();
    return {
      cryptoCurrency
    };
  }
  async getValues(currency, cryptoCurrency){
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}&api_key=${this.apiKey}`
    //get data from rest api
    const converse = await fetch(url)
    const valueResult  = await converse.json()
    return {
        valueResult
    }
  }
}

