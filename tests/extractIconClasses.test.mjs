import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { extractIconClasses } from '../core/utils.mjs'

describe('extractIconClasses', () => {
  it('should find both the weather-icon class and the context class', () => {
    const result = extractIconClasses(['wi', 'weathericon', 'wi-day-sunny', 'mmtw-current-icon'])
    assert.equal(result.wiClass, 'wi-day-sunny')
    assert.equal(result.contextClass, 'mmtw-current-icon')
  })

  it('should return undefined for missing classes', () => {
    const result = extractIconClasses(['wi', 'weathericon'])
    assert.equal(result.wiClass, undefined)
    assert.equal(result.contextClass, undefined)
  })

  it('should work with the forecast and hourly context classes', () => {
    assert.equal(extractIconClasses(['mmtw-icon']).contextClass, 'mmtw-icon')
    assert.equal(extractIconClasses(['mmtw-hour-icon']).contextClass, 'mmtw-hour-icon')
  })
})
