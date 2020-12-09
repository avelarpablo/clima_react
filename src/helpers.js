// Función que recibe temperatura en kelvin y la devuelve en centígrados
export function obtenerCentigrados(kelvin) {
  return parseFloat(kelvin - 273.15, 10).toFixed(2);
}