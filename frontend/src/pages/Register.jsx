import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({});
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      setError(false);
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if(data.success === false){
        setError(true);
        console.log(error);
        return;
      }
      navigate("/login");
    }
    catch(err){
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Register</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col  gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 font-medium text-xl">
          {loading ? "Loading..." : 'Register'}
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link className="text-blue-500 font-medium" to="/login">
          Login
        </Link>
      </div>
      <p className="text-red-700">{error ?? "Something went wrong"}</p>
    </div>
  );
}

export default Register;
