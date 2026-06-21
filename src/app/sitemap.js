export default function sitemap() {
  const baseUrl = 'https://tapasyogacenter.com';
  const routes = [
    '',
    '/about',
    '/classes',
    '/yoga-therapy',
    '/teachers',
    '/schedule',
    '/pricing',
    '/testimonials',
    '/gallery',
    '/contact',
    '/wellness-tools',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
