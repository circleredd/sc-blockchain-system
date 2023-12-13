import { useEffect, useState } from 'react';

function EletroincComponents({
    index,
    data,
    selectedComponent,
    onComponentChange,
}) {
    const [number, setNumber] = useState(15); // 想要呈現的组件數量
    const [formData, setFormData] = useState({
        component: '電阻',
    });

    const options = Object.keys(data).map((component, value) => (
        <option key={component} value={component}>
            {`${component} `}
        </option>
    ));

    useEffect(() => {
        onComponentChange(index, formData.component);
    }, []);

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setNumber(data[value]);
    //     // data[value] = data[value] - 1;
    //     // console.log(data[value]);
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    // 调整handleChange来通知父组件选择的更改
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNumber(data[value]);
        setFormData({
            ...formData,
            [name]: value,
        });
        onComponentChange(index, value);
    };

    return (
        <div>
            <div></div>
            <div className="component">
                <select
                    className="form-control-sm"
                    name="component"
                    value={formData.component}
                    onChange={handleChange}
                >
                    {options}
                </select>
                <label>剩餘數量：{number}</label>
            </div>
        </div>
    );
}

export default EletroincComponents;
