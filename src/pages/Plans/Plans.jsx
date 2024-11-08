import { React, useState, useEffect } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { FaRegSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { HiCube } from "react-icons/hi";
import { CgShapeRhombus } from "react-icons/cg";
import { FaArrowCircleLeft } from "react-icons/fa";
import SniperLoader from '../../components/SniperLoader/SniperLoader';


export default function Plans() {
    const [plans, setPlans] = useState([])
    const [loader, setLoader] = useState(true)
    const baseUrl = process.env.REACT_APP_BASE_URL


    const getPlans = () => {
        fetch(`${baseUrl}plan/all`)
            .then(res => res.json())
            .then(res => {

                setPlans(res.data)
                setLoader(false)
            })
    }

    useEffect(() => {
        getPlans()
    }, [])

    return (
        <>
            <Container className='pb-5 mb-5'>
                <Row >
                    <Col xs={12}>
                        <div className='mx-auto top-text-badge mt-5 color-2'>
                            پلن ها
                        </div>
                        <div className='text-center fw-bold fs30 mt-3'>
                            پلن خود را انتخاب کنید!
                        </div>
                        <Row className='justify-content-center'>
                            <Col md='6'>
                                <div className='px-lg-5 text-secondary fs14 mt-2 text-center lh2'>
                                    هر پلن ویژگی ها و مزایای خاص خود را دارد و یکسری تفاوت هایی کوچک و یا اساسی با همدیگر دارند.شما ابتدا باید پلن مورد نیاز خود را انتخاب نمایید.
                                </div>
                            </Col>
                        </Row>
                    </Col>

                </Row>

                <Row className=''>
                    <Col className='mt-3' lg='6' xl={4}>
                        <div className='first-custom-card p-4 h-100 position-relative'>
                            <div className='text-white'>
                                <div>
                                    <HiCube fontSize={40} />
                                </div>
                                <div className='mt-3 fw-bold fs30'>
                                    انتخاب برنامه
                                    <br />
                                    های تمرینی مربی همراه
                                </div>
                                <div className='text-white fs14 mt-4 lh2'>
                                    پلن را متناسب با هدفتان انتخاب کنید.بعد از انتخاب و پرداخت در پنل کاربری باید اطلاعاتتان را تکمیل کنید.
                                </div>
                                <div>
                                    <FaArrowCircleLeft className='mt-4' fontSize={30} />
                                </div>
                            </div>
                            <div>
                                <img src="images/banner/Sport Illustration Kit-08.png" className='w-100' alt="" />
                            </div>
                        </div>
                    </Col>
                    {
                        loader === true ?
                            <Col lg={8} className='fflalezar fs30 c-text-secondary mt-3'>
                                <SniperLoader newstyle='mt-5' />
                            </Col>

                            :
                            plans.length !== 0 ?
                                plans.map((plan) =>
                                    <Col className='mt-3' lg='6' xl={4}>
                                        <div className='custom-card p-4 h-100'>
                                            <div>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <div className='card-top-shape-right d-flex justify-content-center align-items-center'>
                                                        <FaRegSquare />
                                                    </div>
                                                    <div className='card-top-shape-left fs14'>
                                                        برنامه تمرینی
                                                    </div>
                                                </div>
                                                <div className='mt-4 fw-bold fs20 text-body-secondary'>
                                                    {plan.title}
                                                </div>
                                                <div className='text-secondary fs13 mt-2 lh-1-8 text-justify'>
                                                    {plan.description}
                                                </div>
                                                <div className='mt-4 pt-2'>
                                                    <span className='fs30 fw-bold card-price-number color-2 fflalezar'>{Number(plan.price).toLocaleString()}</span>
                                                    <span className='fs20 color-2 milioon-text fw-bold me-2'>میلیون</span>
                                                </div>
                                                <div className='fs14 mb-4 mt-2 text-secondary'>
                                                    <IoCardOutline className='color-2' fontSize={20} />
                                                    <span className='me-2 fs13'>این برنامه برای {plan.duration} ماه تنظیم خواهد شد</span>
                                                </div>
                                                <div className='pt-4 border-top w-100'></div>
                                            </div>

                                            <div>
                                                {
                                                    plan.features != null &&
                                                    JSON.parse(plan.features).map((feature) =>
                                                        <div className='mt-4'>
                                                            <FaCheckCircle className='color-2' fontSize={20} />
                                                            <span className='me-2 fs14'>{feature.name}</span>
                                                        </div>
                                                    )
                                                }

                                                <div className='d-flex justify-content-center mt-5'>
                                                    <Link to={`/plans/${plan.slug}`} className='card-show-more-detail-btn d-block text-center'>
                                                        مشاهده برنامه
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                )
                                : <Col lg={8} className='fflalezar fs30 c-text-secondary mt-3'>برنامه ای وجود ندارد</Col>
                    }
                </Row>
                <div className='top-shadow shadow-ball mx-auto'></div>
            </Container>
        </>
    )
}
