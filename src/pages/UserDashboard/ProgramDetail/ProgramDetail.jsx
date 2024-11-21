import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { IoMdCloudDownload } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { BiBaguette } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { GoFileZip } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import PlanRequired from '../../../components/PlanRequired/PlanRequired';

export default function SendTicket() {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [tab, setTab] = useState('programs')
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const [getCurrentImg, setGetCurrentImg] = useState(null)



    const [images, setImages] = useState([])
    const [programs, setPrograms] = useState([])
    const [sizes, setSizes] = useState([])
    const [question, setQuestion] = useState([])
    const orderId = useParams().id



    const getOrderDetail = () => {
        fetch(`${baseUrl}get-order-detail/${orderId}`, {
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
    }

    useEffect(() => {
        getOrderDetail()
    }, [])

    return (

        <PlanRequired>
            <Row className='mt-4'>
                <Col>
                    <div className='bg-white br-10'>
                        <div className='d-flex align-items-center'>
                            <div className={`py-3 me-4 ${tab === 'programs' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('programs')}>
                                <GoFileZip fontSize={19} />
                                <span className='fflalezar fs15 me-1 c-text-secondary'>برنامه های  تمرینی</span>
                            </div>
                            <div className={`py-3 me-4 ${tab === 'size' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('size')}>
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


                        </div>
                    </div>


                    <div className='bg-white p-3 br-10 mt-3 mb-4'>
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
                                        <div className='bg-danger fflalezar br-10 text-white p-3'>اطلاعاتی ثبت نکرده اید</div>
                                }
                            </div>
                        }
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
                                                <Col md='3' className='text-center text-md-end'>
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
                                                <Col md='9' className='text-center mt-4 mt-md-0'>
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
                            <div>
                                {programs.length !== 0 ?
                                    programs.map((program, index) =>
                                        <div key={program.id} className='fflalezar d-flex justify-content-between align-items-center p-2 br-10 px-3 bg-body-tertiary mt-3'>
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
                                    <div className='fflalezar bg-danger text-white br-10 p-3'>برنامه ای وجود ندار.</div>}
                            </div>


                        }
                    </div>



                </Col>
            </Row >
        </PlanRequired>
    )
}
