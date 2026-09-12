import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { mapWeatherTypeToCode } from '../core/utils.mjs'

describe('mapWeatherTypeToCode', () => {
  it('should map known Weather-Icons names to OpenWeatherMap codes', () => {
    assert.equal(mapWeatherTypeToCode('day-sunny'), '01d')
    assert.equal(mapWeatherTypeToCode('night-clear'), '01n')
    assert.equal(mapWeatherTypeToCode('rain'), '10d')
    assert.equal(mapWeatherTypeToCode('night-thunderstorm'), '11n')
    assert.equal(mapWeatherTypeToCode('snow'), '13d')
    assert.equal(mapWeatherTypeToCode('fog'), '50d')
  })

  it('should pass through already-valid OpenWeatherMap codes', () => {
    assert.equal(mapWeatherTypeToCode('01d'), '01d')
    assert.equal(mapWeatherTypeToCode('13n'), '13n')
  })

  it('should fall back to the generic cloudy icon for unknown types', () => {
    assert.equal(mapWeatherTypeToCode('totally-unknown'), '03d')
    assert.equal(mapWeatherTypeToCode(''), '03d')
    assert.equal(mapWeatherTypeToCode('99d'), '03d')
  })
})
