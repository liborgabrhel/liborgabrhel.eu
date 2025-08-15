import { SITE_NAME } from '~/constants/site'

export const createTitle = (title: string | undefined) => {
  return title ? `${title.trim()} | ${SITE_NAME}` : SITE_NAME
}
