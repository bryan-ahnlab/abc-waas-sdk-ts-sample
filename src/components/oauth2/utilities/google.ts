// src/components/oauth2/utilities/google.ts

export const getGoogleToken = async (
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
) => {
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    const data = await response.json();

    if (!data?.id_token) {
      throw new Error("Failed to receive id_token from Google.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGoogleTokeninfo = async (idToken: string) => {
  try {
    const payload = new URLSearchParams({
      idToken,
    });

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/tokeninfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      }
    );

    const data = await response.json();

    if (!data?.email) {
      throw new Error("Failed to receive email from Google.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
