// FilmsView.test.js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import FilmsView from '@/components/FilmsView.vue'
import axios from 'axios'
import flushPromises from 'flush-promises'

jest.mock('axios')

const localVue = createLocalVue()

describe('FilmsView.vue', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('fetches and displays discover films on mount', async () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1', imageUrl: 'url1', overview: 'overview1' },
      { id: 2, title: 'Movie 2', imageUrl: 'url2', overview: 'overview2' }
    ]

    axios.get.mockResolvedValueOnce({ data: mockMovies })

    const wrapper = shallowMount(FilmsView, { localVue })
    await flushPromises() // Warten Sie, bis alle Promises aufgelöst sind

    expect(axios.get).toHaveBeenCalledWith('/discover')
    expect(wrapper.vm.discoverMovies).toEqual(mockMovies)
  })

  it('adds a movie to the watchlist', async () => {
    const mockMovie = { id: 1, title: 'Movie 1', imageUrl: 'url1', overview: 'overview1' }
    axios.post.mockResolvedValueOnce({ data: { success: true } })

    const wrapper = shallowMount(FilmsView, { localVue })
    wrapper.setData({ userToken: 'test-token', discoverMovies: [mockMovie], watchlistLoaded: true })

    await wrapper.vm.addToWatchlist(mockMovie)
    await flushPromises() // Warten Sie, bis alle Promises aufgelöst sind

    expect(axios.post).toHaveBeenCalledWith('/user/watchlist', mockMovie, {
      headers: { Authorization: 'test-token' }
    })
    expect(wrapper.vm.moviesInWatchlist).toContain(mockMovie.id)
  })
})
