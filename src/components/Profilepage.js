import { Modal, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

const ProfilePage = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const authToken = localStorage.getItem("authorization");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        dob: '',
        mobile: '', 
    });

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        age: '',
        dob: '',
        mobile: '', 
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        age: '',
        dob: '',
        mobile: '',
    });

    const intialFetch = ()=>{
        fetch("https://wonderful-crisp-7cefe5.netlify.app/.netlify/functions/server/view", { method: "GET", headers: { authorization: authToken } })
                .then((res) => {
                    return res.json();
                }).then((uData) => {
                    console.log(uData)
                    setUserData((data) => ({ ...data, name: uData[0].name, email: uData[0].mail, dob:uData[0].dob, mobile: uData[0].mobile, age: uData[0].age}))
                    setFormData((data) => ({ ...data, name: uData[0].name, email: uData[0].mail, dob:uData[0].dob, mobile: uData[0].mobile, age: uData[0].age}))
                }).catch((err) => {
                    navigate("/");
                });
    }

    const logoutAction = ()=>{
        localStorage.clear();
        navigate("/");
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const updateData = ()=>{

        axios({
            url: "https://wonderful-crisp-7cefe5.netlify.app/.netlify/functions/server/update",
            method: "PUT",
            headers:{
                authorization: authToken
            },
            data: formData
          }).then((res) => {
            handleClose();
            alert("Updated Successfully");
            intialFetch();
          }).catch((err) => {
          })
        
    }

    useEffect(() => {
        if (!authToken) {
            return navigate("/");
        } else {
            intialFetch();
        }
    },[]);


    // Function to validate input fields
    const validateFields = () => {
        let isValid = true;
        const newFormErrors = { ...formErrors };

        if (formData.name.trim() === '') {
            newFormErrors.name = 'Name is required';
            isValid = false;
        } else {
            newFormErrors.name = '';
        }

        if (formData.email.trim() === '') {
            newFormErrors.email = 'Email is required';
            isValid = false;
        } else {
            newFormErrors.email = '';
        }

        if (formData.age.trim() === '' || isNaN(formData.age)) {
            newFormErrors.age = 'Age must be a valid number';
            isValid = false;
        } else {
            newFormErrors.age = '';
        }

        if (formData.dob.trim() === '') {
            newFormErrors.dob = 'Date of Birth is required';
            isValid = false;
        } else {
            newFormErrors.dob = '';
        }

        // Mobile number validation (optional, customize as needed)
        if (formData.mobile.trim() === '' || !/^\d+$/.test(formData.mobile)) {
            newFormErrors.mobile = 'Mobile number is required and must contain only digits';
            isValid = false;
        } else {
            newFormErrors.mobile = '';
        }

        setFormErrors(newFormErrors);
        return isValid;
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateFields()) {
            updateData();
        }
    };

    return (
        <div id="container2">
            <div className="headers">
                <h1>Profile Page</h1>
                <div>
                    <button onClick={logoutAction}>Logout</button>
                </div>
            </div>
            <div className="section3">
                <div className="s3s1">
                    <div className="updateSec">
                        <button onClick={handleOpen}>Update</button>
                    </div>
                    <p>Name : {userData.name}</p>
                    <p>Age : {userData.age}</p>
                    <p>Email: {userData.email}</p>
                    <p>DOB : {userData.dob}</p>
                    <p>Mobile: {userData.mobile}</p> {/* Display mobile number */}
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update profile
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Name :</label>
                                <small className="error">{formErrors.name}</small>
                                <br />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({ ...formData, name: value });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email :</label>
                                <small className="error">{formErrors.email}</small>
                                <br />
                                <input
                                    disabled
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({ ...formData, email: value });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="age">Age :</label>
                                <small className="error">{formErrors.age}</small>
                                <br />
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    min={6}
                                    max={70}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({ ...formData, age: value });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="dob">DOB :</label>
                                <small className="error">{formErrors.dob}</small>
                                <br />
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({ ...formData, dob: value });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="mobile">Mobile :</label>
                                <small className="error">{formErrors.mobile}</small>
                                <br />
                                <input
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({ ...formData, mobile: value });
                                    }}
                                />
                            </div>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ProfilePage;
