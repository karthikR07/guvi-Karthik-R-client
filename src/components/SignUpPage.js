import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignupPage = () => {
  // Step 2: Create state variables for form input values

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
  });

  // Step 3: Create state variables for error messages
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
  });

  // Step 4: Implement real-time validation logic
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
        }
        break;
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
      case 'confirmPass':
        if (value !== formData.password) {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPass: 'Passwords do not match' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPass: '' }));
        }
        break;
      default:
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
    const isNameValid = !!formData.name.trim();
    const isEmailValid = formData.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    const isPasswordValid = formData.password.length >= 6;
    const isConfirmPassValid = formData.confirmPass === formData.password;

    setErrors({
      name: isNameValid ? '' : 'Name is required',
      email: isEmailValid ? '' : 'Invalid email address',
      password: isPasswordValid ? '' : 'Password must be at least 6 characters',
      confirmPass: isConfirmPassValid ? '' : 'Passwords do not match',
    });

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPassValid) {
      // Form is valid, you can proceed with your desired action here
      const finalData = {
        name: formData.name,
        mail: formData.email,
        password: formData.password
      }

      axios({
        url: "https://wonderful-crisp-7cefe5.netlify.app/.netlify/functions/server/reg",
        method: "POST",
        data: finalData
      }).then((res) => {
        navigate("/login");
        setFormData((data) => ({ ...data, name: '', password: '', email: '', confirmPass: '' }))
        console.log(res);
        alert("User created sucessfully")
      }).catch((err) => {
        alert("User Already Exist")
      })

      console.log('Form data:', formData);
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
              <label htmlFor="name">Name :</label> <small className="error">{errors.name}</small><br />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onInput={handleInputChange}
              />
            </div>
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
              <label htmlFor="confirmPass">Confirm Password :</label> <small className="error">{errors.confirmPass}</small><br />
              <input
                type="password"
                id="confirmPass"
                name="confirmPass"
                value={formData.confirmPass}
                onInput={handleInputChange}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className='section2'>
          Already have an account <Link to="/login">Login Now</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
