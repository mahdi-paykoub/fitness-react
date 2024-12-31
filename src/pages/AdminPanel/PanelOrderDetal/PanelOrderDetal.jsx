import React, { useEffect, useState } from 'react'
import { BiBaguette } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { Col, Row, Table } from 'react-bootstrap';
import { Link, useParams, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import MyModal from '../../../components/MyModal/MyModal';
import { SiAnswer } from "react-icons/si";
import { GoFileZip } from "react-icons/go";
import { IoMdCloudDownload } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import BtnSpiner from '../../../components/BtnSpiner/BtnSpiner';

export default function PanelOrderDatail() {
    const [btnLoader, setBtnLoader] = useState(false)

    const [tab, setTab] = useState('size')
    const [otherOrders, setOtherOrders] = useState([])
    const [getCurrentImg, setGetCurrentImg] = useState(null)
    const [images, setImages] = useState([])
    const [programs, setPrograms] = useState([])
    const [sizes, setSizes] = useState([])
    const [question, setQuestion] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const location = useLocation();
    const orderId = useParams().id
    const userId = useParams().userId
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;
    let statusText = ''
    let statusClass = ''
    const onSubmit = (data) => {
        setBtnLoader(true)
        let formData = new FormData()
        formData.append('title', data.title)
        formData.append('user_info_status_id', data.user_info_status_id)
        formData.append('file', data.file[0])


        fetch(`${baseUrl}admin/program`,
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
                    }).then((res) => {
                        reset()
                        getUserInfo()
                        setBtnLoader(false)
                    })
                } else {
                    swal({
                        title: response.message[0],
                        icon: "error",
                        buttons: 'باشه'
                    }).then((res) => {
                        setBtnLoader(false)
                    })
                }

            })
    }


    const getUserInfo = () => {
        fetch(`${baseUrl}admin/get-user-info-by-order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },

        })
            .then(res => res.json())
            .then(res => {
                setPrograms(res.programs)
                setSizes(res.userSize)
                setQuestion(res.questions)
                setImages(res.image)
            })
        fetch(`${baseUrl}admin/get-other-orders/${orderId}/${userId}`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },

        })
            .then(res => res.json())
            .then(res => {
                setOtherOrders(res.otherOrders)
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [location.pathname])

    return (
        <>
            <div className='admin-Data-box w-100 br-10 p-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <span className='fs15 ms-2'>برنامه سفارش داده شده:</span>
                        نام برنامه
                    </div>
                    <div className='d-flex align-items-center'>
                        {
                            programs.length === 0 ?
                                <div className='fs15 ms-2 text-danger'>
                                    برنامه ارسال نشده است
                                </div>
                                :
                                <div className='fs15 ms-2 text-primary'>
                                    {programs.length}
                                    <span className='me-1'>برنامه ارسال شده است</span>
                                </div>
                        }

                        <button className='btn btn-primary me-2' variant="primary" onClick={() => setModalShow(true)}>
                            ارسال برنامه
                        </button>

                    </div>
                </div>
            </div>
            <div className='admin-Data-box w-100 br-10 px-3 mt-3'>
                {/* tabs */}
                <div className='left-user-info-box bg-white br-10'>
                    <div className='d-flex align-items-center'>
                        <div className={`py-3 me-1 ${tab === 'size' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('size')}>
                            <BiBaguette fontSize={20} />
                            <span className='fflalezar me-1'>سایز ها</span>
                        </div>
                        <div className={`py-3 me-4 ${tab === 'image' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('image')}>
                            <IoMdImages fontSize={20} />
                            <span className='fflalezar me-1 c-text-secondary'> تصاویر</span>
                        </div>
                        <div className={`py-3 me-4 ${tab === 'question' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('question')}>
                            <LuClipboardCheck fontSize={19} />
                            <span className='fflalezar me-1 c-text-secondary'>سوالات</span>
                        </div>
                        <div className={`py-3 me-4 ${tab === 'programs' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('programs')}>
                            <GoFileZip fontSize={19} />
                            <span className='fflalezar fs15 me-1 c-text-secondary'>برنامه های ارسال شده</span>
                        </div>

                    </div>
                </div>

            </div>
            {

                <>
                    <div className='admin-Data-box w-100 py-4 br-10 px-3 mt-3'>
                        <div>
                            {
                                tab === 'size' &&
                                <div>
                                    {
                                        sizes !== null ?
                                            <Row className='fflalezar'>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>قد</div>
                                                        <div>{sizes.height}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>وزن</div>
                                                        <div>{sizes.weight}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور گردن</div>
                                                        <div>{sizes.neck}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور شانه  </div>
                                                        <div>{sizes.shoulder}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور بازو در حالت عادی</div>
                                                        <div>{sizes.arm}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور بازو در حالت منقبض</div>
                                                        <div>{sizes.contracted_arm}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور ساعد</div>
                                                        <div>{sizes.forearm}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور مچ دست</div>
                                                        <div>{sizes.wrist}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور سینه</div>
                                                        <div>{sizes.chest}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور شکم</div>
                                                        <div>{sizes.belly}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور کمر</div>
                                                        <div>{sizes.waist}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور باسن</div>
                                                        <div>{sizes.hips}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور ران</div>
                                                        <div>{sizes.thigh}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور ساق</div>
                                                        <div>{sizes.leg}</div>
                                                    </div>
                                                </Col>
                                                <Col lg='4' className='mt-3'>
                                                    <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                                        <div>دور مچ پا</div>
                                                        <div>{sizes.ankle}</div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            :
                                            <div className='bg-danger fflalezar br-10 text-white p-3'>کاربر اطلاعاتی ثبت نکرده است.</div>
                                    }
                                </div>
                            }
                            {/* second */}
                            {
                                tab === 'question' &&
                                <div>
                                    {
                                        question !== null ?
                                            <>
                                                <div div className='bg-c-sec p-3 mt-3'>
                                                    <div className='fs14 fw-bold'>
                                                        1- آیا سابقه دریافت برنامه تمرینی از مربی همراه را دارید؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.us_hsitory === 1 ? 'بله' : 'خیر'
                                                        }
                                                    </div>
                                                </div>
                                                <div div className='p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        2- اندام ایده آل و هدفتون رو شرح بدید؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.ideal_body
                                                        }
                                                    </div>
                                                </div>
                                                <div div className='bg-c-sec p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        3- تمامی سوابق ورزشی خود را شرح دهید؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.sport_history
                                                        }
                                                    </div>
                                                </div>
                                                <div div className='p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        4- محل تمرین شما؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.training_place
                                                        }
                                                    </div>
                                                </div>
                                                <div div className='bg-c-sec p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        5- آسیب دیدگی فیزیکی یا محدودیت در اجرای تمرین خاصی را دارید؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.physical_injury === 0 ?
                                                                'خیر'
                                                                :
                                                                <div><span className='text-primary'>بله</span> -  {question.physical_injury_text}</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div div className='p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        6- آیا بیماری و یا ضعف قلبی عروقی و یا تنفسی دارید؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.heart_disease === 0 ?
                                                                'خیر'
                                                                :
                                                                <div><span className='text-primary'>بله</span> -  {question.heart_disease_text}</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div div className='bg-c-sec p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        7- آیا حساسیت گوارشی دارید؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.gastro_sensitivity === 0 ?
                                                                'خیر'
                                                                :
                                                                <div><span className='text-primary'>بله</span> -  {question.gastro_sensitivity_text}</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div div className='p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        8- حرارت بدن شما بطور معمول چگونه است؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.body_heat
                                                        }
                                                    </div>
                                                </div>
                                                <div div className='bg-c-sec p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        9- آیا داروی خاصی مصرف میکنید؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.medicine === 0 ?
                                                                'خیر'
                                                                :
                                                                <div><span className='text-primary'>بله</span> -  {question.medicine_text}</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div div className='p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        10- آیا سیگار یا الکل مصرف میکنید؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.smoking === 0 ?
                                                                'خیر'
                                                                :
                                                                <div><span className='text-primary'>بله</span> -  {question.smoking_text}</div>
                                                        }
                                                    </div>
                                                </div>

                                                <div div className='bg-c-sec p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        11- اشتهای شما به غذا چگونه است؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.appetite
                                                        }
                                                    </div>
                                                </div>

                                                <div div className='p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        12- دفعات حدودی دفع مدفوع طی روز یا هفته را شرح دهید؟*
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.frequency_defecation
                                                        }
                                                    </div>
                                                </div>


                                                <div div className='bg-c-sec p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        13- آیا آزمایش آنزیم های کبدی داده اید؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.liver_enzymes === 0 ?
                                                                'خیر'
                                                                :
                                                                <div><span className='text-primary'>بله</span> -  {question.liver_enzymes_text}</div>
                                                        }
                                                    </div>
                                                </div>

                                                <div div className='p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        14- سابقه مصرف مکمل یا دارو های استروئیدی دارید؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.history_steroid === 0 ?
                                                                'خیر'
                                                                :
                                                                <div><span className='text-primary'>بله</span> -  {question.history_steroid_text}</div>
                                                        }
                                                    </div>
                                                </div>

                                                <div div className='bg-c-sec p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        15- آیا در این دوره تمایل به مصرف مکمل دارید(جهت طراحی زمان و مقدار مصرف)؟
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.supplement_use === 0 ?
                                                                'خیر'
                                                                :
                                                                <div><span className='text-primary'>بله</span> -  {question.supplement_use_text}</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div div className='p-3'>
                                                    <div className='fs14 fw-bold'>
                                                        16- هر موردی که داخل سوالات ما نبود ولی احساس میکنی باید بدونیم را کامل بنویس؟*
                                                    </div>
                                                    <div className='fs13 mt-3'>
                                                        {
                                                            question.final_question
                                                        }
                                                    </div>
                                                </div>
                                            </>

                                            :
                                            <div className='bg-danger fflalezar br-10 text-white p-3'>سوالات را پاسخ نداده اید.</div>
                                    }
                                </div>

                            }
                            {
                                tab === 'image' &&

                                <div>
                                    {
                                        images !== null ?
                                            <>
                                                <Row>
                                                    <Col lg='3'>
                                                        <div>
                                                            <button className='send-btn px-3 fflalezar mt-3'
                                                                onClick={() => setGetCurrentImg(images.front)}
                                                            >تصویر جلوی بدن</button>
                                                        </div>
                                                        <div>
                                                            <button className='send-btn px-3 fflalezar mt-3'
                                                                onClick={() => setGetCurrentImg(images.back)}
                                                            >تصویر پشت بدن</button>
                                                        </div>
                                                        <div>
                                                            <button className='send-btn px-3 fflalezar mt-3'
                                                                onClick={() => setGetCurrentImg(images.side)}
                                                            >تصویر پهــلو بدن</button>
                                                        </div>
                                                    </Col>
                                                    <Col lg='9' className='text-center'>
                                                        <img style={{ 'maxHeight': '400px' }} className='mw-100 br-10' src={`${baseUrl}${getCurrentImg}`} alt="" />
                                                    </Col>
                                                </Row>

                                            </>
                                            :
                                            <div className='bg-danger fflalezar br-10 text-white p-3'> تصویری آپلود نشده است.</div>

                                    }
                                </div>

                            }

                            {
                                tab === 'programs' &&
                                <>
                                    {
                                        programs.length !== 0 ?
                                            programs.map((program, index) =>
                                                <div key={program.id} className='d-flex justify-content-between align-items-center p-2 br-10 px-3 bg-body-tertiary mt-3'>
                                                    <div>
                                                        {index + 1}.
                                                        <span className='me-1'>{program.title}</span>

                                                    </div>
                                                    <a download={true} href={`${baseUrl}${program.file}`} >
                                                        <div className='text-primary cursor-pointer d-flex align-items-center'>



                                                            <IoMdCloudDownload fontSize={25} />
                                                            <div className='me-2 mt-1'>دانلود برنامه</div>


                                                        </div>
                                                    </a>
                                                </div>)
                                            :
                                            <div className='fflalezar bg-danger text-white br-10 p-3'>برنامه ای وجود ندار.</div>
                                    }
                                </>
                            }


                        </div>

                    </div>
                    <div className='admin-Data-box w-100 py-4 br-10 px-3 mt-3'>
                        <FiShoppingBag fontSize={19} />
                        <span className='fflalezar fs15 me-1 c-text-secondary'>دیگر سفارشات این کاربر</span>
                        <div className='mt-4'>
                            {
                                otherOrders.length !== 0 ?

                                    <Table className='box-child-table' hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>وضعیت سفارش </th>
                                                <th>مراجعه حضوری</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {otherOrders.map((order, index) => {
                                                // if (order.status === 'complete') {
                                                switch (order.status) {
                                                    case 'complete':
                                                        statusText = 'تکمیل اطلاعات'
                                                        statusClass = 'btn-success'
                                                        break;
                                                    case 'paid_uncomplete':
                                                        statusText = 'تکمیل نشده'
                                                        statusClass = 'btn-danger'
                                                        break;
                                                    case 'received_program':
                                                        statusText = 'برنامه دریافت کرده'
                                                        statusClass = 'btn-secondary'
                                                        break;

                                                    default:
                                                        break;
                                                }
                                                return <tr key={order.id}>
                                                    <td>
                                                        {index + 1}
                                                    </td>

                                                    <td>
                                                        <button className={`btn btn-sm ${statusClass}`}>
                                                            {statusText}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        {
                                                            order.visit ?
                                                                <button className='btn btn-info fflalezar btn-sm text-white'>دارد</button>
                                                                :
                                                                <button className='btn btn-danger fflalezar btn-sm '>ندارد</button>
                                                        }
                                                    </td>
                                                    <td>
                                                        <Link to={`/admin-panel/order-detail/${order.id}/${userId}`} className='btn btn-primary btn-sm'>
                                                            مشاهده
                                                        </Link>
                                                    </td>

                                                </tr>
                                                // }
                                            }

                                            )
                                            }


                                        </tbody>
                                    </Table>
                                    :
                                    <div className='bg-info text-white br-10 p-3'>این کاربر برنامه دیگری ندارد.</div>
                            }
                        </div>
                    </div>
                </>
            }
            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                {
                    sizes !== null ?
                        <div className='p-4'>
                            <div className='fflalezar fs20 color-2'>
                                <SiAnswer fontSize={20} className='ms-2' />
                                ارسال برنامه
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className='mt-3'>
                                    <input type="hidden" defaultValue={sizes.user_info_status_id}
                                        {...register('user_info_status_id', formValidation('آیدی'))}
                                    />
                                    <input type="text" className='px-1 mt-1 c-input w-100' placeholder='عنوان برنامه'
                                        {...register('title', formValidation('عنوان'))}
                                    />
                                    <input type="file" className='mt-3 form-control w-100' placeholder='قایل'
                                        {...register('file', formValidation('قایل'))}
                                    />
                                    <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                        {errors.title?.message}
                                    </p>
                                </div>
                                <div className='text-start mt-2'>
                                    {
                                        btnLoader == false ?
                                            <button className='fflalezar send-btn px-4'>ارسال </button>
                                            :
                                            <button type='button' className='send-btn fflalezar px-4 pt-2'>
                                                <BtnSpiner wid='25px' he='25px' />
                                            </button>

                                    }

                                </div>
                            </form>
                        </div>
                        :
                        <div className='p-4'>برای ارسال برنامه کاربر حتما باید اطلاعاتش را ثبت کرده باشد</div>
                }



            </MyModal>
        </>
    )
}
