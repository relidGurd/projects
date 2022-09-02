export async function getFilmAtributes(atrUrlMasPlanets, atrUrlMasSpecies) {
  [atrUrlMasPlanets, atrUrlMasSpecies] = await Promise.all([
    atrUrlMasPlanets.map((res) => fetch(res).then((x) => x.json())),
    atrUrlMasSpecies.map((res) => fetch(res).then((x) => x.json())),
  ]);

  const planets = await atrUrlMasPlanets;
  const species = await atrUrlMasSpecies;

  // planets.forEach((planet) => {
  //   planet.then((objPlanet) => (objPlanet));
  // });

  // species.forEach((specie) => {
  //   specie.then((objspecie) =>(objspecie));
  // });

  return [planets, species];
}
