import { browser } from '$app/environment';
import { goto } from '$app/navigation';

/** Navigates to `path` unless already there, replacing history state. No-op outside the browser. */
export function navigateTo(path: string | null) {
  if (!browser || !path) return;
  if (window.location.pathname === path) return;
  goto(path, { replaceState: true, keepFocus: true });
}
