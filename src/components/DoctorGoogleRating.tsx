import React from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { HOSPITAL_GOOGLE_PROFILE } from "../data/config";

export function DoctorGoogleRating() {
  const profile = HOSPITAL_GOOGLE_PROFILE;
  return (
    <a className="site-google-rating" href={profile.url} target="_blank" rel="noreferrer"
      aria-label={`Hospital Google reviews: ${profile.rating} out of 5 from ${profile.reviewCount} reviews, as of ${profile.capturedOn}. Business listed as ${profile.name}. Open Google profile in a new tab.`}>
      <span><Star size={16} aria-hidden="true" /><strong>{profile.rating}/5</strong> · {profile.reviewCount} Google reviews <ArrowUpRight size={14} aria-hidden="true" /></span>
      <small>Hospital Google reviews · Listed as Dr. Noori · {profile.capturedOn}</small>
    </a>
  );
}
