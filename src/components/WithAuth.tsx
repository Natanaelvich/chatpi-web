import { useAuth } from '@/hooks/modules/AuthContext';
import SingnIn from '@/pages';

const WithAuth = Component => {
  const { user } = useAuth();
  const Auth = props => {
    const { isLoggedIn } = props;

    if (!user) {
      return <SingnIn />;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default WithAuth;
