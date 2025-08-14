import { Welcome } from '~/welcome/welcome'
import type { Route } from './+types/home'

export function meta({ loaderData }: Route.MetaArgs) {
  console.log('Meta function called with data:', loaderData)

  return [
    { title: 'New React Router App' },
    { content: 'Welcome to React Router!', name: 'description' },
  ]
}

export default function Home() {
  return <Welcome />
}
