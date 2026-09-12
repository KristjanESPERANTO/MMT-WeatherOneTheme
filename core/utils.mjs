/**
 * Pure utility functions for the icon mapper.
 * These functions have no side effects and can be tested independently.
 *
 * Note: iconMapper.js is loaded by MagicMirror core as a plain classic script
 * (no ES module support there), so it keeps its own inline copy of this logic
 * instead of importing this file. Keep both in sync when changing behavior.
 */

/**
 * Icon sets supported by this theme. "1s" uses PNG, all others use SVG.
 */
export const SUPPORTED_ICON_SETS = ["mm", "1s", "5a", "2s", "3s", "2a", "4af", "4al"];

/**
 * Lookup table mapping Weather-Icons font class names to OpenWeatherMap icon codes.
 */
export const MMTW_WEATHER_TYPE_TO_CODE = {
  "day-sunny": "01d",
  "night-clear": "01n",
  "day-cloudy": "02d",
  "night-alt-cloudy": "02n",
  "night-cloudy": "04n",
  "day-sunny-overcast": "02d",
  "night-alt-partly-cloudy": "02n",
  cloud: "03d",
  cloudy: "04d",
  "cloudy-windy": "04d",
  "night-alt-cloudy-windy": "04n",
  "day-showers": "09d",
  "night-alt-showers": "09n",
  "night-showers": "09n",
  showers: "09d",
  "day-sprinkle": "09d",
  "night-alt-sprinkle": "09n",
  "night-sprinkle": "09n",
  sprinkle: "09d",
  "day-rain": "10d",
  "night-alt-rain": "10n",
  "night-rain": "10n",
  rain: "10d",
  "day-rain-mix": "09d",
  "night-alt-rain-mix": "09n",
  "night-rain-mix": "09n",
  "rain-mix": "09d",
  "day-sleet": "09d",
  "night-alt-sleet": "09n",
  "night-sleet": "09n",
  sleet: "09d",
  "day-sleet-storm": "11d",
  "night-alt-sleet-storm": "11n",
  "night-sleet-storm": "11n",
  "day-storm-showers": "11d",
  "night-alt-storm-showers": "11n",
  "day-hail": "09d",
  "night-alt-hail": "09n",
  "day-thunderstorm": "11d",
  "night-alt-thunderstorm": "11n",
  "night-thunderstorm": "11n",
  "day-snow-thunderstorm": "11d",
  "night-snow-thunderstorm": "11n",
  thunderstorm: "11d",
  "day-snow": "13d",
  "night-alt-snow-wind": "13n",
  "night-alt-snow": "13n",
  "night-partly-cloudy": "02n",
  "night-snow": "13n",
  "day-snow-wind": "13d",
  "night-snow-wind": "13n",
  "snowflake-cold": "13d",
  snow: "13d",
  "day-fog": "50d",
  "night-fog": "50n",
  "day-haze": "50d",
  smoke: "50d",
  dust: "50d",
  windy: "04d",
  "strong-wind": "04d",
  fog: "50d",
  mist: "50d",
};

/**
 * Maps an icon-font context class to the image class used by the njk templates.
 */
export const CONTEXT_IMAGE_CLASS = {
  "mmtw-current-icon": "mmtw-current-icon-img",
  "mmtw-icon": "mmtw-icon-img",
  "mmtw-hour-icon": "mmtw-icon-img",
};

/**
 * Maps an image class to its "2a" icon set size variant class.
 */
export const CONTEXT_2A_VARIANT = {
  "mmtw-current-icon-img": "mmtw-icon-img-2a-current",
  "mmtw-icon-img": "mmtw-icon-img-2a-compact",
};

const OWM_ICON_CODE_PATTERN = /^(01|02|03|04|09|10|11|13|50)[dn]$/;

/**
 * Check whether an icon set name is one of the sets bundled with this theme.
 *
 * @param {string} iconSet - Icon set name to check.
 * @returns {boolean} True if supported.
 */
export function isSupportedIconSet(iconSet) {
  return SUPPORTED_ICON_SETS.includes(iconSet);
}

/**
 * Get the image file format used by an icon set.
 *
 * @param {string} iconSet - Icon set name.
 * @returns {"png"|"svg"} File format for that icon set.
 */
export function getIconFormat(iconSet) {
  return iconSet === "1s" ? "png" : "svg";
}

/**
 * Convert a Weather-Icons font class name (without the "wi-" prefix) to an
 * OpenWeatherMap icon code, falling back to a generic cloudy icon.
 *
 * @param {string} weatherType - Weather-Icons class name, e.g. "day-sunny" or "01d".
 * @returns {string} OpenWeatherMap icon code, e.g. "01d".
 */
export function mapWeatherTypeToCode(weatherType) {
  return MMTW_WEATHER_TYPE_TO_CODE[weatherType]
    || (OWM_ICON_CODE_PATTERN.test(weatherType) ? weatherType : "03d");
}

/**
 * Get the image class to use for a replacement icon, based on the original
 * icon-font context class (current/forecast/hourly).
 *
 * @param {string|undefined} contextClass - Context class found on the original icon element.
 * @returns {string} Image class name to apply.
 */
export function getContextImageClass(contextClass) {
  return CONTEXT_IMAGE_CLASS[contextClass] || "mmtw-icon-img";
}

/**
 * Get the "2a" icon set size variant class for an image class, if any.
 *
 * @param {string} imageClass - Image class as returned by getContextImageClass.
 * @returns {string|undefined} The variant class, or undefined if none applies.
 */
export function get2aVariantClass(imageClass) {
  return CONTEXT_2A_VARIANT[imageClass];
}

/**
 * Build the path to an icon asset within this theme.
 *
 * @param {string} iconSet - Icon set name.
 * @param {string} iconFormat - File format ("png" or "svg").
 * @param {string} customIconType - OpenWeatherMap icon code, e.g. "01d".
 * @returns {string} Relative path to the icon asset.
 */
export function buildIconPath(iconSet, iconFormat, customIconType) {
  return `modules/MMT-WeatherOneTheme/icons/${iconSet}/${customIconType}.${iconFormat}`;
}

/**
 * Find the Weather-Icons type class (e.g. "wi-day-sunny") and the context
 * class (e.g. "mmtw-current-icon") within a list of class names, in a single pass.
 *
 * @param {Iterable<string>} classList - Class names of the original icon element.
 * @returns {{wiClass: string|undefined, contextClass: string|undefined}} The classes found, if any.
 */
export function extractIconClasses(classList) {
  let wiClass;
  let contextClass;
  for (const cls of classList) {
    if (cls.startsWith("wi-")) wiClass = cls;
    else if (cls in CONTEXT_IMAGE_CLASS) contextClass = cls;
  }
  return { wiClass, contextClass };
}
