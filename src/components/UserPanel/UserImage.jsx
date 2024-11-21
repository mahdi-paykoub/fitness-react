import { React, useState, useEffect } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { BiBaguette } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { HiOutlineCamera } from "react-icons/hi";
import { AuthContext } from "../../Context/AuthContext";
import swal from "sweetalert";
import { formValidation } from "../../utils/Validations";
import { useForm } from "react-hook-form";

export default function UserImage({ defaultUserImage }) {
    const baseUrl = process.env.REACT_APP_BASE_URL

    const [front, setFront] = useState(baseUrl + defaultUserImage.front);
    const [back, setBack] = useState(baseUrl + defaultUserImage.back);
    const [side, setSide] = useState(baseUrl + defaultUserImage.side);

    const userTokenLS = JSON.parse(localStorage.getItem('user'))


    const form = useForm();
    const { register, control, handleSubmit, formState, reset, setValue } = form
    const { errors } = formState;

    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('front', data.front[0])
        formData.append('back', data.back[0])
        formData.append('side', data.side[0])



        fetch(`${baseUrl}uer-images`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(response => {

                if (response.status !== false) {
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    })
                } else {
                    swal({
                        title: response.message[0],
                        icon: "error",
                        buttons: 'باشه'
                    })
                }

            })
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='box-for-get-data bg-white mt-3 br-10 p-3 mb-4'>
                    <div className='c-text-secondary d-flex align-items-center'>
                        <GoDotFill />
                        <div className='fflalezar fs20 me-1'>آپلود تصاویر</div>
                    </div>

                    <Row className='px-2'>
                        <Col lg={4} className='mt-4'>
                            <div className='fflalezar'>
                                تصویر جلوی بدن
                            </div>
                            <input type="file" className='d-none' id='uploadImage1'
                                {...register('front', {
                                    required: {
                                        value: true,
                                        message: `تصویر جلو بدن الزامی است `
                                    },
                                    onChange: (e) => { setFront(URL.createObjectURL(e.target.files[0])) },

                                })}

                            />

                            <label style={{ 'height': "150px" }} htmlFor="uploadImage1" className='w-100 mt-2 cursor-pointer position-relative w-100 w-100 br-10 d-flex justify-content-center align-items-center'>

                                <img src={front} className='w-100 position-absolute object-fit-cover inn-im' />
                                <div className='un-img position-absolute' >
                                    <HiOutlineCamera fontSize={40} color='#ecedee' />
                                </div>
                            </label>
                            <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                {errors.front?.message}
                            </p>

                        </Col>

                        <Col lg={4} className='mt-4'>
                            <div className='fflalezar'>
                                تصویر پشت بدن
                            </div>
                            <input type="file" className='d-none' id='uploadImage2'
                                {...register('back', {
                                    required: {
                                        value: true,
                                        message: `تصویر پشت بدن الزامی است `
                                    },
                                    onChange: (e) => { setBack(URL.createObjectURL(e.target.files[0])); },

                                })}
                            />
                            <label style={{ 'height': "150px" }} htmlFor="uploadImage2" className='w-100 mt-2 cursor-pointer position-relative w-100 w-100 br-10 d-flex justify-content-center align-items-center'>


                                <img src={back} className='w-100 position-absolute object-fit-cover inn-im' />

                                <div className='un-img position-absolute' >
                                    <HiOutlineCamera fontSize={40} color='#ecedee' />
                                </div>
                            </label>
                            <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                {errors.back?.message}
                            </p>

                        </Col>
                        <Col lg={4} className='mt-4'>
                            <div className='fflalezar'>
                                تصویر از پهلو
                            </div>
                            <input type="file" className='d-none' id='uploadImage3'
                                {...register('side', {
                                    required: {
                                        value: true,
                                        message: `تصویر پهلو بدن الزامی است `
                                    },
                                    onChange: (e) => { setSide(URL.createObjectURL(e.target.files[0])); },

                                })}
                            />
                            <label style={{ 'height': "150px" }} htmlFor="uploadImage3" className='w-100 mt-2 cursor-pointer position-relative w-100 w-100 br-10 d-flex justify-content-center align-items-center'>

                                <img src={side} className='w-100 position-absolute object-fit-cover inn-im' />
                                <div className='un-img position-absolute' >
                                    <HiOutlineCamera fontSize={40} color='#ecedee' />
                                </div>
                            </label>
                            <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                {errors.side?.message}
                            </p>

                        </Col>

                        {
                            defaultUserImage != null ?
                                defaultUserImage.length === 0 ?
                                    <div className='text-start'>
                                        <button className='send-btn fflalezar px-4 mt-4'>ارسال</button>
                                    </div> :

                                    <div className='text-start'>
                                        <button className='send-btn fflalezar px-4 mt-4'>آپدیت</button>
                                    </div>
                                :
                                <div className='text-start'>
                                    <button className='send-btn fflalezar px-4 mt-4'>ارسال</button>
                                </div>

                        }

                    </Row>
                </div>
            </form>
        </>
    )
}
