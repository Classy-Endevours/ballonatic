const getQuotes = async () => {
  const response = await fetch("/quote");
  const data = await response.json();
  const quoteArea = document.getElementById("home-quote");
  console.log({ data, quoteArea });
  quoteArea.innerHTML = data.quote;
};
window.onload = (event) => {
    setInterval(function(){ getQuotes(); }, 10000);
  
};
