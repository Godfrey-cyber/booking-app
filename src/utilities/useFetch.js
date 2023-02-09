import { useEffect, useState } from 'react'
import axios from "axios"
const useFetch = (url) => {
    const [data1, setData1] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData1 = async () => {
            setLoading(true)
            try {
                const res = await axios.get(url)
                setData1(res.data)
            } catch (error) {
                setError(true)
            }
            setLoading(false)
        }
        fetchData1()
    }, [url])

    const reFetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData1(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    return {error, loading , data1, reFetch}
}
export default useFetch