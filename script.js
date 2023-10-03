const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load diabetes data from the JSON file
const diabetesData = JSON.parse(fs.readFileSync('diabetes_data.json', 'utf8'));

// Function to search for information
function searchInformation(query) {
  query = query.toLowerCase();
  const results = [];

  for (const entry of diabetesData) {
    if (entry.title.toLowerCase().includes(query) || entry.content.toLowerCase().includes(query)) {
      results.push(entry);
    }
  }

  return results;
}

// CLI for user interaction
function main() {
  console.log('Welcome to the Diabetes Information Inquiry System');
  rl.question('Enter your search query: ', (query) => {
    const results = searchInformation(query);
    
    if (results.length === 0) {
      console.log('No results found.');
    } else {
      console.log('Results:');
      for (const result of results) {
        console.log(`Title: ${result.title}`);
        console.log(`Content: ${result.content}`);
        console.log('--------------------------------');
      }
    }
    
    rl.close();
  });
}

main();
