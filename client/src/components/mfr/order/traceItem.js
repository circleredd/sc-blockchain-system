// struct
// data[0] = {
//     orderID,
//     customer_id,
//     supplier_id,
//     bomID,
//     orderDate,
//     deliveryDate,
//     total,
//     bomHash,
// };

function TraceItem({ data }) {
    data[0] = JSON.parse(data[0]);
    const {
        orderID,
        customer_id,
        supplier_id,
        bomID,
        orderDate,
        deliveryDate,
        total,
        yieldRate,
        bomHash,
    } = data[0];
    const status = data[1];
    let number = 1;
    if (status === '運送中') number = 2;
    else if (status === '貨物送達且通過第三方驗證') number = 3;
    else if (status === '製造商檢驗通過並開始製造') number = 4;
    return (
        <div>
            <h3>{number}.</h3>
            <p>訂單狀態: {status}</p>
            <p>訂單ID: {orderID}</p>
            <p>BOM表ID: {bomID}</p>
            <p>顧客ID: {customer_id}</p>
            <p>供應商ID: {supplier_id}</p>
            <p>良率要求: {yieldRate}%</p>
            <p>訂單金額: ${total}</p>
            <p>下訂日期: {orderDate}</p>
            <p>交貨日期: {deliveryDate}</p>
        </div>
    );
}

export default TraceItem;
