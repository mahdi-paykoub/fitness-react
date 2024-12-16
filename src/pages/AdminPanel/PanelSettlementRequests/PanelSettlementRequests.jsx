import { React, useState, useEffect } from 'react'
import { Col, Row, Table } from "react-bootstrap";
import { TbCubeSend } from 'react-icons/tb';
import swal from "sweetalert";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import ErrorBox from '../../../components/AdminPanel/ErrorBox/ErrorBox';
import { Link } from 'react-router-dom';

function PanelSettlementRequests() {
    const [settles, setSettles] = useState([]);
    const [shownPays, setshownPays] = useState([])

    const [loader, setLoader] = useState(true)
    let txt = ''
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const getSettlements = () => {
        fetch(`${baseUrl}admin/settlement`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);

                setSettles(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getSettlements()
    }, [])

    const handleShowMessage = (id) => {
        swal({
            text: settles.find((stl) => stl.id == id).message,

            buttons: 'باشه'
        }).then(res => {
            getSettlements()
        })
    }
    return (<>
        <div className='admin-Data-box w-100 py-4 br-10 px-2'>

            {
                loader ?
                    <SniperLoader />
                    :
                    settles.length !== 0 ?

                        <>
                            <div className=''>
                                لیست
                                <span className='text-primary'> درخواست های تسویه</span>
                            </div>
                            <Table Table className='box-child-table mt-4 fflalezar' hover>
                                <thead>
                                    <tr>
                                        <th>نام کاربر</th>
                                        <th>تلفن</th>
                                        <th>نوع درخواست</th>
                                        <th>وضعیت</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {settles.reverse().map((settle, index) => {
                                        if (settle.type == 'plan') {
                                            txt = 'کد تخفیف برای خرید برنامه'
                                        } if (settle.type == 'course') {
                                            txt = 'کد تخفیف برای خرید دوره'
                                        } if (settle.type == 'cash') {
                                            txt = 'درخواست دریافت نقدی'
                                        }
                                        return <tr key={settle.id}>
                                            <td>
                                                {settle.user.name}
                                            </td>
                                            <td>
                                                {settle.user.phone}
                                            </td>
                                            <td>
                                                {txt}
                                            </td>
                                            <td>
                                                {settle.status == 0 ?
                                                    <button className='btn btn-danger btn-sm'>در انتطار بررسی</button>
                                                    :
                                                    <button className='btn btn-primary btn-sm'
                                                        onClick={() => handleShowMessage(settle.id)}
                                                    >
                                                        مشاهده پیام
                                                    </button>
                                                }
                                            </td>
                                            <td>
                                                {settle.status == 0 &&
                                                    <Link to={`/admin-panel/settlement-info/${settle.id}`} className='btn btn-primary btn-sm'>تسویه</Link>
                                                }
                                            </td>
                                        </tr>
                                    }
                                    )
                                    }
                                </tbody>
                            </Table>
                        </>


                        : <ErrorBox text='درخواستی یافت نشد' />
            }
        </div>
    </>);
}

export default PanelSettlementRequests;
