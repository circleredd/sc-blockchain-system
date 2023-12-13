import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import CustOrderTrace from './custOrderTrace';

function CustOrderDetail() {
    const [traceData, setTraceData] = useState([]);
    const [loadingTraceData, setLoadingTraceData] = useState(true);
    const navigate = useNavigate();
    const order = useLocation().state;

    const {
        customer_id,
        order_date,
        order_deliverydate,
        order_id,
        order_status,
        order_total,
        supplier_id,
        yield_rate,
    } = order;

    const handleTraceDataClick = async () => {
        try {
            const result = await axios.get(
                `/customer/orderhistory/${order.order_id}`,
                {
                    timeout: 10000,
                    withCredentials: true,
                }
            );
            setTraceData(result.data.data);
            setLoadingTraceData(false);
        } catch (error) {
            console.log(error);
            window.alert('取得訂單履歷失敗');
        }
    };

    useEffect(() => {
        console.log(traceData);
    }, [traceData]);

    const backToPrePage = () => {
        navigate('/api/customer/orderhistory');
    };

    return (
        <div>
            <div className="card m-2" style={{ width: '22rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Order ID: {order_id}</h5>
                    <p className="card-text">Order Status: {order_status}</p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            客戶 ID: {customer_id}
                        </li>
                        <li className="list-group-item">
                            下訂日期:
                            <br /> {order_date}
                        </li>
                        <li className="list-group-item">
                            交貨日期: <br />
                            {order_deliverydate}
                        </li>
                        <li className="list-group-item">
                            訂單金額: {order_total}
                        </li>
                        <li className="list-group-item">
                            供應商 ID: <br />
                            {supplier_id}
                        </li>
                        <li className="list-group-item">
                            良率要求: {yield_rate} %
                        </li>
                    </ul>
                </div>
                <div className="card-footer">
                    {/* <button
                        className="btn btn-outline-primary"
                        onClick={handleDetailClick}
                    >
                        訂單履歷
                    </button> */}
                    {/* <!-- Button trigger modal --> */}
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={handleTraceDataClick}
                    >
                        訂單履歷
                    </button>
                </div>
                <div className="card-footer">
                    <button
                        className="btn btn-outline-primary"
                        onClick={backToPrePage}
                    >
                        回到上一頁
                    </button>
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-fullscreen-md-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                訂單履歷(區塊鏈資料)
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {loadingTraceData ? null : ( // 或者其他顯示 loading 的元素
                                <CustOrderTrace traceData={traceData} />
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                關閉
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustOrderDetail;
