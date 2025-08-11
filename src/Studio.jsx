import { useEffect } from "react";

export default function StudioRedirect() {
  useEffect(() => {
    window.location.href = "https://imaginehouse.sanity.studio/";
  }, []);

  return <p>Mengalihkan ke Sanity Studio...</p>;
}
