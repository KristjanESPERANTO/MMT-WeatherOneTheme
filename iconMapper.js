/**
 * MMT-WeatherOneTheme Icon Mapper
 * Replaces Weather-Icons font with custom SVG/PNG icons
 */

const MMTW_WEATHER_TYPE_TO_CODE = {
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
  mist: "50d"
};

window.initWeatherTheme = function (module) {
  // Icon set configuration - can be overridden in config
  const configuredIconSet = typeof module.config.iconset === "string" ? module.config.iconset.trim().toLowerCase() : "";
  let defaultIconSet = configuredIconSet || "2s";

  // Supported icon sets: mm/5a/2s/3s/2a/4af/4al (svg), 1s (png)
  const iconSets = ["mm", "1s", "5a", "2s", "3s", "2a", "4af", "4al"];
  if (!iconSets.includes(defaultIconSet)) {
    console.warn(`MMT-WeatherOneTheme: Unknown icon set "${defaultIconSet}", using 2s`);
    defaultIconSet = "2s";
  }

  const iconFormat = defaultIconSet === "1s" ? "png" : "svg";

  // Store config on module for use in update function
  module.mmtweatherIconSet = defaultIconSet;
  module.mmtweatherIconFormat = iconFormat;
};

window.updateWeatherTheme = function (module) {
  const iconSet = module.mmtweatherIconSet || "2s";
  const iconFormat = module.mmtweatherIconFormat || (iconSet === "1s" ? "png" : "svg");

  // Map the icon-font context class to the same image class the njk templates use,
  // so the existing CSS sizing rules apply instead of being overridden inline.
  const contextImageClass = {
    "mmtw-current-icon": "mmtw-current-icon-img",
    "mmtw-icon": "mmtw-icon-img",
    "mmtw-hour-icon": "mmtw-icon-img"
  };
  const context2aVariant = {
    "mmtw-current-icon-img": "mmtw-icon-img-2a-current",
    "mmtw-icon-img": "mmtw-icon-img-2a-compact"
  };

  // Keep core weather render flow intact. Without this, modules can stay on "Loading ...".
  // The callback fires once the new DOM is actually in place, so we don't have to guess a delay.
  module.updateDom(300, () => {
    const moduleElement = document.querySelector(`.module.${module.identifier}`);
    if (!moduleElement) return;

    const weatherIcons = moduleElement.querySelectorAll(".wi.weathericon");

    // Build all replacement images first (no DOM writes yet), then apply them
    // in a single pass so the browser doesn't have to reflow between icons.
    const replacements = []
    weatherIcons.forEach((icon) => {
      let wiClass
      let contextClass
      for (const cls of icon.classList) {
        if (cls.startsWith("wi-")) wiClass = cls;
        else if (cls in contextImageClass) contextClass = cls;
      }
      if (!wiClass) return;

      const weatherType = wiClass.replace("wi-", "");
      const customIconType = MMTW_WEATHER_TYPE_TO_CODE[weatherType]
        || (weatherType.match(/^(01|02|03|04|09|10|11|13|50)[dn]$/) ? weatherType : "03d");

      const iconPath = `modules/MMT-WeatherOneTheme/icons/${iconSet}/${customIconType}.${iconFormat}`;
      const imageClass = contextImageClass[contextClass] || "mmtw-icon-img";

      const img = document.createElement("img");
      img.src = iconPath;
      img.className = imageClass;
      if (iconSet === "2a" && context2aVariant[imageClass]) {
        img.classList.add(context2aVariant[imageClass]);
      }

      replacements.push([icon, img]);
    });

    for (const [icon, img] of replacements) {
      icon.replaceWith(img);
    }
  });
};
