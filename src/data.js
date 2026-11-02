// ▼ Edit these ▼
export const SITE_NAME = "Sara’s Gallery";
export const COUPLE_NAME = "Sara"; // Sa(noona) + Ra(hbash)
export const NAMES = ["Sanoona", "Rahbash"];
export const TAGLINE = "Our story, one frame at a time";

// Files live in /public/images (lowercase, exact .jpeg extension)
const img = (name) => `/images/${name}.jpeg`;

export const LETTER_IMAGE = img("noface"); // cover photo on the letter inside the envelope
export const HERO_IMAGE = img("childs");   // background of the hero section

// Gallery photos, shown in this order (reorder freely)
export const GALLERY = [
  "close", "face", "happy","snap", "itook", "palli", "red", "yesterday",
].map(img);

// Layout of the 8 gallery photos ("w" wide, "m" square wide, "" half-width)
export const SIZES = ["w", "", "", "w", "", "", "", ""];