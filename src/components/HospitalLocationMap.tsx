import React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { DR_NOORI_GOOGLE_PROFILE, HOSPITAL_PROFILE } from "../data/config";

export function HospitalLocationMap() {
  return (
    <div className="site-hospital-map">
      <iframe src={DR_NOORI_GOOGLE_PROFILE.embedUrl} title="Hospital location on Google Maps"
        loading="lazy" referrerPolicy="no-referrer-when-downgrade" tabIndex={-1} aria-hidden="true" />
      <a className="site-map-directions" href={HOSPITAL_PROFILE.googleMapsUrl} target="_blank" rel="noreferrer"
        aria-label={`Get directions to ${HOSPITAL_PROFILE.address.fullFormatted} in Google Maps (opens in a new tab)`}>
        <span className="site-map-open"><span className="site-location-pulse"><MapPin size={20} aria-hidden="true" /></span> Open Google Maps <ArrowUpRight size={17} aria-hidden="true" /></span>
        <span className="sr-only">{HOSPITAL_PROFILE.address.fullFormatted}</span>
      </a>
    </div>
  );
}
