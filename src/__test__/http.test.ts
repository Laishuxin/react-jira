import { rest, RestRequest } from 'msw'
import { setupServer } from 'msw/node'
import { http } from '../api/http'
const BASE_URL = process.env.REACT_APP_API_URL

const server = setupServer()
beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('http', () => {
  const mockData = { data: 'mock' }
  const endpointForGet = '/test-http'
  const endpointForPost = '/test-http'
  const urlForGet = `${BASE_URL}${endpointForGet}`
  const urlForPost = `${BASE_URL}${endpointForPost}`

  it('should make a correct async request', async () => {
    server.use(
      rest.get(urlForGet, (req, res, context) => res(context.json(mockData))),
    )
    expect(await http(endpointForGet)).toEqual(mockData)
  })

  it('should contains correct headers', async () => {
    const token = 'fake token'
    let request: RestRequest
    server.use(
      rest.get(urlForGet, (req, res, context) => {
        request = req
        return res(context.json(mockData))
      }),
    )
    await http(endpointForGet, { token, data: mockData })
    expect(request!.method).toEqual('GET')
    expect(request!.headers.get('Authorization')).toEqual(`Bearer ${token}`)
    expect(request!.headers.get('content-type')).toEqual(`application/json`)
  })

  it('should make a correct post request', async () => {
    let request: RestRequest
    server.use(
      rest.post(urlForPost, (req, res, context) => {
        request = req
        return res(context.json(mockData))
      }),
    )
    await http(endpointForPost, { method: 'POST', data: mockData })
    expect(request!.method).toEqual('POST')
    expect(request!.body).toEqual(mockData)
  })
})
