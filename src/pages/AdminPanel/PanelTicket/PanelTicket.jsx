import React, { useEffect, useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import { compareAsc, format, newDate } from "date-fns-jalali";

export default function PanelTicket() {
    const [tickets, setTickets] = useState([])
    const [shownTickets, setShownTickets] = useState([])
    const [loader, setLoader] = useState(true)

    const baseUrl = process.env.REACT_APP_BASE_URL
    let statusColor = ''
    let statusText = ''
    const getTickets = () => {
        fetch(`${baseUrl}admin/ticket`, {
        })
            .then(res => res.json())
            .then(res => {
                setTickets(res.data)
                setShownTickets(res.data.filter(ticket => ticket.status === 'open'))
                setLoader(false)
            })
    }


    useEffect(() => {
        getTickets()
    }, [])



    const handleStatusFilter = (value) => {
        switch (value) {
            case 'open':
                {
                    const orderedTickets = tickets.filter(ticket => (ticket.status === 'open'))
                    setShownTickets(orderedTickets)
                    break;
                }
            case 'close':
                {
                    const orderedTickets = tickets.filter(ticket => (ticket.status === 'close'))
                    setShownTickets(orderedTickets)
                    break;
                }
            case 'answered':
                {
                    const orderedTickets = tickets.filter(ticket => (ticket.status === 'answered'))
                    setShownTickets(orderedTickets)
                    break;
                }
            case 'review':
                {
                    const orderedTickets = tickets.filter(ticket => (ticket.status === 'review'))
                    setShownTickets(orderedTickets)
                    break;
                }
        }
    }

    return (
        <>
            <div className='admin-Data-box w-100 py-4 br-10 px-2'>
                <div className='d-flex justify-content-between px-4 pb-1'>
                    <div className='text-primary'>تیکت ها</div>
                    <div className='d-flex align-items-center'>
                        <div className='fs14'>فیلتر:</div>
                        <Form.Select size="sm" className='me-2'
                            onChange={(e) => {
                                handleStatusFilter(e.target.value)
                            }}
                        >
                            <option value='open'>باز</option>
                            <option value='close'>بسته</option>
                            <option value='answered'>پاسخ داده شده</option>
                            <option value='review'>در حال بررسی</option>
                        </Form.Select>
                    </div>
                </div>
                {
                    loader ?
                        <SniperLoader />
                        :
                        shownTickets.length !== 0 ?
                            <Row className=''>
                                <Col>
                                    <div className='all-tickets-box bg-white p-4'>
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
                                                    shownTickets.map((ticket, index) => {
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




                                    </div>
                                </Col>
                            </Row>
                            :
                            <div className='p-3 mt-3 bg-danger fflalezar text-white br-10'>تیکتی وجود ندارد.</div>
                }
            </div>
        </>
    )
}
