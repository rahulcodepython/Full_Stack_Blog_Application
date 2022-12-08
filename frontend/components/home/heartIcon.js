import { useEffect, useState } from 'react';

export default function heartIcon({ like }) {

    const [type, setType] = useState('heart')

    useEffect(() => {
        let idArray = [];
        for (const id in like) {
            const element = like[id];
            idArray.push(element.id);
            idArray.includes(Number(sessionStorage.getItem("userid"))) ? setType('heart-fill') : setType('heart');
        }
    }, [])

    return <i className={`bi bi-${type}`}></i>;
}
