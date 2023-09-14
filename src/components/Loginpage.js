import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom'

const LoginPage = () => {
  // Step 2: Create state variables for form input values

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Step 3: Create state variables for error messages
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // Step 4: Implement real-time validation logic
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!value.match(emailRegex)) {
          setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        }
        break;
      case 'password':
        if (value.length < 6) {
          setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
        }
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Step 5: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const isEmailValid = formData.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    const isPasswordValid = formData.password.length >= 6;

    setErrors({
      email: isEmailValid ? '' : 'Invalid email address',
      password: isPasswordValid ? '' : 'Password must be at least 6 characters',
    });

    if (isEmailValid && isPasswordValid) {
      // Form is valid, you can proceed with your desired action here

      const finalData = {
        mail : formData.email,
        password: formData.password
      }

      axios({
        url: "https://wonderful-crisp-7cefe5.netlify.app/.netlify/functions/server/login",
        method: "POST",
        data: finalData
      }).then((res) => {
        if(res.status===200){
          localStorage.setItem("authorization", res.data.authToken);
        navigate("/profile");
        setFormData((data) => ({ ...data, password: '', email: '' }))
        }
        console.log(res);
      }).catch((err) => {
        alert("Invalid email and password");
        console.log(err);
      })

    }
  };

  // Step 1: Render the form
  return (
    <div id="container1">
      <div className="section1">
        <div>
          <h1>Signup Now</h1>
        </div>
        <div>
          <form id="frm1" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email">Email :</label> <small className="error">{errors.email}</small><br />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onInput={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password :</label> <small className="error">{errors.password}</small><br />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onInput={handleInputChange}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className='section2'>
          Don't have an account ? <Link to="/"> Signup Now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
