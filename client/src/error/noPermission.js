import { Link } from 'react-router-dom';

function noPermission() {
    return (
        <div>
            <div>
                <h2>No Permission</h2>
                <p>
                    Sorry, Please log in with another account or just log in
                    again.
                </p>
            </div>
            <div>
                <Link to={'/api/login'}>
                    <button>重新登入</button>
                </Link>
            </div>
        </div>
    );
}

export default noPermission;
