//TOP OF FILE ROUTE FOR FRONT-END TO REQUEST DATA FROM
const { animals } = require('./data/animals');

//REQUIRE EXPRESS.JS AT THE TOP OF THIS SERVER.JS FILE
const express = require('express');

//ALLOW FOR DIFFERENT PORTS- GO TO BO PG- ADJUST LISTEN
const PORT = process.env.PORT || 3001;

//INSTANTIATE THE SERVER-ASSIGN EXPRESS() TO THE APP VARIABLE
const app = express();


//TEST THE ABOVE RUNNING THE FOLLOWING IN THE URL FOR LOCALHOST:3001 personalityTraits=hungry&personalityTraits=zany




function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      // Save personalityTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
  }

//BELOW IS THE FIRST FILTERBYQUERY FUNCTION - ABOVE IS THE SECOND THAT ALLOWS MORE PARAMETERS TO BE FILTERED
// function filterByQuery(query, animalsArray) {
//     let filteredResults = animalsArray;
//     if (query.diet) {
//       filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
//     }
//     if (query.species) {
//       filteredResults = filteredResults.filter(animal => animal.species === query.species);
//     }
//     if (query.name) {
//       filteredResults = filteredResults.filter(animal => animal.name === query.name);
//     }
//     return filteredResults;
//   }
//ABOVE IS THE FILTERBYQUERY() FUNCTION TO NOT RUN ALL OF THE FILTERING INSIDE THE GET() METHOD BELOW. IT TAKES IN THE REQ.QUERY AS AN ARGUMENT AND FILTERS THROUGH THE ANIMAL ARRAY OF OBJECTS AND RETURNS BACK A FILTERED ARRAY.

//BELOW ADDS THE ROUTE IT IS A GET() METHOD THAT REQUIRES A STRING DESCRIBING THE FETCH FROM ROUTE AND THE SECOND IS A CALLBACK FUNCTION EACH REQUEST HAS A RESPONSE THAT USES THE SEND() METHOD- HERE IT SENDS 'HELLO'.
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query,results);
    }
    // console.log(req.query)
    // res.send('Hello');
    // res.json(animals);
    res.json(results);
});

//TEST QUERY  http://localhost:3001/api/animals?name=Erica BROWSER RESULTS SHOULD PRINT AN OBJECT WITH THE PROPERTY NAME AND A VALUE OF ERICA.  IT DEMONSTRATES TAKING THE QUERY PARAMETER AND TURNING IT INTO A JSON - ANY STRING OF QUERY PARAMETERS USED ON THE URL WILL BECOME JSON - SO ?A=111&B=222&C=333 BECOMES:
// {
//     a: "111",
//     b: "222",
//     c: "333"
// }



//CHAIN THE LISTEN() METHOD ONTO OUR SERVER HERE AT THE ENDE OF SERVER.JS FILE
// app.listen(3001, () => {
//     console.log(`API server now on port 3001`);
// });

// THE ABOVE IS TOO LIMITED- BELOW OPENS UP THE APP TO MANY PORTS FOR DEVELOPMENT- MAY COME BACK AND LIMIT UPON DEPLOYMENT
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});


