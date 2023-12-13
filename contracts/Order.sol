// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.19;

contract Order{

    struct Record {
        string data;
        string status;
        uint256 timestamp;
        address updater; // 紀錄調用者的地址
    }
    // 映射資料的mapping
    mapping(uint256 => Record[]) public recordMapping;

    // 新增一筆資料
    function addRecord(uint256 identifier, string memory newData) public {
        require(identifier != 0, "Identifier cannot be zero");

        Record memory newRecord = Record({
            data: newData,
            status:unicode"訂單處理中",
            timestamp: block.timestamp,
            updater: msg.sender // 紀錄調用者的地址
        });

        recordMapping[identifier].push(newRecord);
    }

    // 獲取指定標識的資料筆數
    function getRecordCount(uint256 identifier) public view returns (uint256) {
        return recordMapping[identifier].length;
    }

    // 獲取指定標識和索引的資料(單筆資料)
    function getRecord(uint256 identifier, uint256 index) public view returns (string memory, uint256, address) {
        require(index < recordMapping[identifier].length, "Index out of bounds");

        Record memory record = recordMapping[identifier][index];
        return (record.data, record.timestamp, record.updater);
    }

    // 獲取指定整列的資料
    function getRowRecords(uint256 identifier) public view returns (Record[] memory) {
        return recordMapping[identifier];
    }

    // 更新指定標識和索引的資料
    function updateRecord(uint256 identifier, string memory statusStr) public {
        require(identifier != 0, "Identifier cannot be zero");
        // require(index < recordMapping[identifier].length, "Index out of bounds");
        
       Record memory newRecord = recordMapping[identifier][recordMapping[identifier].length-1];
       newRecord.status = statusStr;
       recordMapping[identifier].push(newRecord);
    }
}