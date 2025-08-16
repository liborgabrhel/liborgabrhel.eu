import { href, redirect } from 'react-router'

export async function loader() {
  return redirect(href('/sitemap/sitemap-index.xml'), {
    status: 301,
  })
}
