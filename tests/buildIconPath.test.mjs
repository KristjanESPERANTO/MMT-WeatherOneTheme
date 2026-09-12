import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { buildIconPath } from '../core/utils.mjs'

describe('buildIconPath', () => {
  it('should build the expected relative path', () => {
    assert.equal(
      buildIconPath('2s', 'svg', '01d'),
      'modules/MMT-WeatherOneTheme/icons/2s/01d.svg',
    )
  })

  it('should reflect the given icon set, format and code', () => {
    assert.equal(
      buildIconPath('1s', 'png', '13n'),
      'modules/MMT-WeatherOneTheme/icons/1s/13n.png',
    )
  })
})
