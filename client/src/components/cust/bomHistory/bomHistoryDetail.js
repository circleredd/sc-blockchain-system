import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function BomHistoryDetail() {
    const navigate = useNavigate();
    let detailData = useLocation().state;
    console.log('detail:', detailData);
    const bomName = detailData.pop();

    const listItems = detailData.map((item) => (
        <li key={item.bom_component_id}>
            {item.component_name} * {item.bom_component_quantity}
        </li>
    ));

    const backPrePage = () => {
        navigate('/api/customer/bomHistory');
    };

    return (
        <div>
            <div>
                <h4>{bomName}</h4>
                <h5>{listItems}</h5>
            </div>
            <div>
                <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={backPrePage}
                >
                    回上一頁
                </button>
            </div>
        </div>
    );
}

export default BomHistoryDetail;
