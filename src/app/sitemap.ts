// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticBases = [
    '',            // /
    'about',
    'products',
    'contact',
    'privacy-policies',
    'conditions-service',
    'qr',
    'account',
    'feria-artesanias',
    'feria-artesanias-terminos',
    'epoxy-floors',
    'luxury-furniture',
    'search'
  ]

  return staticBases.map(base => ({
    url: `https://sobrepoxi.com/es${base ? `/${base}` : ''}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
    alternates: {
      languages: {
        'en-us': `https://sobrepoxi.com/en${base ? `/${base}` : ''}`
      }
    }
  }))
}