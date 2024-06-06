import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import SearchResultsView from '@/views/SearchResultsView.vue'
import WatchlistView from '@/views/WatchlistView.vue'
import FilmsView from '@/views/FilmsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: FilmsView // Änderung hier
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/search/:query',
    name: 'search-results',
    component: SearchResultsView
  },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: WatchlistView
  },
  {
    path: '/films',
    name: 'films',
    component: FilmsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
