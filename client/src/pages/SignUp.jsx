import {Link,useNavigate} from 'react-router-dom'
import {useState} from 'react'
import OAuth from '../components/OAuth.jsx'

export default function SignUp() {
  const [formData,setFormData ] = useState({})
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate= useNavigate()
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
      setLoading(true)
      const res= await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data=await res.json()
      console.log(data)
      if(data.success === false){
        setLoading(false)
        setError(data.message)
        return
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    }
    catch(error){
        setLoading(false)
        setError(error.message)
    }
  }
  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' className='border p-3 rounded-lg ' id='username' onChange={handleChange} />
        <input type="text" placeholder='email' className='border p-3 rounded-lg ' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={handleChange} />
        <button disabled={loading} className="uppercase bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80">sign up</button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5 justify-between'>

        <p>Have an account?</p>
        <Link to ="/sign-in">
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
        {error && <p className='text-red-500 mt-5'> {error}</p>}
    </div>
  )
}
