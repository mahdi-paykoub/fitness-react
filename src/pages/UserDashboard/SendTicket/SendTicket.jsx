import {React,useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import BtnSpiner from '../../../components/BtnSpiner/BtnSpiner';


export default function SendTicket() {
    const [btnLoader, setBtnLoader] = useState(false)

    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;
    const onSubmit = (data) => {
        setBtnLoader(true)
        let formData = new FormData()
        formData.append('message', data.message)
        formData.append('title', data.title)
        formData.append('file', data.file[0])


        fetch(`${baseUrl}send-ticket`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                setBtnLoader(false)
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
            <Row className='mt-4'>
                <Col>
                    <div className='bg-white p-3 br-10'>

                        <Row>
                            <Col lg='6' xl='5'>
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
                                    <div className='me-3'>
                                        {/* <label for="mess_file" className="fflalezar w-100">
                                            <div className='send-btn cursor-pointer w-100 text-center py-2 px-3'>آپلود فایل پیوست</div>
                                        </label> */}
                                        <div className='fflalezar text-secondary'>
                                            فایل پیوست
                                            <span className='color-2 fs14'> (اختیاری) </span>
                                        </div>
                                        <input type="file" id='mess_file' className='form-control mt-2'
                                            {...register('file', formValidation('فایل', false))} />
                                        <p className='text-danger px-2 fs13'>
                                            {errors.file?.message}
                                        </p>
                                    </div>
                                    <div className='text-start mt-4'>
                                        {
                                            btnLoader == false ?
                                                <button className='send-btn fflalezar px-4'>
                                                    ارسال تیکت
                                                </button>
                                                :
                                                <button type='button' className='send-btn fflalezar px-4 pt-2'>
                                                    <BtnSpiner wid='25px' he='25px' />
                                                </button>
                                        }

                                    </div>
                                </form>

                            </Col>
                        </Row>


                    </div>
                </Col>
            </Row>
        </>
    )
}
