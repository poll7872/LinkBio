import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../components/ErrorMessage';
import type { RegisterForm } from '../types';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import api from '../config/axios';
import { GradientButton } from "../components/GradientButton";

export const RegisterView = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const initialValues: RegisterForm = {
    name: '',
    email: '',
    handle: location?.state?.handle || '',
    password: '',
    password_confirmation: ''
  }

  const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const password = watch('password')

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post('/auth/register', formData)
      toast.success(data.message)
      reset()
      navigate('/auth/login')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response?.data.error)
      }
    }
  }

  return (
    <>
      <div className="text-center">
        <h1 className='text-3xl text-slate-800 font-bold'>Crea tu Cuenta</h1>
        <p className="text-slate-500 mt-1">Únete a la comunidad de LinkBio</p>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-5 mt-8"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-slate-700"
          >
            Nombre
          </label>
          <div className="mt-1">
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="w-full px-3 py-2 bg-white/50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-base"
              {...register('name', {
                required: 'El nombre es obligatorio',
              })}
            />

            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
        </div>

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
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'El email no es válido'
                }
              })}
            />

            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </div>
        </div>

        <div>
          <label
            htmlFor="handle"
            className="block text-lg font-medium text-slate-700"
          >
            Tu @handle
          </label>
          <div className="mt-1">
            <input
              id="handle"
              type="text"
              placeholder="Nombre de usuario (sin espacios)"
              className="w-full px-3 py-2 bg-white/50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-base"
              {...register('handle', {
                required: 'El handle es obligatorio',
              })}
            />

            {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
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
              placeholder="Mínimo 8 caracteres"
              className="w-full px-3 py-2 bg-white/50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-base"
              {...register('password', {
                required: 'El password es obligatorio',
                minLength: {
                  value: 8,
                  message: 'La password debe tener al menos 8 caracteres'
                }

              })}
            />

            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </div>
        </div>

        <div>
          <label
            htmlFor="password_confirmation"
            className="block text-lg font-medium text-slate-700"
          >
            Confirmar Password
          </label>
          <div className="mt-1">
            <input
              id="password_confirmation"
              type="password"
              placeholder="Repite tu password"
              className="w-full px-3 py-2 bg-white/50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-base"
              {...register('password_confirmation', {
                required: 'La confirmación del password es obligatoria',
                validate: (value) => value === password || 'Los passwords no coinciden'
              })}
            />

            {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
          </div>
        </div>

        <GradientButton
          type="submit"
        >
          Crear Cuenta
        </GradientButton>
      </form>

      <nav className='mt-6 text-center'>
        <p className="text-base text-slate-600">
          ¿Ya tienes una cuenta?{' '}
          <Link className='font-medium text-violet-600 hover:text-violet-500 hover:underline' to="/auth/login">
            Inicia sesión
          </Link>
        </p>
      </nav>
    </>
  )
}
