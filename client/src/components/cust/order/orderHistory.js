import axios from 'axios';
import { useEffect, useState } from 'react';

function OrderHistory() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/customer/orderhistory', {
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
    return (
        <div>
            <h1>Order History</h1>
            <h1>{data}</h1>
        </div>
    );
}

export default OrderHistory;
