import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
// import AuthProvider from './AuthContext';

// mutual components
import Startpage from './components/startpage';
import Sign from './components/sign';
import Login from './components/login';
import Homepage from './components/homepage';

// customer
import BomCreate from './components/cust/bomCreate/bomCreate';
import BomHistory from './components/cust/bomHistory/bomHistory';
import BomHistoryDetail from './components/cust/bomHistory/bomHistoryDetail';
import InquireOrder from './components/cust/inquireOrder';
import Acceptance from './components/cust/acceptance';
import OrderCreate from './components/cust/order/orderCreate';
import CustOrderHistory from './components/cust/order/custOrderHistory';
import CustOrderHistoryDetail from './components/cust/order/custOrderDetail';

// supplier
import SupplierOrderHistory from './components/splr/order/supplierOrderHistory';
import SupplierOrderDetail from './components/splr/order/supplierOrdeDetail';

// manufacturer
import MfrOrderHistory from './components/mfr/order/mfrOrderHistory';
import MfrOrderDetail from './components/mfr/order/mfrOrderDetail';

function App() {
    return (
        <div>
            {/* <AuthProvider> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/api" element={<Startpage />} />
                    <Route path="/api/signup/:id?" element={<Sign />} />
                    <Route path="/api/login" element={<Login />} />
                    <Route path="/api/homepage" element={<Homepage />} />
                    <Route
                        path="/api/customer/bomcreate"
                        element={<BomCreate />}
                    />
                    <Route
                        path="/api/customer/bomhistory"
                        element={<BomHistory />}
                    />
                    <Route
                        path="/api/customer/bomhistory/:id"
                        element={<BomHistoryDetail />}
                    />
                    <Route
                        path="/api/customer/ordercreate"
                        element={<OrderCreate />}
                    />
                    <Route
                        path="/api/customer/orderhistory"
                        element={<CustOrderHistory />}
                    />
                    <Route
                        path="/api/customer/orderhistory/:id"
                        element={<CustOrderHistoryDetail />}
                    />
                    <Route
                        path="/api/customer/inquireorder"
                        element={<InquireOrder />}
                    />
                    <Route
                        path="/api/customer/acceptance"
                        element={<Acceptance />}
                    />
                    <Route
                        path="/api/supplier/orderhistory/"
                        element={<SupplierOrderHistory />}
                    />
                    <Route
                        path="/api/supplier/orderhistory/:id"
                        element={<SupplierOrderDetail />}
                    />
                    <Route
                        path="/api/manufacturer/orderhistory/"
                        element={<MfrOrderHistory />}
                    />
                    <Route
                        path="/api/manufacturer/orderhistory/:id"
                        element={<MfrOrderDetail />}
                    />
                </Routes>
            </BrowserRouter>
            {/* </AuthProvider> */}
        </div>
    );
}

export default App;
