"use client";
import { useState } from 'react'
import { toast } from 'sonner';

const useFetch = (action) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        try {
            setLoading(true);
            const res = await action(...args);
            toast(res.message); 
            setData(res.data);
        } catch (error) {
            setError(res.error);
            toast(res.error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, data, fn };

}

export default useFetch