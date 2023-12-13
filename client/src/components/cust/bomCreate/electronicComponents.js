import { useEffect, useState } from 'react';

function EletroincComponents({
    index,
    data,
    onComponentChange,
    deleteComponent,
}) {
    // 要回傳給父元件的資料
    const [formData, setFormData] = useState({
        id: data[0].component_id, // 元件id
        component: data[0].component_name, // 元件名稱
        number: 1, // 元件數量
    });

    const options = data.map((component) => (
        <option key={component.component_name} value={component.component_name}>
            {component.component_name}
        </option>
    ));

    // 初始化時通知父元件, 及當formData改變時通知父元件
    useEffect(() => {
        onComponentChange(
            index,
            formData.id,
            formData.component,
            formData.number
        );
    }, [formData.id, formData.component, formData.number]);

    // 調整handleChange通知父元件
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);

        // 暫時保存新的formData
        let newFormData = {
            ...formData,
            [name]: value,
        };

        // 如果更動元件名稱，則更新id
        if (name === 'component') {
            const matchingComponent = data.find(
                (component) => component.component_name === value
            );
            if (matchingComponent) {
                newFormData.id = matchingComponent.component_id;
            }
        }
        setFormData(newFormData);

        console.log(formData);
        onComponentChange(
            index,
            formData.id,
            formData.component,
            formData.number
        );
    };

    // 當按下close按鈕時，通知父元件刪除此元件
    const onCloseButtonChange = (index) => {
        deleteComponent(index);
    };
    console.log('index: ', index);
    console.log('inside: ', formData.component);
    return (
        <div>
            <div>{}</div>
            <div className="component">
                <select
                    className="form-control-sm"
                    style={{ marginRight: '1rem' }}
                    name="component"
                    value={formData.component}
                    onChange={handleChange}
                >
                    {options}
                </select>
                <label>數量:</label>
                <input
                    name="number"
                    onChange={handleChange}
                    value={formData.number}
                ></input>
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => onCloseButtonChange(index)}
                />
            </div>
        </div>
    );
}

export default EletroincComponents;
