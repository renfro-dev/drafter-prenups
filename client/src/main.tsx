import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { supabase } from "./lib/supabase";

// Handle Supabase magic-link redirect fragments manually to ensure session is stored
// Example: #access_token=...&refresh_token=...
(async () => {
  const cleanUrl = () => history.replaceState(null, "", window.location.pathname + window.location.search);

  const extractFromString = (s: string) => {
    // Handle cases like "error=...#access_token=...&refresh_token=..."
    const lastFragment = s.replace(/^#/, '').split('#').pop() || '';
    const params = new URLSearchParams(lastFragment);
    let at = params.get('access_token');
    let rt = params.get('refresh_token');

    // Fallback: regex scan in case URLSearchParams was confused by unusual formatting
    if (!at) {
      const m = lastFragment.match(/(?:^|&|#)access_token=([^&#]+)/);
      at = m ? decodeURIComponent(m[1]) : null;
    }
    if (!rt) {
      const m = lastFragment.match(/(?:^|&|#)refresh_token=([^&#]+)/);
      rt = m ? decodeURIComponent(m[1]) : null;
    }
    return { access_token: at || null, refresh_token: rt || null };
  };

  let access_token: string | null = null;
  let refresh_token: string | null = null;

  // 1) Try hash
  if (window.location.hash) {
    const creds = extractFromString(window.location.hash);
    access_token = creds.access_token;
    refresh_token = creds.refresh_token;
  }

  // 2) Try query string (some providers may use ?access_token=...)
  if ((!access_token || !refresh_token) && window.location.search) {
    const queryParams = new URLSearchParams(window.location.search);
    access_token = access_token || queryParams.get('access_token');
    refresh_token = refresh_token || queryParams.get('refresh_token');
  }

  if (access_token && refresh_token) {
    try {
      await supabase.auth.setSession({ access_token, refresh_token });
    } catch {
      // Ignore; proceed to render
    } finally {
      cleanUrl();
    }
  }

  createRoot(document.getElementById("root")!).render(<App />);
})();
