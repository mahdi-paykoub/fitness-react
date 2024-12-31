import { React, useState, useEffect } from 'react'
import { Col, Row, Table } from "react-bootstrap";
import MyModal from "../../components/MyModal/MyModal";
import { SiAnswer } from "react-icons/si";
import swal from "sweetalert";
import { formValidation } from "../../utils/Validations";
import { useForm } from "react-hook-form";
import { TbCubeSend } from "react-icons/tb";
import SniperLoader from '../../components/SniperLoader/SniperLoader';
import ErrorBox from '../../components/AdminPanel/ErrorBox/ErrorBox';

function ContactIndex() {
    const [modalShow, setModalShow] = useState(false);
    const [reco, setReco] = useState([]);
    const [loader, setLoader] = useState(true)

    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;
    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('title', data.title)


        fetch(`${baseUrl}add-share-request`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if (response.status !== false) {
                    setModalShow(false)
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then(response => {
                        reset();
                        getCourses();
                    })

                } else {
                    swal({
                        title: response.message[0],
                        icon: "error",
                        buttons: 'باشه'
                    }).then(response => {

                    })
                }

            })
    }


    const getCourses = () => {
        fetch(`${baseUrl}get-user-subCode-request`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setReco(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getCourses()
    }, [])


    return (<>
        <Row className="mt-3">
            <Col>
                <div className="bg-white br-10 p-3 fs14 lh2">
                    {/* <Row className="justify-content-center lh2">
                        <Col lg='8'> */}
                    <div> سلام مربی همراهی عزیز!</div>
                    <div className="mt-1">کاربر گرامی، در صورتی که قصد همکاری در فروش را دارید از طریق این پنل میتوانید
                        درخواست خود را برای ما ارسال نمایید تا کد همکاری در فروش برای شما اختصاص گیرد.
                        بعد از دریافت کد، به ازای هر خرید از طریق این کد، امتیازی برای شما
                        تعلق میگیرد که میتوانید این امتیاز را به صورت گوناگون استفاده نمایید.
                    </div>
                    <div className="text-start">
                        <button className="send-btn fflalezar px-3 mt-4" onClick={() => setModalShow(true)}>درخواست کد معرف</button>
                    </div>
                    {/* </Col>
                    </Row> */}
                </div>
                <div className="bg-white br-10 p-3 mt-3 lh2 mb-5">



                    <div className='mt4'>
                        {
                            loader ?
                                <SniperLoader />
                                :
                                reco.length !== 0 ?

                                    <>
                                        <div className="fs14">
                                            <TbCubeSend fontSize={30} className="ms-1 text-secondary" />

                                            درخواست ارسال شده
                                        </div>
                                        <Table Table className='box-child-table mt-4 fflalezar' hover>
                                            <thead>
                                                <tr>
                                                    <th>عنوان درخواست</th>
                                                    <th>وضعیت</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {reco.map((course, index) =>
                                                    <tr key={course.id}>
                                                        <td>{course.title}</td>
                                                        <td>{course.has_code == 0 ?
                                                            <button className='btn btn-outline-danger btn-sm'>
                                                                در انتظار دریافت کد
                                                            </button>
                                                            :
                                                            <button className='btn btn-success btn-sm'>
                                                            کد ارسال شده است   
                                                            </button>
                                                        }</td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </Table>
                                    </>


                                    : <div className='text-center mt-4'>
                                        <img src="/images/undraw_no_data_re_kwbl.svg" className='w-25' alt="" />
                                        <div className='mt-3 text-secondary fs13'>
                                            درخواستی ارسال نشده
                                        </div>
                                    </div>
                        }


                    </div>
                </div>
            </Col>
        </Row >

        <MyModal
            show={modalShow}
            onHide={() => setModalShow(false)}

        >
            <div className='p-4'>
                <div className='fflalezar fs20 color-2'>
                    <SiAnswer fontSize={20} className='ms-2' />
                    ارسال درخواست
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='mt-3'>
                        <input type="text" id='mess_file' className='c-input w-100 px-2'
                            {...register('title', formValidation('عنوان'))} placeholder='عنوان درخواست:مثلا برای باشگاه بدنسازی...' />

                    </div>
                    <div className='text-start mt-3'>
                        <button className="send-btn fflalezar px-3">ارسال درخواست</button>
                    </div>
                </form>
            </div>

        </MyModal>
    </>);
}

export default ContactIndex;