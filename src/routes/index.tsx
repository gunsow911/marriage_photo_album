import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import PhotoViewer from '../components/PhotoSwiper'
import { photos } from '../data/albums'

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <PhotoViewer photos={photos} />,
})
