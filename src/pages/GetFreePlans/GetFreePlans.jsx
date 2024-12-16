import { React, useState, useEffect } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import './style.css'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { TiDownloadOutline } from "react-icons/ti";
import { RiDownloadCloud2Fill } from "react-icons/ri";
import SniperLoader from '../../components/SniperLoader/SniperLoader';
function GetFreePlans() {
    const [plans, setPlans] = useState([])
    const [loader, setLoader] = useState(true)
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))


    const getPlans = () => {
        fetch(`${baseUrl}free-plans`, {
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

    return (<>
        <Container className="mt-5 pt-0 pt-lg-5">
            <Row className="align-items-center">
                <Col xs={{ order: 'last' }} lg={{ order: 'first', span: 8 }}>
                    <div className="fflalezar mt-4 mt-lg-0">
                        <div className="fs40 c-text-secondary">
                            دانلود برنامه های <span className="textc-b">رایگان</span>
                        </div>
                        <div className="text-secondary ffir mt-3 lh2 ps-5">
                            با کمال افتخار، ما مجموعه‌ای از برنامه‌های رایگان را برای دانلود در اختیار شما قرار داده‌ایم.
                            این برنامه‌ها به‌طور ویژه برای تسهیل و بهبود تجربه شما طراحی شده‌اند و شامل ابزارهای متنوعی هستند که می‌توانند در زمینه‌های مختلف به شما کمک کنند.
                            این برنامه‌ها می‌توانند به شما در رسیدن به اهداف شخصی و حرفه‌ای‌تان یاری رسانند.

                            همچنین ما یکسری برنامه های پیشرفته داریم که اگر قصد داشته باشید که به صورت حرفه ای بدن سازی رو ادامه بدهید میتوانید از آنها استفاده کنید.
                        </div>
                        <div className="mt-4 pt-3 d-flex align-items-center fs17">
                            <Link to='/plans' className="perofesinal-btn">
                                مشاهده برنامه های حرفه ای
                            </Link>
                            <div className="me-3 c-text-secondary">
                                <IoIosArrowDropdownCircle fontSize={25} />
                                <span className="me-1"> مشاهده برنامه های  رایگان</span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={{ order: 'first' }} lg={{ order: 'last', span: 4 }} className="text-center">
                    <img src="/images/Eureka!.png" className="l-img-res-w" alt="" />
                </Col>
            </Row>
        </Container>
        <Container className="pb-5 mt-5 pt-0 pt-lg-5">
            <Row className=''>
                <Col lg='6' className="text-center text-lg-end">
                    <img src="/images/11383700.svg" className="w-75" alt="" />
                </Col>
                <Col lg='5' className="mt-4 mt-lg-0">
                    {
                        loader === true ?
                            <Col lg={8} className='fflalezar fs30 c-text-secondary mt-3'>
                                <SniperLoader newstyle='mt-5' />
                            </Col>

                            :
                            plans.length !== 0 ?
                                plans.map((plan) =>
                                    <div className='box-download-1 d-flex justify-content-between align-items-center c-text-secondary mt-3'>
                                        <div className='fs18 fflalezar'>
                                            {plan.title}
                                        </div>
                                        <div>
                                            <a href={`${baseUrl}${plan.file}`} className='c-text-secondary'>
                                                <RiDownloadCloud2Fill fontSize={25} />
                                            </a>
                                        </div>
                                    </div>
                                )
                                : <div className='fflalezar fs25 c-text-secondary mt-5'>برنامه ای وجود ندارد</div>
                    }


                </Col>
            </Row>
        </Container>
    </>);
}

export default GetFreePlans;