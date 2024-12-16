import { React, useState, useEffect } from 'react'
import { formValidation } from "../../utils/Validations";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from 'react-bootstrap';
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";


function ScoreSetting({ maxScoreValues, useScoreValues }) {

    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const form = useForm();
    const { register, control, handleSubmit, formState, reset, setValue } = form
    const { errors } = formState;

    useEffect(() => {
        setValue('max_score', maxScoreValues)
        setValue('use_score', useScoreValues)
    }, [])

    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('max_score', data.max_score)
        formData.append('use_score', data.use_score)

        fetch(`${baseUrl}admin/score-option`,
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
                        title: 'امتیازات با موفقیت ثبت شد',
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
    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row className='mt-4'>
                    <Col lg='4'>
                        حداقل امتیاز کاربر برای ارسال درخواست تسویه
                    </Col>
                    <Col lg='3'>
                        <input type="text" className='form-control ms-1 text-center' style={{ 'width': '70px' }}
                            {...register('max_score', formValidation('حداکثر امتیاز'))}
                        />
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col lg='4'>
                        امتیاز هر بار استفاده از کد معرف
                    </Col>
                    <Col lg='3'>
                        <input type="text" className='form-control ms-1 text-center' style={{ 'width': '70px' }}
                            {...register('use_score', formValidation('امتیاز استفاده'))}
                        />
                    </Col>
                    <Col className=''>
                        <button className='btn btn-primary' >ارسال</button>
                    </Col>
                </Row>
            </form>
        </div>
    </>);
}

export default ScoreSetting;