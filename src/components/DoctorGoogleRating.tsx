import React from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { DR_NOORI_GOOGLE_PROFILE } from "../data/config";

export function DoctorGoogleRating() {
  const profile = DR_NOORI_GOOGLE_PROFILE;
  return (
    <a className="site-google-rating" href={profile.url} target="_blank" rel="noreferrer"
      aria-label={`Dr. Noori: ${profile.rating} out of 5 from ${profile.reviewCount} Google reviews, as of ${profile.capturedOn}. Open Google profile in a new tab.`}>
      <span><Star size={16} aria-hidden="true" /><strong>{profile.rating}/5</strong> · {profile.reviewCount} Google reviews <ArrowUpRight size={14} aria-hidden="true" /></span>
      <small>Dr. Noori’s Google profile · {profile.capturedOn}</small>
    </a>
  );
}
