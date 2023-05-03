import React from 'react'
import { useState } from "react";
import '../../App.css';
import Navbar from '../Navbar';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from "formik";
import { signUpSchema } from './Schemas';





export default function EditVendor() {


    const location = useLocation();
    const navigate = useNavigate();
    let oldobj=location.state.obj.e;



    const [agentimage, setagentimage] = useState(null);

    const onImageChange = (e) => {
        console.log(e.target.files);
        setagentimage(e.target.files[0]);
    }

    const initialValues = {
        firstname: oldobj.firstname,
        lastname: oldobj.lastname,
        email: oldobj.email,
        contact: oldobj.contact,
        city: oldobj.city,
        address: oldobj.address,
        state: oldobj.state
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: signUpSchema,
            onSubmit: (values, action) => {
                console.log(
                    "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
                    values
                );
                handlereq();
                action.resetForm();
                navigate('/dashboard/viewvendors');
                setagentimage(null);
            },
        });

    const handlereq = (e) => {

        const formData = new FormData();
        formData.append('firstname', values.firstname);
        formData.append('lastname', values.lastname);
        formData.append('email', values.email);
        formData.append('contact', values.contact);
        formData.append('city', values.city);
        formData.append('address', values.address);
        formData.append('state', values.state);
        formData.append('agentimage', agentimage);


        axios.put(`https://admindb.onrender.com/api/vendor/${oldobj.id}`, formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log("Error : \n" + error))
    }



    


    return (
        <>
            <div className="container">
                <div className="main m-0 p-0 bg-tailtertiary">

                    <Navbar pagename="Edit Vendor Page" pagenumber="119" />
                    <div className='mt-4 items-center flex pb-32'>

                        <div style={{ width: "800px" }} className='mt-4 bg-white border border-2 rounded-md resize-x mx-auto flex shadow-[0_20px_50px_rgba(8,_100,_150,_0.5)]'>

                            <form className='w-full mx-auto bg-white p-4' onSubmit={handleSubmit}>
                                <h2 className='text-center font-bold font-mono text-2xl'>VENDOR</h2>
                                <hr className='w-36 mt-2 border-2 mx-auto' />

                                <div className='flex flex-col py-2'>
                                    <label>Firstname</label>
                                    <input value={values.firstname} autoComplete="off" className='mt-1 border p-2 rounded-md' type="text" name='firstname' placeholder='Enter First Name' onBlur={handleBlur} onChange={handleChange} />
                                    {errors.firstname && touched.firstname ? (
                                        <p className="form-error">{errors.firstname}</p>
                                    ) : null}
                                </div>
                                <div className='flex flex-col py-2'>
                                    <label>Lastname</label>
                                    <input value={values.lastname} required className='mt-1 border p-2 rounded-md' type="text" name='lastname' placeholder='Enter Last Name' onBlur={handleBlur} onChange={handleChange} />
                                    {errors.lastname && touched.lastname ? (
                                        <p className="form-error">{errors.lastname}</p>
                                    ) : null}
                                </div>


                                <div className='flex flex-col py-2'>
                                    <label>Email</label>
                                    <input value={values.email} required className='mt-1 border p-2 rounded-md' type="email" name='email' placeholder='Enter Email' onBlur={handleBlur} onChange={handleChange} />
                                    {errors.email && touched.email ? (
                                        <p className="form-error">{errors.email}</p>
                                    ) : null}
                                </div>


                                <div className='flex flex-col py-2'>
                                    <label>Contact Number</label>
                                    <input value={values.contact} required className='mt-1 border p-2 rounded-md' type="text" name='contact' placeholder='Enter Contact Number' onBlur={handleBlur} onChange={handleChange} />
                                    {errors.contact && touched.contact ? (
                                        <p className="form-error">{errors.contact}</p>
                                    ) : null}
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label>Upload Delivery Agent Image</label>
                                    <input required className='mt-1 border p-2 rounded-md' type="file" name="agentimage" onChange={onImageChange} />
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label>State</label>
                                    <input value={values.state} required className='mt-1 border p-2 rounded-md' type="text" name='state' placeholder='Enter State' onBlur={handleBlur} onChange={handleChange} />
                                    {errors.state && touched.state ? (
                                        <p className="form-error">{errors.state}</p>
                                    ) : null}
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label>City</label>
                                    <input value={values.city} required className='mt-1 border p-2 rounded-md' type="text" name='city' placeholder='Enter City' onBlur={handleBlur} onChange={handleChange} />
                                    {errors.city && touched.city ? (
                                        <p className="form-error">{errors.city}</p>
                                    ) : null}
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label>Address</label>
                                    <textarea onBlur={handleBlur} onChange={handleChange} value={values.address} rows="3" name="address" placeholder='Enter address' className='mt-1 border p-2 rounded-md'>
                                    </textarea>
                                    {errors.address && touched.address ? (
                                        <p className="form-error">{errors.address}</p>
                                    ) : null}
                                </div>


                                <div className='flex mx-auto mt-2'>

                                    <button type='submit' className='m-2 font-poppins font-bold border w-full mt-2 mb-2 rounded-md py-2 bg-tailtertiary3 hover:bg-tailprimary text-black' onClick={handleSubmit}>SAVE</button>
                                    <button className='m-2 font-poppins font-bold border w-full mt-2 mb-2 rounded-md py-2 bg-tailtertiary3 hover:bg-red-600 text-black' onClick={()=>navigate('/dashboard/viewvendors')}>DISCARD</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


