import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

const fetchData = async () => {
    try {
        const response = await axios.get('/test', {
            withCredentials: true,
        }); // 后端的地址
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        identity: '製造商',
        signature: '',
    });
    const navigate = useNavigate();

    const getAddress = async () => {
        try {
            // 請求metamask帳戶許可
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            return accounts[0];
        } catch (err) {
            console.log('MetaMask Error:', err);
            return null;
        }
    };

    const handleAddressAuth = async () => {
        let addr = null;
        try {
            // 取得 public address
            addr = await getAddress();
        } catch (err) {
            console.log('MetaMask Error:', err);
        }
        if (!addr) return;
        // 前端生成隨機的 nonce
        const nonce = Math.floor(Math.random() * 1000000).toString();

        // 創建 ethers.providers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // 創建認證訊息
        const message = `I am signing my nonce: ${nonce}`;
        let signature = '';

        try {
            // 創建簽名
            signature = await signer.signMessage(message);

            // const response = await axios.post('/doAuth', signature, {
            //     timeout: 10000,
            //     withCredentials: true,
            // });
            // if (response) return true;
            return signature;
        } catch (err) {
            console.log('MetaMask Error:', err);
            return false;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const signature = await handleAddressAuth();
            formData.signature = signature;
        } catch (error) {
            console.error('簽署錯誤：', error);
        }

        try {
            console.log('Sending request to server...');
            const response = await axios.post('/login', formData, {
                timeout: 10000,
                withCredentials: true,
            });

            navigate('/api/homepage', { state: response.data.user });
        } catch (error) {
            console.error('Fail', error);
            alert('帳號 / 密碼 / 身分 錯誤!');
            //refresh
            setFormData({
                name: '',
                password: '',
                identity: '製造商',
                signature: '',
            });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <div className="container" style={{ marginTop: 100 }}>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h2>登入</h2>
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
                            style={{ marginTop: 25 }}
                        >
                            MetaMask認證登入
                        </button>
                    </form>
                    <Link to={'/api/signup'}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                marginTop: 300,
                                backgroundColor: '#bdb76b',
                                borderColor: '#bdb76b',
                            }}
                        >
                            註冊帳號
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
