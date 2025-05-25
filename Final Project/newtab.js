fetch("assets/quotes.json")
  .then(response => response.json())
  .then(data => {
    const quote = data[Math.floor(Math.random() * data.length)];
    document.getElementById("quote").innerText = quote;
  });