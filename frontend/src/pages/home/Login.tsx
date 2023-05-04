import { FormEvent, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa'
import { MdLock } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { Alert } from 'react-bootstrap'
import { loginAthlete, setError } from '../../features/athlete/athleteSlice'
import '../../styles/login.css'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const [error, setErrorl] = useState(false)
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()

  const handleChange = (event: any) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    })
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const result = await dispatch(loginAthlete(credentials)).unwrap()
      // The authentication was successful, so navigate to the next page
      setErrorl(false)
      navigate('/athleteProfiler')
    } catch (error) {
      console.log(error)
      if (credentials.email && credentials.password) {
        setErrorl(true)
      }
    }
  }
  //////
  useEffect(() => {
    return () => {
      dispatch(setError(null))
    }
  }, [])
  /////

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert variant="danger" style={{ width: 'auto' }}>
            Incorrect email or password. Please try again.
          </Alert>
        )}
        <div className="form-groupp">
          <FaUserCircle className="icon" />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={credentials.email}
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-groupp">
          <MdLock className="icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control inputPassword"
            id="inputPassword"
            placeholder="Password"
            name="password"
            required
            value={credentials.password}
            onChange={handleChange}
            minLength={8}
          />
          {showPassword ? (
            <FaEye
              className="password-toggle-icon"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaEyeSlash
              className="password-toggle-icon"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
      <p className="mt-3 text-centre ">
        Create new account? <Link to="/signup">Sign up</Link>
      </p>
      <div className="text-centre">
        <Link to="#">Forgot password?</Link>
      </div>
    </div>
  )
}

export default Login
