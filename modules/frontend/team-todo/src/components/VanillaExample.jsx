import { useState } from 'react';

export default function VanillaExample() {
    const [value, setValue] = useState('');

    function onSubmit() {
        console.log('Submitted:', value);
    }

    return (
        <>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)} // DOM event → e.target.value
                placeholder="Write something…"
            />
            <button onClick={onSubmit}>Send</button>
        </>
    );
}
