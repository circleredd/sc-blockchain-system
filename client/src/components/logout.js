import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/*
Front-end URL: '/logout'
*/

function Logout() {
    const navigate = useNavigate();

    const HandleClick = async () => {
        await axios.get('/logout', {
            timeout: 10000,
            withCredentials: true,
        });
        document.cookie =
            'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/api/login');
    };

    return (
        <div>
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={HandleClick}
            >
                Logout
            </button>
        </div>
    );
}

export default Logout;
