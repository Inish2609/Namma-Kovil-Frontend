import * as Keychain from 'react-native-keychain';
import { jwtDecode } from 'jwt-decode';
import { handleRefreshToken } from '../services/service';

interface JwtPayload {
  exp: number;
}

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

export const scheduleRefresh = (accessToken: string) => {
  const decoded = jwtDecode<JwtPayload>(accessToken);

  const currentTime = Date.now();
  const expiryTime = decoded.exp * 1000;

  // Refresh 2 minutes before expiry
  const refreshTime = expiryTime - currentTime - 2 * 60 * 1000;

  if (refreshTimer) {
    clearTimeout(refreshTimer);
  }

  refreshTimer = setTimeout(async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'refreshToken',
      });

      if (!credentials) {
        console.log('Refresh token not found');
        return;
      }

      const response = await handleRefreshToken(credentials.password);

      const newAccessToken = response.data.accessToken;

      // Save new access token
      await Keychain.setGenericPassword(
        'user',
        newAccessToken,
        { service: 'accessToken' }
      );

      // Save new refresh token if your backend returns one
      if (response.data.refreshToken) {
        await Keychain.setGenericPassword(
          'user',
          response.data.refreshToken,
          { service: 'refreshToken' }
        );
      }

      // Schedule next refresh
      scheduleRefresh(newAccessToken);

    } catch (err) {
      console.log('Refresh token failed', err);

      // Optional: logout user here if refresh token is invalid/expired
    }
  }, Math.max(refreshTime, 0));
};