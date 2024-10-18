import { React, useState, useEffect, Children } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { LuFileCheck2 } from "react-icons/lu";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import MyModal from '../../../components/MyModal/MyModal';
import { SiAnswer } from "react-icons/si";
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';

export default function PanelSendTicket() {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;
    const userId = useParams().id



    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('message', data.message)
        formData.append('title', data.title)
        formData.append('user_id', userId)


        fetch(`${baseUrl}admin/ticket`,
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
                    }).then(response => {
                        reset();
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
            <div className='admin-Data-box w-100 py-2 br-10 px-2'>
                {
                    <Row>
                        <Col lg='5'>
                            <div className='d-flex align-items-center mb-4'>
                                <img src="/images/ask_answer.png" width={100} alt="" />
                                <div className='fflalezar fs25 color-2 me-2'>ارسال تیکت جدید</div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className='mt-3 me-3'>
                                    <input type="text" className='c-input w-100 px-2' placeholder='عنوان تیکت'
                                        {...register('title', formValidation('عنوان تیکت'))}
                                    />
                                    <p className='mt-1 text-danger px-2 fs13'>
                                        {errors.title?.message}
                                    </p>
                                </div>

                                <div className='mt-3 me-3'>
                                    <textarea placeholder='پیام تیکت' style={{ 'height': '150px' }} name="" id="" className='c-input pt-2 w-100 px-2'
                                        {...register('message', formValidation('پیام تیکت'))}
                                    ></textarea>
                                    <p className='mt- text-danger px-2 fs13'>
                                        {errors.message?.message}
                                    </p>
                                </div>

                                <div className='text-start mt-2'>
                                    <button className='send-btn fflalezar px-4'>
                                        ارسال تیکت
                                    </button>
                                </div>
                            </form>

                        </Col>
                    </Row>

                }
            </div>


        </>
    )
}
