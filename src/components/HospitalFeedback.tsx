import React from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { HOSPITAL_GOOGLE_PROFILE } from "../data/config";

/** Hospital listing attribution confirmed by the client; figures are a dated snapshot. */
export function HospitalFeedback() {
  const profile = HOSPITAL_GOOGLE_PROFILE;
  return <a className="site-hospital-feedback" href={profile.url} target="_blank" rel="noreferrer"
    aria-label={`Hospital Google reviews: ${profile.rating} out of 5 from ${profile.reviewCount} reviews, snapshot ${profile.capturedOn}. Business listed as ${profile.name}. Opens Google Maps in a new tab.`}>
    <span className="site-feedback-mark"><Star size={25} aria-hidden="true" /></span>
    <span>
      <span className="site-hospital-review-title">Hospital Google reviews</span>
      <span className="site-hospital-review-score"><strong>{profile.rating}/5</strong><span>{profile.reviewCount} Google reviews</span></span>
      <small>Listed as {profile.name}</small>
      <small>Snapshot · {profile.capturedOn}</small>
    </span>
    <ArrowUpRight size={22} aria-hidden="true" />
  </a>;
}
