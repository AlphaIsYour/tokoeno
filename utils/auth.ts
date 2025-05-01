// utils/auth.ts

export async function handleOAuthLogin(oauthData: {
  email: string;
  name?: string;
  image?: string;
  provider: string;
  providerId: string;
}) {
  try {
    const response = await fetch("/api/auth/oauth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(oauthData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Gagal login dengan OAuth");
    }

    return data;
  } catch (error) {
    console.error("OAuth login error:", error);
    throw error;
  }
}

// Contoh implementasi untuk login dengan Google setelah mendapatkan data dari Google API
interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export async function loginWithGoogle(googleUser: GoogleUser) {
  const oauthData = {
    email: googleUser.email,
    name: googleUser.name,
    image: googleUser.picture,
    provider: "google",
    providerId: googleUser.sub, // ID unik dari Google
  };

  return handleOAuthLogin(oauthData);
}

// Contoh implementasi untuk login tradisional
export async function loginWithEmailPassword(email: string, password: string) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login gagal");
    }

    return data;
  } catch (error) {
    console.error("Email/password login error:", error);
    throw error;
  }
}
