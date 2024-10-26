import { React, useState, useContext } from 'react'
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

export default function UserImage() {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))


    const form = useForm();
    const { register, control, handleSubmit, formState, reset, getValues } = form
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
            <img src={getValues('front')} />
            <div className='box-for-get-data bg-white mt-3 br-10 p-3 mb-4'>
                <div className='c-text-secondary d-flex align-items-center'>
                    <GoDotFill />
                    <div className='fflalezar fs20 me-1'>آپلود تصاویر</div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row className='px-2'>
                        <Col lg={4} className='mt-4'>
                            <div className='fflalezar'>
                                تصویر جلوی بدن
                            </div>
                            <input type="file" className='d-none' id='uploadImage1'
                                {...register('front', formValidation('تصویر جلو بدن'))}
                            />
                            <label htmlFor="uploadImage1" className='w-100 mt-2 cursor-pointer'>
                                <div className='un-img w-100 br-10 d-flex justify-content-center align-items-center' >
                                    <HiOutlineCamera fontSize={40} color='#ecedee' />
                                </div>
                            </label>
                            <p className='mt-3 text-danger px-2'>
                                {errors.front?.message}
                            </p>
                        </Col>

                        <Col lg={4} className='mt-4'>
                            <div className='fflalezar'>
                                تصویر پشت بدن
                            </div>
                            <input type="file" className='d-none' id='uploadImage2'
                                {...register('back', formValidation('تصویر پشت بدن'))}
                            />
                            <label htmlFor="uploadImage2" className='w-100 mt-2 cursor-pointer'>
                                <div className='un-img w-100 br-10 d-flex justify-content-center align-items-center' >
                                    <HiOutlineCamera fontSize={40} color='#ecedee' />
                                </div>
                            </label>
                            <p className='mt-3 text-danger px-2'>
                                {errors.back?.message}
                            </p>
                        </Col>
                        <Col lg={4} className='mt-4'>
                            <div className='fflalezar'>
                                تصویر از پهلو
                            </div>
                            <input type="file" className='d-none' id='uploadImage3'
                                {...register('side', formValidation('تصویر پهلو بدن'))}
                            />
                            <label htmlFor="uploadImage3" className='w-100 mt-2 cursor-pointer'>
                                <div className='un-img w-100 br-10 d-flex justify-content-center align-items-center' >
                                    <HiOutlineCamera fontSize={40} color='#ecedee' />
                                </div>
                            </label>
                            <p className='mt-3 text-danger px-2'>
                                {errors.side?.message}
                            </p>
                        </Col>
                        <Col xs={12}>
                            <div className='text-start'>
                                <button className='send-btn fflalezar px-4 mt-4'>ثبت</button>
                            </div>
                        </Col>

                    </Row>
                </form>
            </div>

        </>
    )
}
