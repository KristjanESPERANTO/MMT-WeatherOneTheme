import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { getContextImageClass, get2aVariantClass } from '../core/utils.mjs'

describe('getContextImageClass', () => {
  it('should map the current-weather context class', () => {
    assert.equal(getContextImageClass('mmtw-current-icon'), 'mmtw-current-icon-img')
  })

  it('should map the forecast context class', () => {
    assert.equal(getContextImageClass('mmtw-icon'), 'mmtw-icon-img')
  })

  it('should map the hourly context class', () => {
    assert.equal(getContextImageClass('mmtw-hour-icon'), 'mmtw-icon-img')
  })

  it('should default to the generic image class when context is unknown', () => {
    assert.equal(getContextImageClass(undefined), 'mmtw-icon-img')
    assert.equal(getContextImageClass('something-else'), 'mmtw-icon-img')
  })
})

describe('get2aVariantClass', () => {
  it('should return the current-icon 2a variant', () => {
    assert.equal(get2aVariantClass('mmtw-current-icon-img'), 'mmtw-icon-img-2a-current')
  })

  it('should return the compact 2a variant for the generic image class', () => {
    assert.equal(get2aVariantClass('mmtw-icon-img'), 'mmtw-icon-img-2a-compact')
  })

  it('should return undefined for an unrecognized image class', () => {
    assert.equal(get2aVariantClass('unknown'), undefined)
  })
})
