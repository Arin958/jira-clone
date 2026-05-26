
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="bg-black py-2 px-4 rounded-md text-white cursor-pointer w-full mb-2"
      onClick={() => loginWithRedirect()}
    >
      Log In with Auth0
    </button>
  );
};

export default LoginButton;