const journals = [
	{ 
        "journal" : "Write down 5 things that make you incredibly happy and describe why they make you feel this way."
    },
    { 
        "journal" : "What qualities about yourself do you love the most?"
    },
    { 
        "journal" : "In the next year, what are 5 improvements you would like to make regarding your life? Write about the improvements and create a plan to accomplish each one"
    },
    { 
        "journal" : "Write about your one of your happiest memories."
    },
    { 
        "journal" : "Write about the people in your life that make you feel the most “at ease” and what they do to make you feel that way."
    },
    { 
        "journal" : "Write about the last time you laughed really hard. What was so funny?"
    },
    { 
        "journal" : "Write a letter to one of your parents – even if you don’t actually give it to them."
    },
    { 
        "journal" : "In detail, describe a perfect day."
    },
    { 
        "journal" : "Write a letter to a person who has positively impacted you."
    },
    { 
        "journal" : "Write down all the compliments you can think of, that you’ve received. Write down compliments to people in your life."
    },
    { 
        "journal" : "Physically, how do you feel right now?"
    },
    { 
        "journal" : "What items/objects do you find the most comforting? Why do you think that is? What is comforting about them?"
    },
    { 
        "journal" : "If you could be anywhere in the world at this very moment, where would you want to be and why?"
    },
    { 
        "journal" : "Describe your dream house."
    },
    { 
        "journal" : "When is the last time you did something for someone else? What did you do and how did it make you feel?"
    },
    { 
        "journal" : "What are some of your favorite books? Why? Write about them."
    }
]

function randomJournal() {
  let random = journals[Math.floor(Math.random() * journals.length)];
  journal.innerText = `“${random.journal}.”`;
}

randomJournal();

document.querySelector("button").addEventListener('click', randomJournal)