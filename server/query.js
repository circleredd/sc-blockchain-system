// query statement

/*
 cusotmer
*/
// 創建bom表，用於'/custoomer/bomcreate'
const createBom =
    'INSERT INTO bom (bom_name, bom_desc, customer_id) VALUES (?, ?, ?)';
// 將加密的bom表元件存入bom
const insertEncryptedData = 'UPDATE bom SET hash = ? WHERE bom_id = ?';
const createBomComponents =
    'INSERT INTO bom_components (bom_id, component_id, component_name,  bom_component_quantity) VALUES ?';

// 查詢bom表，用於'/customer/bomhistory'
const bomHistory = 'SELECT * FROM bom WHERE customer_id = ?';
const bomHistoryDetail = 'SELECT * FROM bom_components WHERE bom_id = ?';

// 創建order表，用於'/customer/ordercreate'
const orderCreate =
    'INSERT INTO orders (order_status, yield_rate, order_id, customer_id, supplier_id, bom_id ,order_total, order_date, order_deliverydate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

// 取得bom表的hash值，用於'/customer/ordercreate'
const getBomHash = 'SELECT hash FROM bom WHERE bom_id = ?';

// 查詢order表，用於'/customer/orderhistory'
const custOrderHistory = 'SELECT * FROM orders WHERE customer_id = ?';

/*
 supplier
*/
// orderHistory
const supplierOrderHistory = 'SELECT * FROM orders WHERE supplier_id = ?';
const supplierUpdateOrderStatus =
    'UPDATE orders SET order_status = "運送中" WHERE order_id = ?';

/*
 manufacturer
*/
const mfrOrderHistory = 'SELECT * FROM orders';
const mfrUpdateOrderStatus =
    'UPDATE orders SET order_status = ? WHERE order_id = ?';

module.exports = {
    createBom,
    insertEncryptedData,
    createBomComponents,
    bomHistory,
    bomHistoryDetail,
    orderCreate,
    getBomHash,
    custOrderHistory,
    supplierOrderHistory,
    supplierUpdateOrderStatus,
    mfrUpdateOrderStatus,
    mfrOrderHistory,
};
