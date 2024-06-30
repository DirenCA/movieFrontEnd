import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import FilmsView from '@/views/FilmsView.vue'

jest.mock('axios')

describe('FilmsView.vue', () => {
  it('adds movie to watchlist', async () => {
    const movie = { id: 1, title: 'Movie 1', imageUrl: 'url1', overview: 'Overview 1' }
    const userToken = 'mock-token'

    // Setze den Token in localStorage
    localStorage.setItem('userToken', userToken)

    // Mocke die Axios POST- und GET-Anfragen
    axios.post.mockResolvedValue({ data: { success: true } })
    axios.get.mockResolvedValue({ data: { success: true } })

    // Mount die Komponente
    const wrapper = shallowMount(FilmsView)

    // Setze den Token direkt im Wrapper
    wrapper.setData({ userToken })

    // Konsolenausgabe zur Überprüfung des Tokens
    console.log('User token in test:', wrapper.vm.userToken)

    // Rufe die Methode addToWatchlist manuell auf
    await wrapper.vm.addToWatchlist(movie)

    // Konsolenausgabe zur Überprüfung des Axios-Aufrufs
    console.log('Axios calls:', axios.post.mock.calls)

    // Überprüfe, ob axios.post mit den richtigen Argumenten aufgerufen wurde
    expect(axios.post).toHaveBeenCalledWith('/user/watchlist', movie, {
      headers: { Authorization: userToken }
    })

    // Überprüfe, ob die ID des Films zur moviesInWatchlist-Liste hinzugefügt wurde
    expect(wrapper.vm.moviesInWatchlist).toContain(movie.id)
  })
})
