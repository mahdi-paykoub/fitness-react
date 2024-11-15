import React, { useEffect, useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import DataBox from "../../../components/AdminPanel/DataBox/DataBox";
import Table from "react-bootstrap/Table";
import ErrorBox from "../../../components/AdminPanel/ErrorBox/ErrorBox";
import FormBox from "../../../components/AdminPanel/FormBox/FormBox";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

let nextId = 0;
export default function PanelPlans() {
    const [plans, setPlans] = useState([])

    const [loader, setLoader] = useState(true)

    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))


    const getPlans = () => {
        fetch(`${baseUrl}admin/plan`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setPlans(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getPlans()
    }, [])

    const showDescription = (description) => {
        swal({
            text: description,
            buttons: 'باشه'
        })
    }

    const handleDeletePlan = (id) => {
        swal({
            title: 'آیا از حذف اطمینان دارید؟',
            icon: "error",
            buttons: ['خیر', 'بله']
        }).then(response => {
            if (response) {
                fetch(`${baseUrl}admin/plan/${id}`, {
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
                                title: "برنامه با موفقیت حذف شد",
                                icon: "success",
                                buttons: 'باشه'
                            }).then(response => {
                                getPlans();
                            })
                        } else {
                            swal({
                                title: "مشکلی در حذف بوجود آمد!",
                                icon: "error",
                                buttons: 'باشه'
                            }).then(response => {
                                getPlans();
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
                        plans.length !== 0 ?
                            <DataBox title='برنامه ها'>
                                <Table className='box-child-table mt-4' hover>
                                    <thead>
                                        <tr>
                                            <th>نام دوره</th>
                                            <th>نامک</th>
                                            <th>قیمت اصلی</th>
                                            <th>قیمت با تخفیف</th>
                                            <th>عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {plans.map((plan, index) =>
                                            <tr key={plan.id}>

                                                <td>{plan.title}</td>
                                                <td>{plan.slug}</td>
                                                <td>{plan.price === 0 ? 'رایگان' : Number(plan.price).toLocaleString()}</td>
                                                <td>{plan.off_price === null ? 'ندار' : Number(plan.off_price).toLocaleString()}</td>

                                                <td>
                                                    <Link className='btn btn-primary btn-sm'
                                                        to={`/admin-panel/update-plan/${plan.slug}`}
                                                    >
                                                        آپدیت
                                                    </Link>
                                                    <button className='btn btn-danger btn-sm me-2'
                                                        onClick={() => handleDeletePlan(plan.slug)}
                                                    >
                                                        حذف
                                                    </button>
                                                </td>
                                            </tr>)
                                        }


                                    </tbody>
                                </Table>

                            </DataBox>
                            : <ErrorBox text='برنامه ای یافت نشد' />
                }

            </div>
        </>
    )
}
