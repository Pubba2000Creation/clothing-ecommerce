
import { useAuth } from '../context/useAuth';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="navbar">
            <Link to="/">Clothing Store</Link>
            <div>
                <Link to="/cart">Cart</Link>

                {isAuthenticated ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
