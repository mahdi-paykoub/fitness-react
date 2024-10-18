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

export default function TicketDetail() {
    const [chats, setChats] = useState([])
    const [modalShow, setModalShow] = useState(false);

    const baseUrl = process.env.REACT_APP_BASE_URL
    const ticketId = useParams().id
    
    const getChats = () => {
        fetch(`${baseUrl}get-ticket-chats/${ticketId}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                
                setChats(res.data)
            })
    }


    useEffect(() => {
        getChats()
    }, [])
    

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;
    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('message', data.message)
        formData.append('ticket_id', ticketId)


        fetch(`${baseUrl}answer-ticket`,
            {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                
                if (response.status !== false) {
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then(response => {
                        reset();
                        getChats();
                        setModalShow(false)
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
          
            {
                chats.length !== 0 &&
                <Row className='mt-3'>
                    <Col>
                        <div className='bg-white br-10 p-4'>
                            <div className='d-flex justify-content-between align-items-center border-bottom pb-3'>

                                <div className='fs20 fflalezar c-text-secondary me-2 lh-1-8'>
                                    عنوان تیکت مورد نظر

                                </div>

                                <div>
                                    <button className='send-btn fflalezar px-4' variant="primary" onClick={() => setModalShow(true)}>پاسخ به تیکت</button>
                                </div>
                            </div>
                            {/* reapeat */}

                            {
                                chats.map((chat) =>
                                    <Row className={`${chat.admin ? 'admin-style' : 'user-style'} mt-3`}>
                                        <Col lg='7'>
                                            <div className='w-100 p-3 lh2 fs14 chat-box'>
                                                <div className='texts-side px-1'>
                                                    <div className='fs18 '>
                                                        نام کاربری
                                                    </div>
                                                    <div className='mt-1 mb-1 text-secondary fs13'>
                                                        13:30
                                                        1402-1-2
                                                    </div>
                                                </div>
                                                <div className='border-bottom pb-3'>
                                                    {chat.message}
                                                </div>
                                                <div className='mt-2 text-side'>
                                                    <LuFileSpreadsheet fontSize={20} />
                                                    <span className='fs13 me-1'>دانلود پیوست</span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                )
                            }


                        </div>
                    </Col>
                </Row>

            }

            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <div className='p-4'>
                    <div className='fflalezar fs20 color-2'>
                        <SiAnswer fontSize={20} className='ms-2' />
                        ارسال جواب
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className='mt-3'>
                            <textarea style={{ 'height': '150px' }} className='w-100 c-input p-2' placeholder='پاسخ به تیکت'
                                {...register('message', formValidation('پیام'))}

                            ></textarea>
                            <p className='text-danger px-2 fs13'>
                                {errors.message?.message}
                            </p>
                        </div>
                        <div className='text-start mt-2'>
                            <button className='fflalezar send-btn px-4'>ارسال </button>
                        </div>
                    </form>
                </div>

            </MyModal>
        </>
    )
}