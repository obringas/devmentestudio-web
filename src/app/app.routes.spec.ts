import { routes } from './app.routes';

describe('app routes', () => {
  it('should include the main public routes', () => {
    const paths = routes.map((route) => route.path);
    expect(paths).toContain('');
    expect(paths).toContain('servicios');
    expect(paths).toContain('portfolio');
    expect(paths).toContain('nosotros');
    expect(paths).toContain('contacto');
    expect(paths).toContain('blog');
    expect(paths).toContain('terminos');
    expect(paths).toContain('privacidad');
  });

  it('should configure wildcard route redirect to home', () => {
    const wildcard = routes.find((route) => route.path === '**');
    expect(wildcard?.redirectTo).toBe('');
  });

  it('should define title and seo description for top-level routes', () => {
    const topLevel = routes.filter((route) => route.path !== '**');
    for (const route of topLevel) {
      if (route.path === 'servicios' || route.path === 'portfolio') {
        continue;
      }

      expect(route.title).toBeTruthy();
      expect(route.data?.['description']).toBeTruthy();
    }
  });
});
