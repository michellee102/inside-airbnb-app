import '../App.css';
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated } = useAuth0();
    return (

        <nav className="navbar navbar-light bg-light shadow-sm d-flex ">
            <div className="container-fluid ">
                <a className="navbar-brand" href="#">Inside Airbnb Paris</a>
                {isAuthenticated ? (
                    <div className='container d-flex justify-content-end align-items-center'>
                        <img src={user.picture} alt={user.name} width="20px" height="20px" className='me-2' />
                        <p className='text-center p-0 m-0 me-2 text-muted'>{user.name}</p>
                        <button type="button" className="btn btn-light" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                            Log Out
                        </button>
                    </div>
                ) : (
                    <button type="button" className="btn btn-light" onClick={() => loginWithRedirect()}>Log In</button>
                )}

            </div>
        </nav>

    );
}

export default Navbar;