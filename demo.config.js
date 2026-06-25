const config = {
  address: "0.0.0.0",
  ipWhitelist: [],
  logLevel: ["INFO", "LOG", "WARN", "ERROR", "DEBUG"],
  customCss: "",
  modules: [
    {
      module: "weather",
      position: "top_left",
      header: "Default: Current",
      config: {
        type: "current",
        weatherProvider: "yr",
        lat: 52.52,
        lon: 13.405,
        showFeelsLike: true,
        showPrecipitationAmount: true,
        showPrecipitationProbability: true,
        showUVIndex: true,
        showHumidity: "temp",
        colored: true
      }
    },
    {
      module: "weather",
      position: "top_left",
      header: "Default: Forecast",
      config: {
        type: "forecast",
        weatherProvider: "yr",
        lat: 52.52,
        lon: 13.405,
        maxNumberOfDays: 6,
        forecastDateFormat: "dddd",
        showPrecipitationAmount: true,
        showPrecipitationProbability: true,
        showUVIndex: true,
        colored: true,
        fade: false
      }
    },
    {
      module: "weather",
      position: "top_left",
      header: "Default: Hourly",
      config: {
        type: "hourly",
        weatherProvider: "yr",
        lat: 52.52,
        lon: 13.405,
        maxEntries: 8,
        showHumidity: "wind",
        showPrecipitationAmount: true,
        showPrecipitationProbability: true,
        showUVIndex: true,
        colored: true,
        fade: false
      }
    },
    {
      module: "weather",
      position: "top_right",
      header: "Theme (4af): Current",
      config: {
        type: "current",
        weatherProvider: "yr",
        lat: 52.52,
        lon: 13.405,
        themeDir: "../../../modules/MMT-WeatherOneTheme",
        iconset: "4af",
        showFeelsLike: true,
        showPrecipitationAmount: true,
        showPrecipitationProbability: true,
        showUVIndex: true,
        showHumidity: "temp",
        colored: true
      }
    },
    {
      module: "weather",
      position: "top_right",
      header: "Theme (4af): Forecast",
      config: {
        type: "forecast",
        weatherProvider: "yr",
        lat: 52.52,
        lon: 13.405,
        themeDir: "../../../modules/MMT-WeatherOneTheme",
        iconset: "4af",
        maxNumberOfDays: 6,
        forecastDateFormat: "dddd",
        showPrecipitationAmount: true,
        showPrecipitationProbability: true,
        showUVIndex: true,
        colored: true,
        fade: false
      }
    },
    {
      module: "weather",
      position: "top_right",
      header: "Theme (4af): Hourly",
      config: {
        type: "hourly",
        weatherProvider: "yr",
        lat: 52.52,
        lon: 13.405,
        themeDir: "../../../modules/MMT-WeatherOneTheme",
        iconset: "4af",
        maxEntries: 8,
        showHumidity: "wind",
        showPrecipitationAmount: true,
        showPrecipitationProbability: true,
        showUVIndex: true,
        colored: true,
        fade: false
      }
    }
  ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
  module.exports = config;
}
