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
import { compareAsc, format, newDate } from "date-fns-jalali";
import { RiMailSendFill } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import BtnSpiner from '../../../components/BtnSpiner/BtnSpiner';

export default function PanelTicketDetail() {
    const [btnLoader, setBtnLoader] = useState(false)

    const [chatLoader, setChatLoader] = useState(true)
    const [otherLoader, setOtherLoader] = useState(true)
    const [chats, setChats] = useState([])
    const [otherTickets, setOtherTickets] = useState([])
    const [ticket, setTicket] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const location = useLocation();
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const baseUrl = process.env.REACT_APP_BASE_URL
    const ticketId = useParams().id
    const userId = useParams().userId
    let statusColor = ''
    let statusText = ''
    const getChats = () => {
        fetch(`${baseUrl}admin/get-ticket-chats/${ticketId}`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setChats(res.data)
                setTicket(res.ticket)
                setChatLoader(false)

            })
        fetch(`${baseUrl}admin/get-user-other-ticket/${ticketId}/${userId}`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setOtherTickets(res.data)
                setOtherLoader(false)
            })
    }

    useEffect(() => {
        getChats()
    }, [location.pathname])

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;
    const onSubmit = (data) => {
        setBtnLoader(true)

        let formData = new FormData()
        formData.append('message', data.message)
        formData.append('ticket_id', ticketId)
        formData.append('file', data.file[0])

        fetch(`${baseUrl}admin/admin-answer-ticket`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
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
                        setBtnLoader(false)

                    })

                } else {
                    swal({
                        title: response.message[0],
                        icon: "error",
                        buttons: 'باشه'
                    }).then(response => {                   
                        setBtnLoader(false)

                    })
                }

            })
    }

    const handleTicketStatus = (e) => {
        console.log(e);

        fetch(`${baseUrl}admin/change-ticket-status`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: JSON.stringify({
                    status: e,
                    ticket_id: ticketId
                })
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
            <div className='admin-Data-box w-100 py-2 br-10 px-2'>
                {
                    <Row className='mt-3'>
                        <Col>
                            <div className='bg-white br-10 p-4'>
                                <div className='d-flex justify-content-between align-items-center border-bottom pb-3'>

                                    <div className='d-flex align-items-center fflalezar c-text-secondary me-2 lh-1-8'>
                                        <div> وضعیت</div>

                                        <Form.Select size="sm" className='me-2' onChange={(e) => handleTicketStatus(e.target.value)}>
                                            <option value='open' selected={ticket.status === 'opne' ? true : false}>باز</option>
                                            <option value='close' selected={ticket.status === 'close' ? true : false}>بسته</option>
                                            <option value='answered' selected={ticket.status === 'answered' ? true : false}>پاسخ داده شد</option>
                                            <option value='review' selected={ticket.status === 'review' ? true : false}>در حال بررسی</option>

                                        </Form.Select>
                                    </div>

                                    <div>
                                        <button className='send-btn fflalezar px-4' variant="primary" onClick={() => setModalShow(true)}>پاسخ به تیکت</button>
                                    </div>
                                </div>
                                {/* reapeat */}

                                {
                                    chatLoader === true ?
                                        <SniperLoader newstyle='mt-5' />
                                        :
                                        chats.map((chat) =>
                                            <Row className={`${chat.admin ? 'admin-style' : 'user-style'} mt-3`}>
                                                <Col lg='7'>
                                                    <div className='w-100 p-3 lh2 fs14 chat-box'>
                                                        <div className='texts-side px-1'>
                                                            <div className='fs18 '>
                                                                نام کاربری
                                                            </div>
                                                            <div className='mt-1 mb-1 text-secondary fs13'>

                                                                {format(new Date(ticket.created_at), "yyyy-MM-dd")}
                                                            </div>
                                                        </div>
                                                        <div className='border-bottom pb-3 fs17'>
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

            </div>
            <div className='admin-Data-box w-100 py-4 br-10 px-3 mt-3 mb-5'>
                <RiMailSendFill className='text-primary' fontSize={20} />
                <span className='fflalezar fs15 me-2 c-text-secondary mt-1'>تیکت های دیگر این کاربر</span>
                <div className='mt-4'>
                    {
                        otherLoader === true ?
                            <SniperLoader newstyle='mt-4' />
                            :
                            otherTickets.length !== 0 ?
                                <table class="table box-child-table fflalezar mt-4">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">عنوان</th>
                                            <th scope="col">تاریخ</th>
                                            <th scope="col">وضعیت</th>
                                            <th scope="col">عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody className='ticket-table'>
                                        {
                                            otherTickets.map((ticket, index) => {
                                                if (ticket.status === 'open') {
                                                    statusColor = 'bg-danger';
                                                    statusText = 'باز'
                                                }
                                                if (ticket.status === 'close') {
                                                    statusColor = 'bg-secondary';
                                                    statusText = 'بسته'

                                                }
                                                if (ticket.status === 'review') {
                                                    statusColor = 'bg-primary';
                                                    statusText = 'در حال بررسی'

                                                }
                                                if (ticket.status === 'answered') {
                                                    statusColor = 'bg-success'
                                                    statusText = 'پاسخ داده شده'

                                                }
                                                return <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td><Link to={`/admin-panel/ticket-detail/${ticket.id}/${ticket.user_id}`} className='c-text-secondary'>{ticket.title} </Link></td>
                                                    <td>  {format(new Date(ticket.created_at), "yyyy-MM-dd")}</td>

                                                    <td><span className={`badge fs13 ${statusColor}`}>{statusText}</span></td>
                                                    <td><Link to={`/admin-panel/ticket-detail/${ticket.id}/${ticket.user_id}`} className='btn btn-primary btn-sm'>مشاهده </Link></td>

                                                </tr>
                                            }

                                            )


                                        }




                                    </tbody>
                                </table>
                                :
                                <div className='bg-info text-white br-10 p-3'>این کاربر تیکت دیگری ندارد.</div>
                    }

                </div>
            </div>


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
                            <label for="mess_file" class="fflalezar w-100">
                                <div className='send-btn cursor-pointer w-100 text-center py-2 px-3'>آپلود فایل پیوست</div>
                            </label>
                            <input type="file" id='mess_file' className='d-none'
                                {...register('file', formValidation('فایل', false))} placeholder='hasxasx' />
                            <p className='text-danger px-2 fs13'>
                                {errors.file?.message}
                            </p>
                        </div>
                        <div className='text-start mt-2'>
                            {
                                btnLoader == false ?
                                    <button className='fflalezar send-btn px-4'>ارسال </button>
                                    :
                                    <button className='send-btn fflalezar px-4 pt-2'>
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
