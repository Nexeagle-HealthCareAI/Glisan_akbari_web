import { CARE_DEPARTMENTS, careDepartmentPath } from './careDepartments';

export const ROUTE_REDIRECTS: Record<string, string> = {
  '/services': '/services/urologist-in-purnia',
  '/book-appointment': '/doctors',
  '/conditions': '/services/urologist-in-purnia',
  '/treatments': '/services/urologist-in-purnia',
  '/hospital': '/contact',
  '/services/kidney-stone-laser-surgery-pcnl-ursl-rirs': '/services/kidney-stone-treatment-in-purnia',
  '/services/prostate-enlargement-bph-treatment': '/services/prostate-treatment-in-purnia',
  '/services/urinary-tract-infection-uti-hematuria-care': '/services/urine-infection-treatment-in-purnia',
  '/services/male-infertility-varicocele-repair': '/services/male-infertility-treatment-in-purnia',
  '/services/erectile-dysfunction-penile-implants': '/services/erectile-dysfunction-treatment-in-purnia',

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
