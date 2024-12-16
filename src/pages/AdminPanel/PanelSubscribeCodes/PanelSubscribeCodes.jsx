import { React, useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap';
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import DataBox from '../../../components/AdminPanel/DataBox/DataBox';
import ErrorBox from '../../../components/AdminPanel/ErrorBox/ErrorBox';
import { json } from 'react-router-dom';


function PanelSubscribeCodes() {
    const [codes, setCodes] = useState([])
    const [loader, setLoader] = useState(true)
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const baseUrl = process.env.REACT_APP_BASE_URL
    let txt = ''
    const getCourses = () => {
        fetch(`${baseUrl}admin/subscribe-code`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setCodes(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getCourses()
    }, [])


    const hanleActiveCode = (status, id) => {
        fetch(`${baseUrl}admin/change-active/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userTokenLS.token}`
            },
            body: JSON.stringify({
                status
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);

                getCourses()
            })
    }
    return (<>
        <div className='mt-5 mb-5 pb-5'>
            {
                loader ?
                    <SniperLoader />
                    :
                    codes.length !== 0 ?
                        <DataBox title='کدهای معرف '>
                            <Table className='box-child-table mt-4' hover>
                                <thead>
                                    <tr>
                                        <th>نام کاربر </th>
                                        <th>کد معرف</th>
                                        <th>نوع</th>
                                        <th>مقدار تخفیف</th>
                                        <th>برای</th>
                                        <th>تعداد استفاده</th>

                                        <th>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {codes.reverse().map((code, index) => {

                                        if (code.for == 'course') {
                                            txt = 'دوره'
                                        } else if (code.for == 'plan') {
                                            txt = 'برنامه'
                                        } else if (code.for == 'all') {
                                            txt = 'برنامه و دوره'
                                        }
                                        return <tr key={code.id}>
                                            <td>{code.user.name}</td>
                                            <td>{code.code}</td>
                                            <td>{code.type == 'percent' ? 'درصدی' : 'عددی'}</td>
                                            <td>{code.value}</td>



                                            <td>{txt}</td>
                                            <td><span className='badge bg-primary pt-2 ffir'>{code.usage}</span></td>
                                            <td>{
                                                code.active == 1 ?
                                                    <button className='btn btn-danger btn-sm' onClick={() => hanleActiveCode(0, code.id)}>غیر فعال کردن</button>
                                                    :
                                                    <button className='btn btn-success btn-sm' onClick={() => hanleActiveCode(1, code.id)}>فعال کردن</button>
                                            }</td>
                                        </tr>
                                    }
                                    )
                                    }

                                </tbody>
                            </Table>

                        </DataBox>
                        : <ErrorBox text='درخواستی ای یافت نشد' />
            }

        </div>
    </>);
}

export default PanelSubscribeCodes;