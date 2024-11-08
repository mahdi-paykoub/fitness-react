import React, { useEffect, useState } from 'react'
import './style.css'
import DataBox from '../../../components/AdminPanel/DataBox/DataBox'
import { Table } from 'react-bootstrap'
import SniperLoader from '../../../components/SniperLoader/SniperLoader'
import ErrorBox from '../../../components/AdminPanel/ErrorBox/ErrorBox'
// import XLSX from "xlsx";
import { read, utils, writeFile } from 'xlsx';


export default function PanelIndex() {
  const [users, setUsers] = useState([])
  const [loader, setLoader] = useState(true)

  const baseUrl = process.env.REACT_APP_BASE_URL
  const userTokenLS = JSON.parse(localStorage.getItem('user'))


  const getCourses = () => {
    fetch(`${baseUrl}admin/user`, {
      headers: {
        Authorization: `Bearer ${userTokenLS.token}`
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);

        setUsers(res.data)
        setLoader(false)
      })
  }


  useEffect(() => {
    getCourses()
  }, [])

  const handleExportUsers = () => {
    const wb = utils.book_new();
    let ws = utils.json_to_sheet(users)
    utils.book_append_sheet(wb, ws, 'users')
    writeFile(wb, "UserExel.xlsx")
  }
  return (
    <>
      <div className='mt-5 mb-5 pb-5'>
        {
          loader ?
            <SniperLoader />
            :
            users.length !== 0 ?
              <>

                <div className='admin-Data-box w-100 py-4 br-10 px-2'>
                  <div className=' d-flex justify-content-between'>
                    <div className='fs20'>لیست <span className='text-primary'>کاربران</span></div>
                    <div>
                      <button className='btn btn-primary ms-2' onClick={handleExportUsers}>خروجی اکسل</button>
                    </div>
                  </div>
                  <Table className='box-child-table mt-4' hover>
                    <thead>
                      <tr>

                        <th>نام</th>
                        <th>شماره تلفن</th>
                        <th>عملیات</th>
                      </tr>
                    </thead>
                    <tbody>

                      {users.map((user, index) =>
                        <tr key={user.id}>

                          <td>{user.name}</td>
                          <td>{user.phone}</td>

                          <td>
                            <button className='btn btn-danger btn-sm'
                            // onClick={() => handleDeleteCourse(course.id)}
                            >
                              حذف
                            </button>
                          </td>
                        </tr>)
                      }


                    </tbody>
                  </Table>

                </div>
              </>
              : <ErrorBox text='کاربری ای یافت نشد' />
        }

      </div>
    </>
  )
}
