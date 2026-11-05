import React from 'react';
import type { UrologyServiceItem } from '../data/config';
import { urologyServiceContent } from '../data/servicePageContent';
import { ServicePage } from './ServicePage';

export function KidneyStonePage({ service }: { service: UrologyServiceItem }) {
  return <ServicePage content={urologyServiceContent(service)} />;
}
