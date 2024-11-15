import { React, useState, useEffect, useContext } from 'react'
import Chart from "chart.js/auto";
import { Col, Row, Container } from 'react-bootstrap'
import { LuTicket } from "react-icons/lu";
import { FaPlay } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa6";
import { Doughnut } from 'react-chartjs-2';
import { Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { IoMdImages } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { BiBaguette } from "react-icons/bi";
import { IoMdRemoveCircle } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import PlanRequired from '../../../components/PlanRequired/PlanRequired';

Chart.register(CategoryScale);

export default function IndexDashboard() {
    const [userData, setUserData] = useState([])
    const [charData, setcharData] = useState([])

    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))




    const getUserData = () => {
        fetch(`${baseUrl}get-user-data`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.lastPercentage) {
                    setUserData(res)
                    setcharData({
                        datasets: [
                            {
                                data: [res.lastPercentage.length / 4 * 100, 100 - (res.lastPercentage.length / 4 * 100)],
                                backgroundColor: [
                                    "#41bfa8",
                                    "#ecf0f1",
                                ],

                            }
                        ]
                    })

                }


            })
    }


    useEffect(() => {
        getUserData()
    }, [])
    return (
        <>
            <PlanRequired>
                <Container>
                    <Row className='mt-4'>
                        <Col lg={8}>
                            <div className='index-dash-info'>
                                <Row className=''>
                                    <Col lg={9}>
                                        <img className='w-100' src="images/banner/MANIK - Business & Teamwork Illustration Pack-08.png" alt="" />
                                    </Col>
                                    <Col lg={3} className='left-dash-box pt-4'>
                                        <div className='text-white text-center'>
                                            <div className='fflalezar'>
                                                مجموع سفارشات شما
                                            </div>
                                            <div className='fw-bold c-text fflalezar'>
                                                {
                                                    userData.length !== 0 &&
                                                    userData.courseCount + userData.planCount
                                                }
                                            </div>

                                            <div className='d-flex d-lg-block justify-content-around'>
                                                <div className='d-flex align-items-center mt-3'>
                                                    <div className='glass-info-box d-flex justify-content-center align-items-center'>
                                                        <FaRegCreditCard fontSize={23} />
                                                    </div>
                                                    <div className='fs15 me-2 text-end fflalezar'>
                                                        برنامه تمرینی
                                                        <div className=' fs14'>
                                                            <span className='fflalezar'>    {
                                                                userData.length !== 0 &&
                                                                userData.planCount
                                                            } </span>
                                                            <span className='fflalezar'> دوره </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='d-flex align-items-center mt-4'>
                                                    <div className='glass-info-box d-flex justify-content-center align-items-center'>
                                                        <FaPlay fontSize={23} />
                                                    </div>
                                                    <div className='fs15 me-2 text-end fflalezar'>
                                                        دوره های من
                                                        <div className=' fs14'>
                                                            <span className='fflalezar'>    {
                                                                userData.length !== 0 &&
                                                                userData.courseCount
                                                            } </span>
                                                            <span className='fflalezar'> دوره </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center mt-3'>
                                                    <div className='glass-info-box d-flex justify-content-center align-items-center'>
                                                        <LuTicket fontSize={23} />
                                                    </div>
                                                    <div className='fs15 me-2 text-end fflalezar'>
                                                        مجموع تیکت ها
                                                        <div className=' fs14'>
                                                            <span className='fflalezar'> {
                                                                userData.length !== 0 &&
                                                                userData.ticketCount
                                                            } </span>
                                                            <span className='fflalezar'> تیکت </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col lg={4} className='mt-3 mt-lg-0'>
                            <div className='index-dash-info-2 h-100 fs20 pt-4 pe-3 text-center'>
                                <div className='fw-bold ffl'> درصد تکمیل اطلاعات</div>
                                <div className="chart-container mx-auto">
                                    {
                                        charData.length != 0 &&
                                        <Pie data={charData} />
                                    }

                                    <div className='mt-3 fw-bold fs30 color-1 fflalezar'>
                                        {
                                            userData.length !== 0 &&
                                            (userData.lastPercentage.length / 4 * 100)
                                        }
                                        %
                                    </div>
                                    <div className='fs14 text-secondary lh-1-8'>
                                        برای دریافت برنامه و قرار گرفتن در نوبت دریافت، ابتدا باید پروفایل کاربری و اطلاعات و سایز های خودتان را تکمیل کنیید.
                                    </div>
                                </div>

                            </div>
                        </Col>
                    </Row>
                    {
                        userData.length !== 0 &&
                        <Row className='mt-3 mb-5'>
                            <div className='fflalezar fs20 d-flex align-items-center me-2 c-text-secondary'>
                                <FaCircleDot fontSize={15} className='ms-2' />
                                <div> اطلاعات لازم برای تکمیل</div>
                            </div>

                            <Col lg='6' className='mt-3'>
                                <div className='bg-white br-10 p-4 d-flex justify-content-between align-items-center active percentage-box'>
                                    <div className='fs14 c-text-secondary'>
                                        <BiBaguette fontSize={20} className='ms-1' />
                                        بخش سایز ها
                                    </div>
                                    <div className='fs13'>
                                        {
                                            userData.lastPercentage.includes('size') ?
                                                <>
                                                    <FaCheckCircle fontSize={20} className='ms-1 activeSvg' />
                                                    <span>تکمیل</span>
                                                </>
                                                :
                                                <>
                                                    <IoMdRemoveCircle fontSize={20} className='ms-1 activeSvg text-secondary' />
                                                    تکمیل نشده
                                                </>
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col lg='6' className='mt-3'>
                                <div className='bg-white br-10 p-4 d-flex justify-content-between align-items-center active percentage-box'>
                                    <div className='fs14 c-text-secondary'>
                                        <IoMdImages fontSize={20} className='ms-1' />
                                        بخش تصاویر
                                    </div>
                                    <div className='fs13'>
                                        {
                                            userData.lastPercentage.includes('image') ?
                                                <>
                                                    <FaCheckCircle fontSize={20} className='ms-1 activeSvg' />
                                                    <span>تکمیل</span>
                                                </>
                                                :
                                                <>
                                                    <IoMdRemoveCircle fontSize={20} className='ms-1 activeSvg text-secondary' />
                                                    تکمیل نشده
                                                </>
                                        }


                                    </div>
                                </div>
                            </Col>
                            <Col lg='6' className='mt-3'>
                                <div className='bg-white br-10 p-4 d-flex justify-content-between align-items-center percentage-box'>
                                    <div className=' fs14 c-text-secondary'>
                                        <LuClipboardCheck fontSize={20} className='ms-1' />
                                        بخش  سوالات
                                    </div>
                                    <div className='fs13'>
                                        {
                                            userData.lastPercentage.includes('question') ?
                                                <>
                                                    <FaCheckCircle fontSize={20} className='ms-1 activeSvg' />
                                                    <span>تکمیل</span>
                                                </>
                                                :
                                                <>
                                                    <IoMdRemoveCircle fontSize={20} className='ms-1 activeSvg text-secondary' />
                                                    تکمیل نشده
                                                </>
                                        }

                                    </div>
                                </div>
                            </Col>
                            <Col lg='6' className='mt-3'>
                                <div className='bg-white br-10 p-4 d-flex justify-content-between align-items-center active percentage-box'>
                                    <div className=' fs14 c-text-secondary'>
                                        <FaRegUser fontSize={20} className='ms-1' />
                                        بخش  اطلاعات شخصی
                                    </div>
                                    <div className='fs13'>
                                        {
                                            userData.lastPercentage.includes('personal') ?
                                                <>
                                                    <FaCheckCircle fontSize={20} className='ms-1 activeSvg' />
                                                    <span>تکمیل</span>
                                                </>
                                                :
                                                <>
                                                    <IoMdRemoveCircle fontSize={20} className='ms-1 activeSvg text-secondary' />
                                                    تکمیل نشده
                                                </>
                                        }


                                    </div>
                                </div>
                            </Col>

                        </Row>
                    }

                </Container>
            </PlanRequired>




        </>
    )
}
