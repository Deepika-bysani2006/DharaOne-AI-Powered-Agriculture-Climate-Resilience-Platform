const errorMessages = {
  "auth/account-exists-with-different-credential":
    "An account already exists with this email. Try signing in with your original method.",
  "auth/email-already-in-use": "This email is already registered. Please sign in instead.",
  "auth/invalid-credential": "Your email or password is incorrect. Please try again.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/network-request-failed": "The network is unavailable. Check your connection and try again.",
  "auth/operation-not-allowed": "This sign-in method is not enabled yet. Enable it in Firebase Authentication before trying again.",
  "auth/configuration-not-found": "Firebase Authentication is not configured for this project yet.",
  "auth/unauthorized-domain": "This domain is not authorized for Google sign-in. Add 127.0.0.1 in Firebase Authentication authorized domains.",
  "auth/popup-blocked": "Your browser blocked the Google sign-in window. Allow popups for this site and try again.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled before it finished.",
  "auth/cancelled-popup-request": "Another Google sign-in window is already open.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/user-not-found": "No DharaOne account was found for that email.",
  "auth/weak-password": "Use a stronger password with at least 8 characters.",
  "auth/wrong-password": "Your email or password is incorrect. Please try again.",
};

export function getFriendlyAuthError(error) {
  return errorMessages[error?.code] || `Authentication failed: ${error?.code || "unknown error"}. Please try again.`;
}
