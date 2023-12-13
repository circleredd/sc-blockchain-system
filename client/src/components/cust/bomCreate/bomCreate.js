import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../../logout';
import NoPermission from '../../../error/noPermission';

import EletroincComponents from './electronicComponents';
import { Link } from 'react-router-dom';

function BomCreate() {
    // 確認是否有權限, true: 有權限, false: 無權限
    const [isPermitted, setIsPermitted] = useState(false);
    // 確認是否正在載入, true: 正在載入, false: 載入完成
    const [loading, setLoading] = useState(true);
    // 顯示在畫面上的選項數量
    const [number, setNumber] = useState(1);
    // 從DB抓下來的元件資料用於選項中, array
    const [components, setComponents] = useState([]);
    //
    const [renderedSelect, setRenderedSelect] = useState([]);
    // bomName
    const [bomName, setBomName] = useState('');
    // 最終要送出的BOM元件資料, array
    const [selectedComponents, setSelectedComponents] = useState([]);
    const navigate = useNavigate();

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // 接收從子元件傳來的資料
    const handleComponentChange = (index, id, component, quantity) => {
        if (components.length === 0) {
            return;
        }

        setSelectedComponents((prevComponents) => {
            const newComponents = [...prevComponents];
            if (newComponents.length > index) {
                newComponents[index] = {
                    id,
                    component,
                    quantity,
                };
            } else {
                newComponents.push({
                    id,
                    component,
                    quantity,
                });
            }

            return newComponents;
        });
    };

    useEffect(() => {
        console.log('After', selectedComponents);
    }, [selectedComponents]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/customer/requirecomponents', {
                    timeout: 10000,
                    withCredentials: true,
                });
                setComponents(result.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [number]);
    /*
    useEffect(() => {
        // 確保components已載入後再建立選項
        if (components.length > 0) {
            setRenderedSelect(
                Array.from({ length: number }, (_, index) => (
                    <EletroincComponents
                        key={index}
                        index={index}
                        data={components}
                        onComponentChange={handleComponentChange}
                        deleteComponent={deleteComponent}
                    />
                ))
            );
        }
    }, [number, components]); // 依賴 number 和 components 的改變
*/

    useEffect(() => {
        setRenderedSelect(
            selectedComponents.map((component, index) => (
                <EletroincComponents
                    key={index}
                    index={index}
                    data={components}
                    onComponentChange={handleComponentChange}
                    deleteComponent={() => deleteComponent(index)}
                    selectedComponent={component}
                />
            ))
        );
    }, [selectedComponents, components]); // 依賴於 selectedComponents 和 components 的變化

    const handleClick = async () => {
        if (components.length === 0) {
            console.log('Components are not loaded yet.');
            return;
        }
        setSelectedComponents((prevComponents) => {
            const newComponents = [...prevComponents];
            newComponents.push({
                id: components[0].component_id,
                component: components[0].component_name,
                quantity: 1,
            });
            return newComponents;
        });
        setNumber(number + 1);
    };

    const deleteComponent = (index) => {
        console.log('before:', selectedComponents);
        setSelectedComponents((prevComponents) => {
            const newComponents = [...prevComponents];
            newComponents.splice(index, 1);
            return newComponents;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (bomName === '') {
            alert('請輸入bom表名稱');
            return;
        } else if (selectedComponents.length === 0) {
            alert('請至少選擇一個元件');
            return;
        }

        // 將bomName加入送給server端資料array的最後一個元素
        const componentsToSend = [...selectedComponents, { bomName }];
        try {
            /*selectedComponents = [{ id: 1, component: '電阻a', quantity: '5' }, ...] */
            await axios.post('/customer/bomCreate', componentsToSend, {
                timeout: 10000,
                withCredentials: true,
            });
        } catch (err) {
            console.log(err);
        }
        console.log('submit');
        navigate('/api/homepage', { state: { identity: 'customer' } });
    };

    const backToHome = () => {
        navigate('/api/homepage', { state: { identity: 'customer' } });
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setBomName(value);
    };

    if (loading) return <div>Loading...</div>;
    else if (!isPermitted) {
        return <NoPermission />;
    } else {
        return (
            <div>
                <div>
                    <label>bom表名稱:</label>
                    <br />
                    <input
                        type="text"
                        name="bomName"
                        onChange={handleChange}
                        value={bomName}
                    />
                </div>
                {/* <div>
                    <label>bom表說明:</label>
                    <br />
                    <input
                        type="text"
                        name="bomDescription"
                        onChange={handleChange}
                        value={bomName}
                    />
                </div> */}
                <div>
                    <label>元件：</label>
                    {components.length > 0 && // 確保選項data不是空的
                        renderedSelect}
                    <div>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={handleClick}
                        >
                            增加元件
                        </button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div></div>
                    <form onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            className="btn btn-outline-success"
                        >
                            確認送出
                        </button>
                    </form>
                </div>
                <br />
                <br />
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
