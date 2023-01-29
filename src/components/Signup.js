import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword:"" });
  let navigate = useNavigate();
    const handleSignup = async(f) => {
        f.preventDefault()

    const response = await fetch(`http://localhost:5000/api/auth/newuser`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
    localStorage.setItem('token', json.authtoken);
    navigate("/login")
    props.showAlert("sucessfully created Account", "success")
    }else{
      props.showAlert("Credentials wrong", "danger")
    }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <div className="container my-3">
      <div className="container text-center">
        <h2>Signup to get advantage of  iNotebook... </h2>
      </div>
    <form onSubmit={handleSignup}>
        <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Name
        </label>
        <input
          type="txet"
          className="form-control"
          name="name"
          onChange={onChange}
          id="name"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={onChange}
          id="email"
          aria-describedby="emailHelp"
          required
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={onChange}
          id="password"
          minLength={5}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          name="cpassword"
          onChange={onChange}
          id="cpassword"
        minLength={5}
        required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    </div>
  )
}

export default Signup
