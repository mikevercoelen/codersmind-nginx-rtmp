const expect = require('expect')
const app = require('./app')

describe('app', () => {
  it('should have a listen function', () => {
    expect(app).toHaveProperty('listen')
    expect(typeof app.listen).toEqual('function')
  })
})
