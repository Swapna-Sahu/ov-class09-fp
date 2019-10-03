const ports = [
  { name: "newpoint", lat: 51.45, depth: -11, lon: -3 },
  { name: "las palmas", lat: 28.1083, depth: -333, lon: -15.3617 },
  {
    name: "panama_anchorage_pacific",
    lat: 8.8779,
    depth: 18,
    lon: -79.505985
  },
  { name: "hellefiske", lat: 67.5, depth: -44, lon: -55 },
  { name: "hamburg", lat: 54.03813, depth: -19, lon: 8.127501 },
  { name: "santos", lat: -24.125385, depth: -24, lon: -46.290725 },
  { name: "racalada", lat: -35.61958, depth: -14, lon: -55.889475 },
  { name: "santos", lat: -24.125385, depth: -24, lon: -46.290725 },
  { name: "conakry", lat: 9.448638, depth: -10, lon: -13.7124 },
  { name: "vila_do_conde", lat: -1.0862075, depth: -22, lon: -48.481465 },
  { name: "volos_anch", lat: 39.331645, depth: -40, lon: 22.969835 },
  { name: "douala", lat: 3.7, depth: -9, lon: 9.5 },
  { name: "portland_anch", lat: 50.609335, depth: -17, lon: -2.391844 },
  { name: "milne", lat: 72.2, depth: -134, lon: -80.7 },
  { name: "rotterdam_anch", lat: 52.0584, depth: -27, lon: 3.378296 },
  { name: "las_palmas_anch", lat: 28.114495, depth: -105, lon: -15.38717 },
  { name: "rotterdam_pilot", lat: 52.028333, depth: -24, lon: 3.895 },
  { name: "douala_deep", lat: 3.82, depth: -86, lon: 8.6 },
  { name: "abidjan", lat: 5.2066895, depth: -50, lon: -4.054985 },
  { name: "gabes", lat: 34.001345, depth: -17, lon: 10.231738 },
  {
    name: "gibraltar_east_anch",
    lat: 36.131985,
    depth: -49,
    lon: -5.308113
  }
];

const vessels = [
  { id: 1, name: "Mirjam" },
  { id: 2, name: "Nord Vantage" },
  { id: 3, name: "Agrigento" },
  { id: 4, name: "Yeniser River" },
  { id: 5, name: "Serenade of the seas" },
  { id: 6, name: "Msc Meraviglia" },
  { id: 7, name: "Optimum Voyage" }
];

const optimisationType = [
  { id: 1, name: "fixed_eta" },
  { id: 2, name: "earliest_arrival" },
  { id: 3, name: "least_cost_arrival" }
];

module.exports = {
  ports,
  vessels,
  optimisationType
};