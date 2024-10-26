import { React, useState, useEffect, Children } from 'react'
import DataBox from '../../../components/AdminPanel/DataBox/DataBox'
import { Link } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';

export default function PanelSendTicketIndex() {
    const [loader, setLoader] = useState(true)

    const [users, setUsers] = useState([])
    const baseUrl = process.env.REACT_APP_BASE_URL

    const getUsers = () => {
        fetch(`${baseUrl}admin/user/ticketable`, {
        })
            .then(res => res.json())
            .then(res => {
                setUsers(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
            <DataBox title='کاربران'>
                {
                    loader ?
                        <SniperLoader newstyle='mt-4'/>
                        :
                        users.length !== 0 ?
                            <Row className=''>
                                <Col>
                                    <div className='all-tickets-box bg-white p-4'>



                                        <table class="table fflalezar mt-4">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">نام</th>
                                                    <th scope="col">شماره تلفن</th>
                                                    <th scope="col">تیکت</th>
                                                </tr>
                                            </thead>

                                            <tbody className='ticket-table'>
                                                {
                                                    users.map((user, index) => {

                                                        return <tr>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{user.name}</td>
                                                            <td>{user.phone}</td>
                                                            <td><Link className='btn btn-primary' to={`/admin-panel/send-ticket/${user.id}`}>ارسال</Link></td>

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
                            <div className='p-3 mt-3 bg-danger fflalezar text-white br-10'>  کاربری یافت نشد.</div>
                }
            </DataBox>
        </>
    )
}
