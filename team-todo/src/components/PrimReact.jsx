import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';

export default function PrimeExample() {
    const [value, setValue] = useState('');

    function onSubmit() {
        console.log('Submitted:', value);
    }

    return (
        <>
            <InputText
                value={value}
                onChange={(e) => setValue(e.target.value)} // same controlled pattern
                placeholder="Write something…"
            />
            <Button
                label="Send"
                icon="pi pi-send"
                onClick={onSubmit} // same onClick callback
                // severity="success"
            />
        </>
    );
}
