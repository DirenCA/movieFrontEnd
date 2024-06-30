import { shallowMount } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import router from '@/router' // Importiere den Router direkt

describe('Navbar.vue', () => {
  it('calls logOut method and emits logout event', async () => {
    // Nutze den Router im Test
    router.push('/')
    await router.isReady()

    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [router]
      },
      propsData: { user: { userName: 'testuser' } }
    })

    const button = wrapper.find('button.btn-outline-danger')
    await button.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().logout).toBeTruthy()
    expect(wrapper.vm.$route.name).toBe('home')
  })
})
