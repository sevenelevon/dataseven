import { UserProvider } from "lib/AuthContext"
import PropTypes from 'prop-types';

const Layout = ({ user, loading = false, children }) => {
    return (
        <UserProvider value={{ user, loading }}>
            {children}
        </UserProvider>
    )
}

Layout.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };
  
export default Layout