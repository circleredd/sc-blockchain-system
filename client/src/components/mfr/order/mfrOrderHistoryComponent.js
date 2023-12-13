import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function MfrOrderHistoryComponent({ order }) {
    // const handleClick = async () => {
    //     try {
    //         const result = await axios.get(`/customer/bomHistory/${bomId}`, {
    //             timeout: 10000,
    //             withCredentials: true,
    //         });
    //         if (bomName === '') result.data.data.push('NULL');
    //         else result.data.data.push(bomName);
    //         navigate(`/api/customer/bomHistory/${bomId}`, {
    //             state: result.data.data,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    const navigate = useNavigate();
    const handleClick = async () => {
        // try {
        //     const result = await axios.get(
        //         `/supplier/orderhistory/${order.order_id}`,
        //         {
        //             timeout: 10000,
        //             withCredentials: true,
        //         }
        //     );
        //     navigate(`/api/supplier/orderhistory/${order.order_id}`, {
        //         state: result.data.data,
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
        navigate(`/api/manufacturer/orderhistory/${order.order_id}`, {
            state: order,
        });
    };
    return (
        <div className="card" style={{ width: '18rem' }}>
            <h5 className="card-header">ID: {order.order_id}</h5>
            <div
                className="card-body"
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <div style={{ flex: 1 }}>
                    <h5 className="card-title"> {order.order_status}</h5>
                    <p className="card-text">${order.order_total}</p>
                </div>
                <button
                    className="btn btn-secondary"
                    style={{ marginBottom: '10px' }}
                    onClick={handleClick}
                >
                    詳細資料
                </button>
                {/* <button
                    className="btn btn-outline-primary"
                    // onClick={handleOrderClick}
                >
                    變更訂單狀態
                </button> */}
            </div>
        </div>
    );
}

export default MfrOrderHistoryComponent;
