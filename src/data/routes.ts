import { CARE_DEPARTMENTS, careDepartmentPath } from './careDepartments';

export const ROUTE_REDIRECTS: Record<string, string> = {
  '/book-appointment': '/doctors',
  '/conditions': '/services',
  '/treatments': '/services',
  '/hospital': '/contact',
};

// Resolve old links in one hop, retaining campaign parameters and anchors.
// HTTP hosts use the same policy in nginx.conf and public/_redirects.
export function getRouteRedirect(pathname: string, search = ''): string | undefined {
  const path = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
  let target = ROUTE_REDIRECTS[path] || path;
  let query = search;
  if (['/services', '/conditions', '/treatments'].includes(path)) {
    const params = new URLSearchParams(search);
    if (params.has('department')) {
      const department = CARE_DEPARTMENTS.find((item) => item.id === params.get('department'))
        || CARE_DEPARTMENTS[0];
      target = careDepartmentPath(department.id);
      params.delete('department');
      query = params.size ? `?${params.toString()}` : '';
    }
  }
  if (target !== pathname || query !== search) return target + query;
}
