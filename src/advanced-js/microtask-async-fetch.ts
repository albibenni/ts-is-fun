async function fetchData() {
  console.log("Fetching data...");
  const response = await fetch(
    "https://x.com/ThePrimeagen/status/1847997426814108016"
  );

  const data = await response.text();
  console.log("Data:", data);
}

console.log("Before fetch");
fetchData();
console.log("After fetch call");
