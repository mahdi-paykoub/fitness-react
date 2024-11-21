import React, { useEffect, useState } from 'react'
import './style.css'
import DataBox from '../../../components/AdminPanel/DataBox/DataBox'
import { Table } from 'react-bootstrap'
import SniperLoader from '../../../components/SniperLoader/SniperLoader'
import ErrorBox from '../../../components/AdminPanel/ErrorBox/ErrorBox'
import swal from "sweetalert";
import { read, utils, writeFile } from 'xlsx';
import Pagination from '../../../components/Pagination/Pagination'
import { Link, useNavigate } from "react-router-dom";


export default function PanelIndex() {
  const [users, setUsers] = useState([])
  const [shownUsers, setShownUsers] = useState([])
  const [paginateUsers, setPaginateUsers] = useState([])
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate();

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
        setUsers(res.data)
        setShownUsers(res.data)
        setLoader(false)
      })
  }


  useEffect(() => {
    getCourses()
  }, [])

  const handleExportUsers = () => {
    const wb = utils.book_new();
    let ws = utils.json_to_sheet(shownUsers)
    utils.book_append_sheet(wb, ws, 'users')
    writeFile(wb, "UserExel.xlsx")
  }

  const handleUserFilter = (value) => {
    switch (value) {
      case 'all':
        {
          navigate('/admin-panel/users/1')
          setShownUsers(users)
          break;
        }
      case 'plan':
        {
          navigate('/admin-panel/users/1')
          const orderedUsers = users.filter(user => {
            if (JSON.parse(user.status) != null) {
              return JSON.parse(user.status).includes('plan')
            }
            return false;
          })
          setShownUsers(orderedUsers)
          break;
        }
      case 'course':
        {
          navigate('/admin-panel/users/1')
          const orderedUsers = users.filter(user => {
            if (JSON.parse(user.status) != null) {
              return JSON.parse(user.status).includes('course')
            }
            return false;
          })
          console.log(orderedUsers);
          setShownUsers(orderedUsers)
          break;
        }
      case 'course_plan':
        {
          navigate('/admin-panel/users/1')
          const orderedUsers = users.filter(user => {
            if (JSON.parse(user.status) != null) {
              return (JSON.parse(user.status).includes('course') && JSON.parse(user.status).includes('plan'))
            }
            return false;
          })
          setShownUsers(orderedUsers)
          break;
        }
      case 'no':
        {
          navigate('/admin-panel/users/1')
          const orderedUsers = users.filter(user => {
            return JSON.parse(user.status) == null
          })
          setShownUsers(orderedUsers)
          break;
        }
      default:
        break;
    }
  }


  const handleDeleteUser = (id) => {
    swal({
      title: 'آیا از حذف اطمینان دارید؟',
      icon: "error",
      buttons: ['خیر', 'بله']
    }).then(response => {
      if (response) {
        fetch(`${baseUrl}admin/user/${id}`, {
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
                title: "کاربر با موفقیت حذف شد",
                icon: "success",
                buttons: 'باشه'
              }).then(response => {
                console.log(response);

                getCourses();
              })
            } else {
              swal({
                title: "مشکلی در حذف بوجود آمد!",
                icon: "error",
                buttons: 'باشه'
              }).then(response => {
                getCourses();
              })
            }

          })

      }
    })
  }
  return (
    <>
      <div className='mt-5 mb-5 pb-5'>
        {
          loader ?
            <SniperLoader />
            :

            <>

              <div className='admin-Data-box w-100 py-4 br-10 px-2'>
                <div className=' d-flex justify-content-between'>
                  <div className='fs20'>لیست <span className='text-primary'>کاربران</span>
                    <button className='btn btn-primary ms-2 me-3' onClick={handleExportUsers}>خروجی اکسل</button>
                    <Link className='btn-link btn me-1' to='/admin-panel/add-user'>افزودن کاربر جدید</Link>
                  </div>


                  <div className='d-flex align-items-center fs15'>
                    <span>فیلتر:</span>
                    <select name="" id="" className='form-control me-2 fs15'
                      onChange={(e) => handleUserFilter(e.target.value)}
                    >
                      <option value="all">همه کاربران</option>
                      <option value="plan">کاربرانی که خرید برنامه داشته اند</option>
                      <option value="course">کاربرانی که  خرید دوره داشته اند</option>
                      <option value="course_plan">کاربرانی که خرید برنامه و دوره داشته اند</option>
                      <option value="no">کاربرانی که هیچ خریدی نداشته اند</option>
                    </select>

                  </div>
                </div>
                {
                  paginateUsers.length !== 0 ?
                    <Table className='box-child-table mt-4' hover>
                      <thead>
                        <tr>

                          <th>نام</th>
                          <th>شماره تلفن</th>
                          <th>عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          paginateUsers.map((user, index) =>
                            <tr key={user.id}>

                              <td>{user.name}</td>
                              <td>{user.phone}</td>

                              <td>
                                {
                                  user.admin != true &&
                                  <button className='btn btn-danger btn-sm'
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    حذف
                                  </button>
                                }

                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </Table>
                    :
                    <>
                      <div className="mt-5"><ErrorBox text='کاربری ای یافت نشد' /></div>
                    </>

                }
                {
                  <Pagination
                    items={shownUsers}
                    itemsCount={20}
                    pathname={`/admin-panel/users`}
                    setShownCourses={setPaginateUsers}
                  />

                }
              </div>
            </>

        }

      </div>
    </>
  )
}
