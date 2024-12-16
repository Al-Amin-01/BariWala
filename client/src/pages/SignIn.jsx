import {Link,useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth.jsx'
export default function SignIn() {
  const [formData,setFormData ] = useState({})
  const {loading,error} =useSelector(state=>state.user)
  const navigate= useNavigate()
  const dispatch = useDispatch();
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }
  console.log(formData)

  const handleSubmit = async (e)=>{
    
    
    e.preventDefault()
    try{
      dispatch(signInStart())
      const res= await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data=await res.json()
      console.log(data)
      if(data.success === false){
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    }
    catch(error){
        dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign in</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        
        <input type="text" placeholder='email' className='border p-3 rounded-lg ' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={handleChange} />
        <button disabled={loading} className="uppercase bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80">sign in</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5 justify-between'>

        <p>Do not have an account?</p>
        <Link to ="/sign-up">
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
        {error && <p className='text-red-500 mt-5'> {error}</p>}
    </div>
  )
}
