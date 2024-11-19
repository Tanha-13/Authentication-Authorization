import {Link} from "react-router-dom"

function Register() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Register</h1>
      <form action="" className="flex flex-col  gap-4">
        <input type="text"  placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg"/>
        <input type="email"  placeholder="Email" id="Email" className="bg-slate-100 p-3 rounded-lg"/>
        <input type="password"  placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg"/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 font-medium text-xl">Register</button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link className="text-blue-500 font-medium" to ="/login">Login</Link>
      </div>
    </div>
  )
}

export default Register