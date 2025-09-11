import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorMessage } from '../components/ErrorMessage'
import type { LoginForm } from '../types'
import api from '../config/axios'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { GradientButton } from "../components/GradientButton";

export const LoginView = () => {

  const navigate = useNavigate()

  const initialValues: LoginForm = {
    email: '',
    password: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post('/auth/login', formData)
      localStorage.setItem('AUTH_TOKEN', data.token)
      navigate('/admin')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response?.data.error)
      }
    }
  }

  return (
    <>
      <div className="text-center">
        <h1 className='text-3xl text-slate-800 font-bold'>Iniciar Sesión</h1>
        <p className="text-slate-500 mt-1">Administra tus enlaces</p>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-5 mt-8"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-slate-700"
          >
            E-mail
          </label>
          <div className="mt-1">
            <input
              id="email"
              type="email"
              placeholder="tucorreo@email.com"
              autoComplete="email"
              className="w-full px-3 py-2 bg-white/50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-base"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-lg font-medium text-slate-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              type="password"
              placeholder="Tu password"
              className="w-full px-3 py-2 bg-white/50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-base"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
        </div>

        <GradientButton
          type="submit"
        >
          Iniciar Sesión
        </GradientButton>
      </form>

      <nav className='mt-6 text-center'>
        <p className="text-base text-slate-600">
          ¿No tienes una cuenta?{' '}
          <Link className='font-medium text-violet-600 hover:text-violet-500 hover:underline' to="/auth/register">
            Crea una cuenta
          </Link>
        </p>
      </nav>
    </>
  )
}
