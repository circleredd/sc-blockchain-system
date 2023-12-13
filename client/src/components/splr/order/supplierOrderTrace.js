import TraceItem from './traceItem';

function SupplierOrderTrace({ traceData }) {
    if (!traceData || traceData.length === 0) {
        return <p>No trace data available.</p>;
    }

    return (
        <div>
            {traceData.map((item, index) => (
                <TraceItem key={index} data={item} />
            ))}
        </div>
    );
}

export default SupplierOrderTrace;
