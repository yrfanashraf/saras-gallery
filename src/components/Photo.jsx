import { useEffect, useState } from "react";

// Shows the image, or a dashed placeholder if there's no src / the file is missing.
export default function Photo({ index, src, onPick, label }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={`Photo ${index + 1}`}
        loading={index === 0 ? "eager" : "lazy"}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className="ph-empty" onClick={() => onPick(index)} role="button" tabIndex={0}>
      <b>{String(index + 1).padStart(2, "0")}</b>
      <span>{label || "Tap to add photo"}</span>
    </div>
  );
}
