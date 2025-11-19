export const countries = {
  us: {
    name: "United States",
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"]
  },
  ca: {
    name: "Canada", 
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Edmonton", "Ottawa"]
  },
  uk: {
    name: "United Kingdom",
    cities: ["London", "Manchester", "Birmingham", "Liverpool", "Glasgow", "Leeds"]
  },
  au: {
    name: "Australia",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra"]
  },
  de: {
    name: "Germany",
    cities: ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt", "Stuttgart"]
  },
  fr: {
    name: "France",
    cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Strasbourg"]
  },
  ps: {
    name: "Palestine",
    cities: ["Ramallah", "Gaza", "Nablus", "Hebron", "Bethlehem", "Jenin"]
  },
  eg: {
    name: "Egypt",
    cities: ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez"]
  }
};

export type CountryCode = keyof typeof countries;