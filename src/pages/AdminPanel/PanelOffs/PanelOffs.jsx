import { React, useState, useEffect } from 'react'
import SniperLoader from '../../../components/SniperLoader/SniperLoader'
import { Table } from 'react-bootstrap'
import ErrorBox from '../../../components/AdminPanel/ErrorBox/ErrorBox'
import DataBox from '../../../components/AdminPanel/DataBox/DataBox'
import swal from "sweetalert";

function PanelOffs() {
    const [offs, setOffs] = useState([])
    const [loader, setLoader] = useState(true)
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    let text = ''
    const getOffs = () => {
        fetch(`${baseUrl}admin/off`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setOffs(res.data)
                setLoader(false)
            })
    }

    useEffect(() => {
        getOffs()
    }, [])

    const handleDelete = (id) => {
        swal({
          title: 'آیا از حذف اطمینان دارید؟',
          icon: "error",
          buttons: ['خیر', 'بله']
        }).then(response => {
          if (response) {
            fetch(`${baseUrl}admin/off/${id}`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userTokenLS.token}`
              },
            })
              .then(response =>
                response.json()
              )
              .then(res => {
    
                if (res.status !== false) {
                  swal({
                    title: "کد تخفیف با موفقیت حذف شد",
                    icon: "success",
                    buttons: 'باشه'
                  }).then(response => {
                    getOffs();
                  })
                } else {
                  swal({
                    title: "مشکلی در حذف بوجود آمد!",
                    icon: "error",
                    buttons: 'باشه'
                  })
                }
    
              })
    
          }
        })
      }
    return (<>
        {
            loader ?
                <SniperLoader />
                :
                offs.length !== 0 ?
                    <DataBox title='پرداخت ها'>
                        <Table className='box-child-table mt-4' hover>
                            <thead>
                                <tr>
                                    <th>نام کاربر</th>
                                    <th className='fs15'>استفاده شده</th>
                                    <th className='fs15'>حداکثر استفاده</th>
                                    <th>برای</th>
                                    <th>نوع</th>
                                    <th>مقدار</th>
                                    <th>عملیات</th>

                                </tr>
                            </thead>
                            <tbody>
                                {offs.map((off, index) => {
                                    if (off.for == 'course') {
                                        text = 'دوره'
                                    } if (off.for == 'plan') {
                                        text = 'برنامه'
                                    } if (off.for == 'all') {
                                        text = 'دوره و برنامه'
                                    }
                                    return <tr key={off.id}>
                                        <td>{off.code}</td>
                                        <td>{off.usage}</td>
                                        <td>{off.max_usage}</td>
                                        <td className='fs15'>{text}</td>
                                        <td className='fs15'>{off.type == 'percent' ? 'درصدی' : 'مقدار ثابت'}</td>
                                        <td className='fs15'>{off.value}</td>
                                        <td className='fs15'>
                                            <button className='btn btn-danger btn-sm'
                                                onClick={(e) => handleDelete(off.id)}
                                            >حذف</button>
                                        </td>
                                    </tr>
                                }
                                )
                                }
                            </tbody>
                        </Table>

                    </DataBox>
                    : <ErrorBox text='کد تخفیفی یافت نشد' />
        }
    </>);
}

export default PanelOffs;