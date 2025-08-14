import { Welcome } from '../welcome/welcome'
import type { Route } from './+types/home'

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { content: 'Welcome to React Router!', name: 'description' },
  ]
}

export default function Home() {
  return <Welcome />
}
