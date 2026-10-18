import { browser } from '$app/env';
import { goto } from '$app/navigation';

/** Navigates to `path` unless already there, replacing history state. No-op outside the browser. */
export function navigateTo(path: string | null) {
  if (!browser || !path) return;
  if (window.location.pathname === path) return;
  goto(path, { replace: true, reset: false });
}
