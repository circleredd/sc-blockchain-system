import axios from 'axios';
import { useState, useEffect } from 'react';
import Logout from './logout';
import NoPermission from '../error/noPermission';
import { useLocation, useNavigate, Link } from 'react-router-dom';

/*
Front-end URL: '/homepage'
back-end URL: '/$`role`/homepage'
*/

const handleCilck = async () => {
    console.log('click');
};

// Manufacturer
const Manufacturer = ({ data }) => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <div
                        className="alert alert-info text-center"
                        style={{ fontSize: '1.5rem' }}
                    >
                        {data}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-4 mb-2">
                    <Link to={'/api/manufacturer/orderhistory'}>
                        <button
                            className="btn btn-primary w-100"
                            onClick={handleCilck}
                        >
                            訂單查詢
                        </button>
                    </Link>
                </div>
            </div>

            {/* <div>
                <button onClick={handleCilck}>BOM表查詢</button>
            </div>
            <div>
                <button onClick={handleCilck}>允收情形</button>
            </div> */}
            <br />
        </div>
    );
};

// Customer
const Customer = ({ data }) => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <div
                        className="alert alert-info text-center"
                        style={{ fontSize: '1.5rem' }}
                    >
                        {data}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-md-4 mb-2">
                    <Link to={'/api/customer/bomcreate'}>
                        <button
                            className="btn btn-primary w-100"
                            onClick={handleCilck}
                        >
                            建立BOM表
                        </button>
                    </Link>
                </div>
                <div className="col-12 col-md-4 mb-2">
                    <Link to={'/api/customer/bomHistory'}>
                        <button
                            className="btn btn-secondary w-100"
                            onClick={handleCilck}
                        >
                            歷史BOM表
                        </button>
                    </Link>
                </div>
                <div className="col-12 col-md-4 mb-2">
                    <Link to={'/api/customer/orderhistory'}>
                        <button
                            className="btn btn-success w-100"
                            onClick={handleCilck}
                        >
                            訂單查詢
                        </button>
                    </Link>
                </div>
                {/* <div className="col-12 col-md-4 mb-2">
                    <Link to={'/api/customer/inquireorder'}>
                        <button
                            className="btn btn-info w-100"
                            onClick={handleCilck}
                        >
                            訂單查詢
                        </button>
                    </Link>
                </div>
                <div className="col-12 col-md-4 mb-2">
                    <Link to={'/api/customer/acceptance'}>
                        <button
                            className="btn btn-warning w-100"
                            onClick={handleCilck}
                        >
                            允收情形
                        </button>
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

// Supplier
const Supplier = ({ data }) => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <div
                        className="alert alert-info text-center"
                        style={{ fontSize: '1.5rem' }}
                    >
                        {data}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-4 mb-2">
                    <Link to={'/api/supplier/orderhistory'}>
                        <button
                            className="btn btn-primary w-100"
                            onClick={handleCilck}
                        >
                            訂單查詢
                        </button>
                    </Link>
                </div>
            </div>
        </div>

        // <div>
        //     <div>{data}</div>

        //     <div>
        //         <button onClick={handleCilck}>下訂單</button>
        //     </div>
        //     <div>
        //         <button onClick={handleCilck}>訂單查詢</button>
        //     </div>
        //     <div>
        //         <button onClick={handleCilck}>BOM表查詢</button>
        //     </div>
        //     <br />
        // </div>
    );
};

// fetch data from '/homepage'
const fetchData = async (role) => {
    return await axios.get(`/${role}/homepage`, {
        timeout: 10000,
        withCredentials: true,
    });
};

function Homepage() {
    //handle porps passing from login.js
    // let role = useLocation().state.identity;

    let role = useLocation().state;
    const navigate = useNavigate();
    if (!role) navigate('/api/login');
    else role = role.identity;

    if (role === '製造商') role = 'manufacturer';
    else if (role === '客戶') role = 'customer';
    else if (role === '供應商') role = 'supplier';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDataAndHandleErrors() {
            try {
                const response = await fetchData(role);
                setData(response.data.content);
                setLoading(false);
            } catch (err) {
                console.log('Error occurs when fetching data from homepage');
                console.log(err);
                setLoading(false);
            }
        }
        fetchDataAndHandleErrors();
    }, [role]); // role改變時，useEffect會重新執行

    console.log(document.cookie);

    const roleComponents = {
        manufacturer: <Manufacturer data={data} />,
        customer: <Customer data={data} />,
        supplier: <Supplier data={data} />,
    };

    if (loading) return <div>Loading...</div>;
    else if (data) {
        return (
            <div>
                {roleComponents[role] || <NoPermission />}
                <div>
                    <Logout />
                </div>
            </div>
        );
    } else return <NoPermission />;
}

export default Homepage;
