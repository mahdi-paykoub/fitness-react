import { React, useState, useEffect, useContext } from 'react'
import ErrorBox from '../../../components/AdminPanel/ErrorBox/ErrorBox';
import { Link, useParams } from 'react-router-dom';
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import { Col, Row } from 'react-bootstrap';
import { CiBarcode } from 'react-icons/ci';
import { IoCopyOutline } from 'react-icons/io5';
import { FaAddressCard, FaRegAddressCard, FaRegUser, FaStar } from 'react-icons/fa';
import { MdOutlineNumbers } from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6';
import MyModal from '../../../components/MyModal/MyModal';
import { useForm } from 'react-hook-form';
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";

function PanelSattlementInfo() {
    const [modalShow, setModalShow] = useState(false);
    const [bankInf, setBankInf] = useState(null);
    const [subCodeInfo, setSubCodeInfo] = useState(null);
    const [settlement, setSettlement] = useState(null);
    const [settlTypeText, setSettlTypeText] = useState('');
    const [settlType, setSettlType] = useState('');
    const [forW, setForW] = useState('');
    const [loader, setLoader] = useState(true)
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const settlement_id = useParams().settlement_id
    const baseUrl = process.env.REACT_APP_BASE_URL


    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;
    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('message', data.message)
        formData.append('_method', 'PUT')


        fetch(`${baseUrl}admin/settlement/${settlement_id}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                console.log(response);

                if (response.status !== false) {
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then(response => {
                        reset();
                        setModalShow(false)
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
    const getUserBankInfo = () => {

    }
    const getCourses = () => {
        fetch(`${baseUrl}admin/get-user-subCode-info/${settlement_id}`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setBankInf(res.bankInfo)
                setSubCodeInfo(res.data)
                setSettlement(res.settlement)
                setSettlType(res.settlement.type)
                if (res.data != null) {
                    if (res.data.for == 'plan') {
                        setForW('دوره')
                    } if (res.data.for == 'course') {
                        setForW('برنامه')
                    } if (res.data.for == 'all') {
                        setForW('برنامه و دوره')
                    }
                }

                if (res.settlement.type == 'plan') {
                    setSettlTypeText('کد تخفیف برای خرید برنامه')
                } if (res.settlement.type == 'course') {
                    setSettlTypeText('کد تخفیف برای خرید دوره')
                } if (res.settlement.type == 'cash') {
                    setSettlTypeText('درخواست دریافت نقدی')
                }
                setLoader(false)
            })
    }


    useEffect(() => {
        getCourses()
    }, [])


    const handleUserScore = () => {
        swal({
            title: 'فقط در صورتی که تسویه انجام شده است، امتیاز کاربر را صفر نمایید. صفر شود؟',
            icon: "error",
            buttons: ['خیر', 'بله']
        }).then(response => {
            if (response) {
                fetch(`${baseUrl}admin/zero-update/${subCodeInfo.id}`, {
                    headers: {
                        Authorization: `Bearer ${userTokenLS.token}`
                    },
                })
                    .then(response =>
                        response.json()
                    )
                    .then(res => {

                        if (res.status !== false) {
                            swal({
                                title: res.message[0],
                                icon: "success",
                                buttons: 'باشه'
                            }).then(response => {
                                getCourses();
                            })
                        } else {
                            swal({
                                title: res.message[0],
                                icon: "error",
                                buttons: 'باشه'
                            })
                        }

                    })

            }
        })
    }
    return (<>
        <div className='mb-5'>
            {
                loader ?
                    <SniperLoader />
                    :
                    subCodeInfo != null ?

                        <div className='admin-Data-box w-100  br-10 px-2'>
                            <div className='d-flex justify-content-between align-items-center text-secondary p-4 border-bottom'>
                                <div className='d-flex align-items-center'>
                                    <FaRegUser fontSize={20} className='ms-2' />

                                    {subCodeInfo.user.name}
                                </div>
                                <div className='d-flex align-items-center'>
                                    <FaPhoneFlip fontSize={18} className='ms-2' />

                                    {subCodeInfo.user.phone}
                                </div>
                                <div>
                                    <button className='btn btn-secondary btn-sm'>
                                        {
                                            settlTypeText
                                        }
                                    </button>
                                    {
                                        settlement.status == 1 ?
                                            <button className='btn btn-success btn-sm me-3'>
                                                پاسخ داده شده
                                            </button>
                                            :
                                            <button className='btn btn-danger btn-sm me-3'>
                                                بدون پاسخ
                                            </button>
                                    }

                                </div>
                            </div>
                            <Row className="">
                                <Col>
                                    <div className="bg-white br-10 p-3 fs14 lh2 border-bottom">
                                        <div className="fflalezar fs18 text-secondary d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <CiBarcode fontSize={25} className="color-2" />
                                                <div className=" me-1">کد اشتراک در فروش شما:</div>
                                            </div>
                                            <div className="me-2 d-flex align-items-center">
                                                <div>{subCodeInfo.code}</div>
                                                <IoCopyOutline className="me-2" />

                                            </div>
                                        </div>

                                    </div>

                                </Col>
                            </Row >
                            <Row>
                                <Col className=' border-bottom'>
                                    <div className="bg-white br-10 p-3 lh2 mt-3">
                                        <Row className="align-items-center">
                                            <Col lg='6' className="text-center">
                                                <div className="pe-4 fflalezar text-secondary fs18">
                                                    <div className="d-flex align-items-center">
                                                        <div>از نوع:</div>
                                                        <div className="me-1">{
                                                            subCodeInfo.type == 'percent' ? 'درصدی' : 'مبلغ ثابت'
                                                        }</div>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-3">
                                                        <div>میزان تخفیف :</div>
                                                        <div className="me-1">{
                                                            subCodeInfo.type == 'percent' ?
                                                                <span>{subCodeInfo.value} %</span>
                                                                :
                                                                <>
                                                                    {Number(subCodeInfo.value).toLocaleString()}
                                                                    <span className="fs14"> تومان</span>
                                                                </>
                                                        }</div>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-3">
                                                        <div>برای  :</div>
                                                        <div className="me-1">
                                                            {forW}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-3">
                                                        <div>وضعیت  :</div>
                                                        <div className="me-1 color-2">{subCodeInfo.active == 1 ? 'فعال' : 'غیر فعال'}</div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg='6' className="text-center">
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <div className="circle-box-usage text-center d-flex align-items-center justify-content-center fs30 fflalezar text-secondary mx-auto">
                                                            {subCodeInfo.usage}
                                                        </div>
                                                        <div className="mt-2 fflalezar text-secondary d-flex align-items-center justify-content-center">
                                                            <MdOutlineNumbers className="ms-2 text-secondary" fontSize={20} />

                                                            <div className="mt-1 ">
                                                                تعداد استفاده
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="me-4">
                                                        <div className="circle-box-usage text-center bg-warning d-flex align-items-center justify-content-center fs30 fflalezar text-white mx-auto"
                                                        >
                                                            {subCodeInfo.score}
                                                        </div>
                                                        <div className="mt-2 fflalezar text-secondary d-flex align-items-center justify-content-center ">
                                                            <FaStar className="ms-2 text-warning" fontSize={20} />

                                                            <div className="pt-1">امتیاز کاربر</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='d-flex my-4 px-4'>
                                        <button className='btn btn-primary' variant="primary" onClick={() => setModalShow(true)}>تسویه</button>
                                        <button className='btn btn-primary me-2' onClick={handleUserScore}>صفر کردن امتیاز کاربر</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>


                        :
                        <ErrorBox text='اطلاعات یافت نشد' />
            }

            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <div className='p-4'>
                    <div className='fflalezar fs20 color-2'>
                        <FaAddressCard fontSize={24} className='ms-2 mb-2' />
                        تسویه
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {

                            <>
                                <div className='mt-3'>
                                    {
                                        (settlType == 'plan' || settlType == 'course') ?
                                            <div className='fs14 ffir mb-3 lh2'>
                                                ادمین گرامی کاربر درخواست کد تخفیف برای
                                                <span className='text-primary'> {settlType == 'plan' ? 'برنامه ورزشی' : 'دوره آموزشی'} </span>
                                                را کرده است،
                                                درصورتی که میخواهید کد تخفیف برای کاربر اختصاص دهید ابتدا کد تخفیف را در صفحه مربوطه بسازید سپس از طریق پیام برای کاربر ارسال کنید.
                                            </div>
                                            :
                                            <>
                                                <div className='fs14 ffir mb-3 lh2'>
                                                    ادمین گرامی، کاربر درخواست تسویه حساب به صورت <span className='text-primary'> نقدی </span> را دراد.
                                                </div>
                                                <div className='d-'>
                                                    {
                                                        bankInf == null ?
                                                            <div className='bg-info fs14 text-white p-3 br-10'>
                                                                کاربر اطلاعات حساب خود را وارد نکرده است
                                                            </div>

                                                            :
                                                            <>
                                                                <div>
                                                                    <div className='mb-2 fs14'>نام دارنده حساب :</div>
                                                                    <input type="text" disabled={true} value={bankInf.name} className='form-control' />
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <div className='mb-2 fs14'>شماره شبا:</div>
                                                                    <input type="text" dir='ltr' disabled={true} value={bankInf.sheba} className='form-control' />
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <div className='mb-2 fs14'>شماره کارت:</div>
                                                                    <input type="text" dir='ltr' disabled={true} value={bankInf.sheba} className='form-control' />
                                                                </div>
                                                                {/* <div>
                                                                    <div className='mb-2 fs14'>شماره شبا:</div>
                                                                    <input type="text" disabled={true} value={setBankInf.sheba} />
                                                                </div> */}
                                                            </>
                                                    }

                                                </div>
                                            </>

                                    }

                                    <textarea style={{ 'height': '100px' }} className='w-100 c-input p-2 mt-4' placeholder='پیام شما'
                                        {...register('message', formValidation('پیام'))}

                                    ></textarea>
                                    <p className='text-danger px-2 fs13'>
                                        {errors.message?.message}
                                    </p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Link to='/admin-panel/add-offs' className='btn btn-danger btn-s fflalezar'>ساخت کد تخفیف</Link>
                                    <button className='btn btn-primary btn-s fflalezar'>ارسال پیام</button>
                                </div>
                            </>



                        }


                    </form>
                </div>

            </MyModal>
        </div>
    </>);
}

export default PanelSattlementInfo;