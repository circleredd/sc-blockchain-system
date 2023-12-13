import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
/*
Front-end URL: '/'
*/

function Startpage() {
    // 創建以太坊提供者
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // const Account = async () => {
    //     try {
    //         const res = await provider.listAccounts();
    //         console.log(res);
    //     } catch (err) {}
    // };
    // Account();

    // 檢查是否連接到以太坊
    // const checkConnected = async () => {
    //     try {
    //         // 檢查是否連接到以太坊
    //         const connected = await provider.send('eth_chainId');
    //         console.log('Connected to Ethereum:', connected);
    //     } catch (error) {
    //         console.log('Not connected to Ethereum:', error);
    //     }
    // };

    // checkConnected();

    // 請求帳戶
    const requestAccount = async () => {
        try {
            // 請求帳戶許可
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            const chainId = await provider.send('eth_chainId');

            console.log('Accounts:', accounts);
            console.log('Chain ID:', chainId);
            console.log('Provider:', provider);

            // create a wallet with the account
            const wallet = provider.getSigner(accounts[0]);
            console.log('Wallet:', wallet);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // requestAccount();

    return (
        <div>
            <Link to={'/api/signup/123'}>
                <button>註冊</button>
            </Link>
            <Link to={'/api/login'}>
                <button>登入</button>
            </Link>
        </div>
    );
}

export default Startpage;
