const quotes = [
	{ 
		"quote" : "Nothing can dim the light that shines from within", 
		"source" : "Maya Angelou" 
	},
	{
		"quote" : "You can, you should, and if you’re brave enough to start, you will.", 
		"source" : "Stephen King"
	},
	{
		"quote" : "A problem is a chance for you to do your best.", 
		"source" : "Duke Ellington"
	},
	{
		"quote" : "The most important thing is to look ahead. The past is your anchor.", 
		"source" : "Maxime Lagacé"
	},
	{
		"quote" : "Victory is in having done your best. If you’ve done your best, you’ve won. ", 
		"source" : "Billy Bowerman"
	},
	{
		"quote" : "Positive anything is better than negative nothing. ", 
		"source" : "Elbert Hubbard"
	},
	{
		"quote" : "Everything in the universe is within you. Ask all from yourself", 
		"source" : "Rumi"
	},
	{
		"quote" : "Be the light in the dark, be the calm in the storm and be at peace while at war.", 
		"source" : "Mike Dolan"
	}
]

function randomQuote() {
  let random = quotes[Math.floor(Math.random() * quotes.length)];
  quotation.innerText = `“${random.quote}.”`;
  source.innerText = random.source;
}

randomQuote();

document.querySelector("button").addEventListener('click', randomQuote)