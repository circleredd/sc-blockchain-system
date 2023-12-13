import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../../logout';
import NoPermission from '../../../error/noPermission';

import EletroincComponents from './electronicComponents';
import { Link } from 'react-router-dom';

// 驗證是否登入
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

function BomCreate() {
    const data = {
        電阻: 15,
        電容: 10,
        電晶: 30,
        二極體: 50,
        光耦合器: 10,
    };
    const [isPermitted, setIsPermitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(1); // 想要呈現的元件數量
    // 定义一个状态来跟踪每个元件的选择
    const [selectedComponents, setSelectedComponents] = useState({});

    // 在这个函数中更新父组件的状态
    const handleComponentChange = (index, component) => {
        setSelectedComponents((prev) => ({
            ...prev,
            [index]: component,
        }));
        console.log(selectedComponents);
    };

    // const renderedSelect = Array.from({ length: number }, (_, index) => (
    //     <EletroincComponents key={index} />
    // ));

    const renderedSelect = [...Array(number)].map((_, index) => (
        <EletroincComponents
            key={index}
            index={index}
            data={data}
            selectedComponent={selectedComponents[index]}
            onComponentChange={handleComponentChange}
        />
    ));

    useEffect(() => {
        auth().then((result) => {
            setIsPermitted(result);
            setLoading(false);
        });
    }, []);
    const navigate = useNavigate();

    const handleClick = () => {
        setNumber(number + 1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('submit');
        try {
            await axios.post('/customer/bomCreate', selectedComponents, {
                timeout: 10000,
                withCredentials: true,
            });
        } catch (err) {
            console.log(err);
        }
        navigate('/api/homepage', { state: { identity: 'customer' } });
    };

    const backToHome = () => {
        navigate('/api/homepage', { state: { identity: 'customer' } });
    };

    if (loading) return <div>Loading...</div>;
    else if (!isPermitted) {
        return <NoPermission />;
    } else {
        return (
            <div>
                <label>元件：</label>
                {renderedSelect}
                <div>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleClick}
                    >
                        增加元件
                    </button>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            className="btn btn-outline-success"
                        >
                            確認送出
                        </button>
                    </form>
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={backToHome}
                    >
                        回首頁
                    </button>
                </div>
            </div>
        );
    }
}

export default BomCreate;
