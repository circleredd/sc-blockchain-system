import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

/*
Front-end URL: '/signup'
*/

const fetchData = async () => {
    try {
        const response = await axios.get('/test', {
            withCredentials: true,
        }); // 後端的地址
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

function Sign() {
    const [data, setData] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        passwordConfirm: '',
        identity: '製造商',
        publicAddress: '',
    });
    const navigate = useNavigate('/api/login');

    useEffect(() => {
        fetchData()
            .then((result) => setData(result))
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // onCreate(); //pass from props
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        try {
            // 請求metamask帳戶許可
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            formData.publicAddress = accounts[0];
        } catch (err) {
            console.log('MetaMask Error:', err);
        }
        // console.log(
        //     formData.name,
        //     formData.password,
        //     formData.passwordConfirm,
        //     formData.identity,
        //     formData.publicAddress
        // );

        try {
            console.log('發送請求到伺服器...');
            const response = await axios.post('/signup', formData, {
                timeout: 10000,
                withCredentials: true,
            });
            console.log('Success', response.data);
            alert('註冊成功');
            // console.log(response.headers['authorization']);
        } catch (error) {
            console.error('Fail', error);
            alert('註冊失敗');
            return;
        }
        navigate('/api/login');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // return (
    //     <div>
    //         <div>{data.time}</div>
    //         <div>
    //             <h2>註冊</h2>
    //             <form onSubmit={handleSubmit}>
    //                 <label>
    //                     名字：
    //                     <input
    //                         type="text"
    //                         name="name"
    //                         value={formData.name}
    //                         onChange={handleChange}
    //                     />
    //                 </label>
    //                 <br />
    //                 <label>
    //                     密碼：
    //                     <input
    //                         type="password"
    //                         name="password"
    //                         value={formData.password}
    //                         onChange={handleChange}
    //                     />
    //                 </label>
    //                 <br />
    //                 <label>
    //                     確認密碼：
    //                     <input
    //                         type="password"
    //                         name="passwordConfirm"
    //                         value={formData.passwordConfirm}
    //                         onChange={handleChange}
    //                     />
    //                 </label>
    //                 <br />
    //                 <label>
    //                     身分：
    //                     <select
    //                         name="identity"
    //                         value={formData.identity}
    //                         onChange={handleChange}
    //                     >
    //                         <option value="製造商">製造商</option>
    //                         <option value="供應商">供應商</option>
    //                         <option value="客戶">客戶</option>
    //                     </select>
    //                 </label>
    //                 <br />
    //                 <button type="submit">註冊</button>
    //             </form>
    //         </div>
    //     </div>
    // );
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto" style={{ marginTop: 30 }}>
                    <div style={{ marginBottom: 30 }}>{data.time}</div>
                    <h2>註冊</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>名字：</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>密碼：</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>確認密碼：</label>
                            <input
                                type="password"
                                className="form-control"
                                name="passwordConfirm"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>身分：</label>
                            <select
                                className="form-control"
                                name="identity"
                                value={formData.identity}
                                onChange={handleChange}
                            >
                                <option value="製造商">製造商</option>
                                <option value="供應商">供應商</option>
                                <option value="客戶">客戶</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                marginTop: 25,
                                backgroundColor: '#bdb76b',
                                borderColor: '#bdb76b',
                            }}
                        >
                            確認送出
                        </button>
                    </form>
                    <Link to={'/api/login'}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                marginTop: 300,
                                backgroundColor: '#6495ed',
                                borderColor: '#6495ed',
                            }}
                        >
                            回到登入頁面
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sign;
