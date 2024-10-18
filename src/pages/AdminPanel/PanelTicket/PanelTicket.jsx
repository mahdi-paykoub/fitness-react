import React, { useEffect, useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export default function PanelTicket() {
    const [tickets, setTickets] = useState([])
    const baseUrl = process.env.REACT_APP_BASE_URL
    let statusColor = ''
    let statusText = ''
    const getTickets = () => {
        fetch(`${baseUrl}admin/ticket`, {
        })
            .then(res => res.json())
            .then(res => {
                setTickets(res.data)
            })
    }


    useEffect(() => {
        getTickets()
    }, [])

    return (
        <>
            <div className='admin-Data-box w-100 py-4 br-10 px-2'>
                <div className='d-flex justify-content-between px-4 pb-1'>
                    <div className='text-primary'>تیکت ها</div>
                    <div className='d-flex align-items-center'>
                        <div className='fs14'>فیلتر:</div>
                        <Form.Select size="sm" className='me-2'>
                            <option value='open'>باز</option>
                            <option value='open'>بسته</option>
                            <option value='open'>پاسخ داده شده</option>
                            <option value='open'>در حال بررسی</option>
                        </Form.Select>
                    </div>
                </div>
                {
                    tickets.length !== 0 ?
                        <Row className=''>
                            <Col>
                                <div className='all-tickets-box bg-white p-4'>



                                    <table class="table fflalezar mt-4">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">عنوان</th>
                                                <th scope="col">تاریخ</th>
                                                <th scope="col">وضعیت</th>
                                            </tr>
                                        </thead>

                                        <tbody className='ticket-table'>


                                            {

                                                tickets.map((ticket, index) => {
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
                                                        <td>1402/2/3</td>

                                                        <td><span className={`badge fs13 ${statusColor}`}>{statusText}</span></td>
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
