// src/components/oauth2/utilities/naver.ts

export const getNaverToken = async (
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

    /* https://nid.naver.com/oauth2.0/token */
    const response = await fetch("/proxy/naver/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    const data = await response.json();

    if (!data?.access_token) {
      throw new Error("Failed to receive access_token from Naver.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNaverTokeninfo = async (accessToken: string) => {
  try {
    /* https://openapi.naver.com/v1/nid/me */
    const response = await fetch("/proxy/naver/tokeninfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!data?.message || data?.message !== "success") {
      throw new Error("Failed to receive message from Naver.");
    }

    if (!data?.resultcode || data?.resultcode !== "00") {
      throw new Error("Failed to receive resultcode from Naver.");
    }

    if (!data?.response?.email) {
      throw new Error("Failed to receive email from Naver.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
