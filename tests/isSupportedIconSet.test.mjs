import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { isSupportedIconSet, SUPPORTED_ICON_SETS } from '../core/utils.mjs'

describe('isSupportedIconSet', () => {
  it('should return true for every supported icon set', () => {
    for (const iconSet of SUPPORTED_ICON_SETS) {
      assert.equal(isSupportedIconSet(iconSet), true)
    }
  })

  it('should return false for an unknown icon set', () => {
    assert.equal(isSupportedIconSet('unknown'), false)
  })

  it('should be case-sensitive', () => {
    assert.equal(isSupportedIconSet('MM'), false)
  })
})
