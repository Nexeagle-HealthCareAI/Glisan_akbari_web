# Service explainer videos

Videos are mapped by service ID in `src/data/config.ts` using the optional
`explainerVideo` object (`src`, `poster`, `description`). Add that object to any
remaining service to use the same player in Explore care.

- `srv-1`: `kidney-stones.mp4`, supplied as `K_Stone_Vid_Web.mp4`.
- `srv-2`: `prostate-bph.mp4`, supplied as `urine_Vid.mp4`.

Both supplied MP4 files are preserved byte for byte (H.264 video / AAC audio,
1080 × 720). Poster images are extracted separately; videos are not embedded in
JavaScript or HTML. Keep the media folder alongside `website-preview.html` when
opening the Finder preview, or serve the production `dist` folder normally.

The selected player's source is attached when it enters view. It attempts muted
inline playback once, respects reduced motion, and keeps native playback,
volume, seek and fullscreen controls. Switching services removes the old player;
leaving the viewport or hiding the browser tab pauses it.
