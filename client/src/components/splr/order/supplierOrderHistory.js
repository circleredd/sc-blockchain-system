import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupplierOrderHistoryComponent from './supplierOrderHistoryComponent';

// supplier order history
function SupplierOrderHistory() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/supplier/orderhistory', {
                    timeout: 10000,
                    withCredentials: true,
                });
                setData(result.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const renderHisoryList = () =>
        data.map((order, index) => (
            <SupplierOrderHistoryComponent key={index} order={order} />
        ));

    useEffect(() => {
        console.log(data);
    }, [data]);

    const backToHome = () => {
        navigate('/api/homepage', { state: { identity: 'supplier' } });
    };

    return (
        <div>
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={backToHome}
            >
                回首頁
            </button>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {renderHisoryList()}
            </div>
        </div>
    );
}

export default SupplierOrderHistory;
