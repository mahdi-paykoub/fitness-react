import React, { useEffect, useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import swal from "sweetalert";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import DataBox from '../../../components/AdminPanel/DataBox/DataBox';
import { Table } from 'react-bootstrap';
import ErrorBox from '../../../components/AdminPanel/ErrorBox/ErrorBox';
import { compareAsc, format, newDate } from "date-fns-jalali";
import Pagination from '../../../components/Pagination/Pagination';

export default function AllPeys() {
    const [pays, setPays] = useState([])
    const [shownPays, setshownPays] = useState([])
    const [loader, setLoader] = useState(true)
    const baseUrl = process.env.REACT_APP_BASE_URL

    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const getPays = () => {
        fetch(`${baseUrl}admin/payments`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {                
                setPays(res.data)
                setshownPays(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getPays()
    }, [])
    return (
        <>
            <div className='mt-5 mb-5 pb-5'>
                {
                    loader ?
                        <SniperLoader />
                        :
                        shownPays.length !== 0 ?
                            <DataBox title='پرداخت ها'>
                                <Table className='box-child-table mt-4' hover>
                                    <thead>
                                        <tr>
                                            <th>نام کاربر</th>
                                            <th>شماره تماس</th>
                                            <th>خرید</th>
                                            <th>وضعیت پرداخت</th>
                                            <th>تاریخ پرداخت</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {shownPays.map((pay, index) =>
                                            <tr key={pay.id}>
                                                <td>
                                                    {
                                                        pay.order.user.name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        pay.order.user.phone
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        pay.order.orderable.title
                                                    }
                                                </td>
                                                <td>
                                                    {pay.status === 1 ? <button className='btn btn-sm btn-success'>موفق</button> : <button className='btn btn-sm btn-secondary'>ناموفق</button>}
                                                </td>
                                                <td>  {format(new Date(pay.created_at), "yyyy-MM-dd")}</td>


                                            </tr>)
                                        }


                                    </tbody>
                                </Table>
                                {
                                    pays.length != 0 &&
                                    <Pagination
                                        hasPage={false}
                                        items={pays}
                                        itemsCount={20}
                                        pathname={`/admin-panel/payments`}
                                        setShownCourses={setshownPays}
                                    />
                                }
                            </DataBox>
                            : <ErrorBox text='پرداختی یافت نشد' />
                }

            </div>




        </>
    )
}
