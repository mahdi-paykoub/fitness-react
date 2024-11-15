import React, { useEffect, useState } from 'react'
import FormBox from '../../../components/AdminPanel/FormBox/FormBox'
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Col, Row } from 'react-bootstrap';


export default function PanelAddUser() {
    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const baseUrl = process.env.REACT_APP_BASE_URL

    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('phone', data.phone)



        fetch(`${baseUrl}admin/user`,
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
            <FormBox title='دوره جدید' >
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row className='mt-4'>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='نام و نام خانوادگی کاربر'
                                {...register('name', formValidation('نام'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.name?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='شماره تلفن'
                                {...register('phone', formValidation('شماره تلفن'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.phone?.message}
                            </p>
                        </Col>

                        <div className='text-start'>
                            <button className='btn btn-primary mt-4'>
                                ثبت کاربر
                            </button>
                        </div>
                    </Row>
                </form>
            </FormBox>
        </>
    )
}
