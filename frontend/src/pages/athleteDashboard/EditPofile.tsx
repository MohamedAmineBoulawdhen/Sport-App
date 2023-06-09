import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import mongoose from 'mongoose'
import { RootState } from '../../store/store'
import SidebarAthlete from './Sidebar'
import { updateAthlete } from '../../features/athlete/athleteSlice'
import '../../styles/editformathlete.css'

interface FormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  gender?: 'male' | 'female'
  dateOfBirth?: String
  street?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  weight?: number
  height?: number
  session?: mongoose.Types.ObjectId[]
  age?: number
  level?: 'beginner' | 'intermediate' | 'advanced' | 'professional'
  discipline?: string[]
  admin?: mongoose.Types.ObjectId
  adminType?: 'association' | 'gym' | 'personal trainer'
  coaches?: mongoose.Types.ObjectId[]
}

const EditPofile = () => {
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ defaultValues: {} })
  const athlete: any = useSelector((state: RootState) => state.auth.athlete)
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()
  const [athleteId, setAthleteId] = useState(athlete?._id)
  useEffect(() => {
    reset({ ...athlete })
    setAthleteId(athlete?._id)
  }, [athlete, reset])
  const closeSnackbar = () => {
    setSnackbarIsOpen(false)
  }
  const onSubmit = async (data: Object) => {
    // console.log(athleteId)
    setSnackbarIsOpen(true)
    try {
      const response = await dispatch(updateAthlete({ id: athleteId, data }))
      // console.log(response);
    } catch (error) {
      console.log(error)
    }
  }
  if (!athlete) {
    return <div>Loading...</div>
  }

  return (
    <>
      <SidebarAthlete />
      <form
        className="edit-profile-form"
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginTop: '50px' }}
      >
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            defaultValue="New York"
            {...register('firstName', {
              required: { value: true, message: 'First name is required' },
            })}
          />
        </div>
        {errors?.firstName && typeof errors.firstName.message === 'string' && (
          <Alert severity="error" className="alert">
            {errors.firstName.message}
          </Alert>
        )}
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            {...register('lastName', {
              required: { value: true, message: 'Last name is required' },
            })}
          />
        </div>
        {errors.lastName && typeof errors.lastName.message === 'string' && (
          <Alert severity="error" className="alert">
            {errors.lastName.message}
          </Alert>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: { value: true, message: 'Email is required' },
            })}
          />
        </div>
        {errors.email && typeof errors.email.message === 'string' && (
          <Alert severity="error" className="alert">
            {errors.email.message}
          </Alert>
        )}

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            {...register('city', {
              minLength: { value: 3, message: 'City is required' },
            })}
          />
        </div>
        {errors.city && typeof errors.city.message === 'string' && (
          <Alert severity="error" className="alert">
            {errors.city.message}
          </Alert>
        )}

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input type="text" {...register('state')} />
        </div>
        {errors.state && typeof errors.state.message === 'string' && (
          <Alert severity="error" className="alert">
            {errors.state.message}
          </Alert>
        )}

        <div className="form-group">
          <label htmlFor="zip">Zip</label>
          <input type="text" {...register('zip')} />
        </div>
        {errors.zip && typeof errors.zip.message === 'string' && (
          <Alert severity="error" className="alert">
            {errors.zip.message}
          </Alert>
        )}

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input type="gender" {...register('gender')} />
        </div>
        {errors.gender && typeof errors.gender.message === 'string' && (
          <Alert severity="error" className="alert">
            {errors.gender.message}
          </Alert>
        )}

        <div className="form-group">
          <label htmlFor="dateOfBirth">Birthday</label>
          <input
            type="date"
            {...register('dateOfBirth', {
              required: { value: true, message: 'birthday is required' },
            })}
          />
        </div>
        {errors.dateOfBirth &&
          typeof errors.dateOfBirth.message === 'string' && (
            <Alert severity="error" className="alert">
              {errors.dateOfBirth.message}
            </Alert>
          )}

        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            {...register('height', {
              required: { value: true, message: 'Height is required' },
            })}
          />
        </div>
        {errors.height && typeof errors.height.message === 'string' && (
          <Alert severity="error" className="alert">
            {errors.height.message}
          </Alert>
        )}

        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            {...register('weight', {
              required: { value: true, message: 'Weight is required' },
            })}
          />
        </div>
        {errors.weight && typeof errors.weight.message === 'string' && (
          <Alert severity="error" className="alert">
            {errors.weight.message}
          </Alert>
        )}

        <div className="form-group">
          <button type="submit">Save</button>
        </div>
        <Snackbar
          open={snackbarIsOpen}
          autoHideDuration={2000}
          onClose={closeSnackbar}
        >
          <Alert severity="success">Your changes have been saved.</Alert>
        </Snackbar>
      </form>
    </>
  )
}

export default EditPofile
