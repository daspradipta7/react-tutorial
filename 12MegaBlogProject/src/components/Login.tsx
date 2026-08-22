import React from 'react'
import Logo from './Logo'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth/AuthService'
import { login as authLogin } from '../store/authSlice'
import { useForm } from 'react-hook-form'

type FormValues = {
  email: string
  password: string
}

function Login() {
    const [error, setError] = React.useState<string | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<FormValues>()

    const login = async(data: FormValues) => {
        setError(null)
        try {
            const session = await authService.login(data)
            console.log({ session })

            if (session) {
                const user = await authService.getUserSession()

                if (user) {
                    dispatch(authLogin(user))
                    navigate('/')
                }
            }
        } catch (error: unknown) {
            setError((error as Error).message || 'Invalid email or password')
        }
    }

  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='flex flex-col items-center justify-center w-96 p-8 bg-white rounded-lg shadow-md'>
            <div className='mb-4 text-2xl font-bold text-gray-800'>
                <h1>Login</h1>
                <span>
                    <Logo width="100px" height="100px" />
                </span>
            </div>
            <h1>Don't have an account?</h1>
            <Link to="/signup" className='text-blue-500 hover:underline'>Sign Up</Link>
            {error && <p className='mt-4 text-red-500'>{error}</p>}
            <form onSubmit={handleSubmit(login)} className='w-full mt-4'>
                <div className='mb-4'>
                    <Input
                        type="email"
                        placeholder="Email"
                        label="Email"
                        {
                            ...register('email', { 
                                required: true,
                                validate: {
                                    matchPattern: (value: string) => /\S+@\S+\.\S+/.test(value) || 'Invalid email address'
                                }
                            })
                        }
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        label="Password"
                        {
                            ...register('password', { 
                                required: true ,
                                validate: {
                                    minLength: (value: string) => value.length >= 6 || 'Password must be at least 6 characters long',
                                    maxLength: (value: string) => value.length <= 20 || 'Password must be at most 20 characters long',
                                    matchPattern: (value: string) => /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(value) || 'Password must contain at least one letter and one number'
                                }

                            })
                        }
                    />
                    <Button 
                        type="submit"
                        className='w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600'
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
