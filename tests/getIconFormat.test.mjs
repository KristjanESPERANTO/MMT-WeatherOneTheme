import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { getIconFormat } from '../core/utils.mjs'

describe('getIconFormat', () => {
  it('should return png for the 1s icon set', () => {
    assert.equal(getIconFormat('1s'), 'png')
  })

  it('should return svg for every other icon set', () => {
    assert.equal(getIconFormat('mm'), 'svg')
    assert.equal(getIconFormat('5a'), 'svg')
    assert.equal(getIconFormat('2s'), 'svg')
    assert.equal(getIconFormat('2a'), 'svg')
  })
})
