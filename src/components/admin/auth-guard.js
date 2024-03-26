import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { isJwtExpired } from 'jwt-check-expiration';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      // Prevent from calling twice in development mode with React.StrictMode enabled
      if (ignore.current) {
        return;
      }

      ignore.current = true;

      if (cookies.user_jwt !== undefined && cookies.user_jwt !== null){
        if (!isJwtExpired(cookies.user_jwt)){
          setChecked(true)
          return;
        }
      }
      router.push("/admin-panel/sign-in").then()
    },
    [router.isReady]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
