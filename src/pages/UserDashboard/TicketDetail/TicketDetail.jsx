import { React, useState, useEffect, Children } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { LuFileCheck2 } from "react-icons/lu";
import { LuFileSpreadsheet } from "react-icons/lu";
import { Link, useParams } from 'react-router-dom';
import MyModal from '../../../components/MyModal/MyModal';
import { SiAnswer } from "react-icons/si";
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import { compareAsc, format, newDate } from "date-fns-jalali";
import BtnSpiner from '../../../components/BtnSpiner/BtnSpiner';

export default function TicketDetail() {
    const [btnLoader, setBtnLoader] = useState(false)
    const [chats, setChats] = useState([])
    const [loader, setLoader] = useState(true)
    const [modalShow, setModalShow] = useState(false);
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const baseUrl = process.env.REACT_APP_BASE_URL
    const ticketId = useParams().id

    const getChats = () => {
        fetch(`${baseUrl}get-ticket-chats/${ticketId}`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setChats(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getChats()
    }, [])


    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;
    const onSubmit = (data) => {
        setBtnLoader(true)
        let formData = new FormData()
        formData.append('message', data.message)
        formData.append('ticket_id', ticketId)
        formData.append('file', data.file[0])


        fetch(`${baseUrl}answer-ticket`,
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
                setModalShow(false)
                if (response.status !== false) {
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then(response => {
                        reset();
                        getChats();

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
                loader ?
                    <SniperLoader newstyle='mt-5' />
                    :
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
                                        <Row key={chat.id} className={`${chat.admin ? 'admin-style' : 'user-style'} mt-3`}>
                                            <Col xs='11' lg='7'>
                                                <div className='w-100 p-3 lh2 fs14 chat-box'>
                                                    <div className='texts-side px-1'>
                                                        <div className='fs18 '>
                                                            نام کاربری
                                                        </div>
                                                        <div className='mt-1 mb-1 text-secondary fs13'>

                                                            {format(new Date(chat.created_at), "yyyy-MM-dd")}
                                                        </div>
                                                    </div>
                                                    <div className='border-bottom pb-3'>
                                                        {chat.message}
                                                    </div>
                                                    {
                                                        chat.file != null ?
                                                            <a className='c-text-secondary' href={`${baseUrl}${chat.file}`} download="proposed_file_name">
                                                                <div className='mt-2 text-side' >
                                                                    <LuFileSpreadsheet fontSize={20} />
                                                                    <span className='fs13 me-1'>دانلود پیوست</span>
                                                                </div>
                                                            </a>
                                                            :
                                                            <div className='mt-2 text-side fs13'>فاقد فایل پیوست</div>
                                                    }
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
                        <div className='mt-2'>
                            <label for="mess_file" className="fflalezar w-100">
                                <div className='send-btn cursor-pointer w-100 text-center py-2 px-3'>آپلود فایل پیوست</div>
                            </label>
                            <input type="file" id='mess_file' className='d-none'
                                {...register('file', formValidation('فایل', false))} placeholder='hasxasx' />
                            <p className='text-danger px-2 fs13'>
                                {errors.file?.message}
                            </p>
                        </div>
                        <div className='text-start mt-3'>
                            {
                                btnLoader == false ?
                                    <button className='fflalezar send-btn px-4'>ارسال </button>
                                    :
                                    <button type='button' className='send-btn fflalezar px-4 pt-2'>
                                        <BtnSpiner wid='25px' he='25px' />
                                    </button>
                            }
                        </div>
                    </form>
                </div>

            </MyModal>
        </>
    )
}
