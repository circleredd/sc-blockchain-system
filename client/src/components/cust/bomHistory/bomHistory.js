import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoPermission from '../../../error/noPermission';
import BomHistoryComponent from './bomHistoryComponent';

function BomHistory() {
    // 確認是否有權限, true: 有權限, false: 無權限
    const [isPermitted, setIsPermitted] = useState(false);
    // 確認是否正在載入, true: 正在載入, false: 載入完成
    const [loading, setLoading] = useState(true);
    // 從DB抓下來的BOM資料, array
    const [bomData, setBomData] = useState([]);
    const navigate = useNavigate();

    /*
    // 驗證是否登入
    useEffect(() => {
        const auth = async () => {
            try {
                await axios.get('/customer/authentication', {
                    timeout: 10000,
                    withCredentials: true,
                });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        };
        (async () => {
            const isAuth = await auth();
            setIsPermitted(isAuth);
            setLoading(false);
        })();
    }, []);
    */

    // 請求BOM資料
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/customer/bomHistory', {
                    timeout: 10000,
                    withCredentials: true,
                });
                setBomData(result.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const renderHisoryList = () =>
        bomData.map((bom, index) => (
            <BomHistoryComponent key={index} bom={bom} />
        ));

    useEffect(() => {
        console.log('bomHistory: ', bomData);
    }, [bomData]);

    const backToHome = () => {
        navigate('/api/homepage', { state: { identity: 'customer' } });
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

export default BomHistory;
