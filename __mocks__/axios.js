// __mocks__/axios.js
const axios = {
  // eslint-disable-next-line no-undef
  create: jest.fn(() => axios),
  // eslint-disable-next-line no-undef
  post: jest.fn(),
  // eslint-disable-next-line no-undef
  get: jest.fn(),
  // eslint-disable-next-line no-undef
  delete: jest.fn()
}

export default axios
