import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.attraction.shortName,
    short_name: 'Salinas y Arenales',
    description:
      'Guía del visitante del Parque Regional de las Salinas y Arenales de San Pedro del Pinatar (Región de Murcia, España).',
    id: siteConfig.baseUrl + '/',
    start_url: '/es',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#faf8f4',
    theme_color: '#3a7a8d',
    lang: 'es',
    categories: ['travel', 'nature', 'tourism'],
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
