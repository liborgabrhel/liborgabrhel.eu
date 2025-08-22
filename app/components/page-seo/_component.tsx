import { createAbsoluteUrl } from '~/utils/create-absolute-url'
import { createTitle } from '~/utils/create-title'

type Props = {
  baseUrl: string
  pageTitle: string | undefined
  pagePath: string
  metaDescription: string | undefined
  metaRobots: string | undefined
  ogImageUrl: string | undefined
  twitterImageUrl: string | undefined
  ogType?: string
  twitterCard?: string
}

export const PageSeo = ({
  baseUrl,
  pageTitle,
  pagePath,
  metaDescription,
  metaRobots,
  ogImageUrl,
  twitterImageUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
}: Props) => {
  const title = createTitle(pageTitle)
  const absoluteUrl = createAbsoluteUrl(baseUrl, pagePath)

  return (
    <>
      <title>{title}</title>
      <meta content={metaDescription} name={'description'} />
      <meta content={metaRobots} name={'robots'} />
      <link href={absoluteUrl} rel={'canonical'} />

      {/* Open Graph Meta Tags */}
      <meta content={title} property={'og:title'} />
      <meta content={metaDescription} property={'og:description'} />
      <meta content={ogType} property={'og:type'} />
      <meta content={absoluteUrl} property={'og:url'} />
      <meta content={ogImageUrl} property={'og:image'} />

      {/* Twitter Meta Tags */}
      <meta content={twitterCard} name={'twitter:card'} />
      <meta content={title} name={'twitter:title'} />
      <meta content={metaDescription} name={'twitter:description'} />
      <meta content={twitterImageUrl} name={'twitter:image'} />
    </>
  )
}
