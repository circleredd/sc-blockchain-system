import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BomHistoryDetail from './bomHistoryDetail';

function BomHistoryComponent({ bom }) {
    const navigate = useNavigate();
    const bomId = bom.bom_id;
    const bomName = bom.bom_name;
    const bomDecs = bom.bom_desc;

    const handleClick = async () => {
        try {
            const result = await axios.get(`/customer/bomHistory/${bomId}`, {
                timeout: 10000,
                withCredentials: true,
            });
            if (bomName === '') result.data.data.push('NULL');
            else result.data.data.push(bomName);
            navigate(`/api/customer/bomHistory/${bomId}`, {
                state: result.data.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleOrderClick = async () => {
        navigate('/api/customer/ordercreate', { state: bom });
    };

    return (
        <div>
            <div className="card" style={{ width: '18rem' }}>
                <h5 className="card-header">ID: {bomId}</h5>
                <div
                    className="card-body"
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    <div style={{ flex: 1 }}>
                        <h5 className="card-title"> {bomName}</h5>
                        <p className="card-text">{bomDecs}</p>
                    </div>
                    <button
                        className="btn btn-secondary"
                        style={{ marginBottom: '10px' }}
                        onClick={handleClick}
                    >
                        詳細資料
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleOrderClick}
                    >
                        建立訂單
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BomHistoryComponent;
