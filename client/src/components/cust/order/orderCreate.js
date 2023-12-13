import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// const opt = window.confirm('確定要建立訂單嗎?');
// if (!opt) return;
// try {
//     const result = await axios.post(`/customer/ordercreate/${bomId}`, '1', {
//         timeout: 10000,
//         withCredentials: true,
//     });
//     console.log(result);
// } catch (error) {
//     console.log(error);
// }
function OrderCreate() {
    const bom = useLocation().state;
    const [price, setPrice] = useState(0);
    const [yieldRequirement, setYieldRequirement] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const navigate = useNavigate();

    const handleYieldRequirementChange = (event) => {
        setYieldRequirement(event.target.value);
        if (event.target.value > 100 || event.target.value < 0) {
            alert('請輸入0~100之間的數字');
            setYieldRequirement(0);
        }
    };

    const handleDeliveryDateChange = (event) => {
        setDeliveryDate(event.target.value);
    };

    const handleGetPrice = () => {
        setPrice(Math.floor(Math.random() * 850000) + 150000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const opt = window.confirm('確定要建立訂單嗎?');
        if (!opt) return;

        console.log('BOM表ID:', bom.bom_id);
        console.log('良率要求:', yieldRequirement);
        console.log('交貨日期:', deliveryDate);
        const order = {
            bomId: bom.bom_id,
            yieldRate: yieldRequirement,
            deliveryDate: deliveryDate,
            total: price,
        };
        try {
            // bomID, yieldRate, deliveryDate, totalPrice
            await axios.post('/customer/ordercreate', order, {
                timeout: 10000,
                withCredentials: true,
            });
            navigate('/api/customer/bomHistory');
        } catch (err) {
            console.log(err);
        }
    };

    const backPrePage = () => {
        navigate('/api/customer/bomHistory');
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">
                        BOM表ID:
                        <input
                            className="form-control"
                            type="text"
                            value={bom.bom_id}
                            disabled
                        />
                    </label>
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        BOM表名稱:
                        <input
                            className="form-control"
                            type="text"
                            value={bom.bom_name}
                            disabled
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        訂單金額(NTD):
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={handleGetPrice}
                        >
                            取得報價
                        </button>
                        <input
                            className="form-control"
                            type="number"
                            disabled
                            value={price}
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        良率要求(%):
                        <input
                            className="form-control"
                            type="number"
                            value={yieldRequirement}
                            onChange={handleYieldRequirementChange}
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        交貨日期:
                        <input
                            className="form-control"
                            type="date"
                            value={deliveryDate}
                            onChange={handleDeliveryDateChange}
                        />
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">
                    確認訂單
                </button>
            </form>
            <button
                type="button"
                className="btn btn-outline-info"
                onClick={backPrePage}
            >
                回上一頁
            </button>
        </div>
    );
}

export default OrderCreate;
