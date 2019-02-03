const initState = {
  cities: [
    { id: "1", city: "Barcelona", country: "Spain", url: "barcelona" },
    {
      id: "2",
      city: "Rio de Janeiro",
      country: "Brazil",
      url: "rio_de_janeiro"
    },
    { id: "3", city: "Miami", country: "USA", url: "miami" },
    { id: "4", city: "Honolulu", country: "USA", url: "honolulu" },
    { id: "5", city: "Sydney", country: "Australia", url: "sydney" },
    { id: "6", city: "Hong Kong", country: "China", url: "hong_kong" },
    { id: "7", city: "Cape Town", country: "South Africa", url: "cape_town" },
    { id: "8", city: "Santa Monica", country: "USA", url: "santa_monica" },
    { id: "9", city: "Nice", country: "France", url: "nice" },
    { id: "10", city: "Cancun", country: "Mexico", url: "cancun" },
    { id: "11", city: "Santorini", country: "Greece", url: "santorini" },
    { id: "12", city: "Amalfi", country: "Italy", url: "amalfi" },
    { id: "13", city: "Máncora", country: "Peru", url: "mancora" },
    { id: "14", city: "Tulum", country: "Mexico", url: "tulum" },
    { id: "15", city: "Florianópolis", country: "Brazil", url: "florianopolis" }
  ]
};

const rootReducer = (state = initState, action) => {
  return state;
};

export default rootReducer;
