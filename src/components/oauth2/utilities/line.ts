// src/components/oauth2/utilities/line.ts

export const getLineToken = async (
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

    const response = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    const data = await response.json();

    if (!data?.id_token) {
      throw new Error("Failed to receive id_token from Line.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLineTokeninfo = async (idToken: string, clientId: string) => {
  try {
    const payload = new URLSearchParams({
      id_token: idToken,
      client_id: clientId,
    });

    const response = await fetch("https://api.line.me/oauth2/v2.1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    const data = await response.json();

    if (!data?.email) {
      throw new Error("Failed to receive email from Line.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
