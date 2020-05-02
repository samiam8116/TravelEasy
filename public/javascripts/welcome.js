var prevQuoteIndex = 0,
  randomQuotes = [{
    quote: "Hey!",
  }, {
    quote: "Welcome aboard",
  }, {
    quote: "Ahoy!",
  }, {
    quote: "Bonjour",
  }, {
    quote: "Hello",
  }, {
    quote: "Hola",
  }, {
    quote: "Salve",
}, {
    quote: "Guten Tag",
}, {
    quote: "Hi",
}, {
    quote: "Whats up?",
}, {
    quote: "Olá",
}, {
    quote: "Nǐn hǎo",
  }, {

  }]

function getNewQuote() {
  var randomQuoteIndex = 0;

  function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  randomQuoteIndex = getRandomRange(0, randomQuotes.length);

  //function to avoid getting same quote twice in a row
  while (randomQuoteIndex === prevQuoteIndex) {
    randomQuoteIndex = getRandomRange(0, randomQuotes.length);
  }
  prevQuoteIndex = randomQuoteIndex;

  document.getElementById('quote').innerHTML = randomQuotes[randomQuoteIndex].quote;
  document.getElementById('character').innerHTML = '<i>' + randomQuotes[randomQuoteIndex].character + '</i>'
}

document.addEventListener('DOMContentLoaded', getNewQuote);
document.getElementById('new-quote-button').addEventListener('click', getNewQuote);
document.getElementById('twitter-button').addEventListener('click', shareTwitter);