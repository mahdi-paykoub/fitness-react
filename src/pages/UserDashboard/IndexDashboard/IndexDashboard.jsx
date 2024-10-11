import { React, useState } from 'react'
import Chart from "chart.js/auto";
import { Col, Row, Container } from 'react-bootstrap'
import { LuTicket } from "react-icons/lu";
import { FaPlay } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa6";
import { Doughnut } from 'react-chartjs-2';
import { Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

export default function IndexDashboard() {
    const Data = [
        {
            id: 1,
            year: 2016,
            userGain: 80,
            userLost: 823
        },
        {
            id: 2,
            year: 2017,
            userGain: 20,
            userLost: 345
        },
    ];
    const [chartData, setChartData] = useState({
        datasets: [
            {
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "#41bfa8",
                    "#ecf0f1",
                ],
               
            }
        ]
    });
    return (
        <>
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
                                            مجموع برنامه های شما
                                        </div>
                                        <div className='fw-bold c-text fflalezar'>
                                            1
                                        </div>

                                        <div className='d-flex align-items-center mt-4'>
                                            <div className='glass-info-box d-flex justify-content-center align-items-center'>
                                                <FaPlay fontSize={23} />
                                            </div>
                                            <div className='fs15 me-2 text-end fflalezar'>
                                                دوره های من
                                                <div className=' fs14'>
                                                    <span className='fflalezar'> 1 </span>
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
                                                    <span className='fflalezar'> 1 </span>
                                                    <span className='fflalezar'> تیکت </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center mt-3'>
                                            <div className='glass-info-box d-flex justify-content-center align-items-center'>
                                                <FaRegCreditCard fontSize={23} />
                                            </div>
                                            <div className='fs15 me-2 text-end fflalezar'>
                                                مجموع پرداخت ها
                                                <div className=' fs14'>
                                                    <span className='fflalezar'> 10،000 </span>
                                                    <span className='fflalezar'> تومان </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='index-dash-info-2 h-100 fs20 pt-4 pe-3 text-center'>
                            <div className='fw-bold'> درصد تکمیل اطلاعات</div>
                            <div className="chart-container mx-auto">
                                <Pie data={chartData} />
                                <div className='mt-3 fw-bold fs30 color-1'>
                                    25%
                                </div>
                                <div className='fs14 text-secondary lh-1-8'>
                                    برای دریافت برنامه و قرار گرفتن در نوبت دریافت، ابتدا باید پروفایل کاربری و اطلاعات و سایز های خودتان را تکمیل کنیید.
                                </div>
                            </div>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
