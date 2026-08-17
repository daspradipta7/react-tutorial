import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../store/store'

function Protected({ children, authentication = true}: { children: React.ReactNode, authentication: boolean }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state: RootState) => state.auth.status && state.auth.user !== null)
    
    useEffect(() => {
        if (authentication && authentication !== authStatus) {
            navigate("/login")
        } else if (authentication && authentication === authStatus) {
            navigate("/")
        }

        const id = window.setTimeout(() => setLoader(false), 0)
        return () => clearTimeout(id)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected