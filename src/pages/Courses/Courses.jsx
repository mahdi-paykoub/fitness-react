import { React, useState, useEffect } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import ErrorBox from "../../components/AdminPanel/ErrorBox/ErrorBox";



export default function Courses() {

    const [courses, setCourses] = useState([])
    const baseUrl = process.env.REACT_APP_BASE_URL

    const getCourses = () => {
        fetch(`${baseUrl}course/all`)
            .then(res => res.json())
            .then(res => {
                setCourses(res.data)
            })
    }


    useEffect(() => {
        getCourses()
    }, [])
    return (
        <>
            <Container className='bg-global-light mt-2'>
                <Row>
                    <Col lg={12}>
                        <div className='course-top-box d-flex align-items-center justify-content-center position-relative'>
                            <div className=''>
                                <div className='fw-bold text-white header-txt'>
                                    همه دوره ها
                                </div>
                                <div className='d-flex justify-content-center align-items-center text-center text-white mt-3'>
                                    <div>
                                        <Link to='/' className='text-white'>
                                            خانه
                                        </Link>
                                    </div>
                                    <IoIosArrowBack className='mx-2' />
                                    <div>
                                        دوره ها
                                    </div>
                                </div>
                            </div>
                            <img src="/images/breadcrumb_shape02.26314598.svg" alt="" className='position-absolute float-shape-1 d-none d-lg-block' />
                            <img src="/images/breadcrumb_shape01.df47cee2.svg" alt="" className='position-absolute float-shape-2 d-none d-lg-block' />
                            <img src="/images/breadcrumb_shape05.925251.svg" alt="" className='position-absolute float-shape-3  d-none d-lg-block' />
                            <img src="/images/star.svg" alt="" className='position-absolute float-shape-4 d-none d-lg-block' />
                        </div>
                    </Col>
                </Row>
                <Row className='mb-5'>
                    {/* <Col xl={3}>
                        <div className='sticky-top pt-4'>
                            <div className='bg-white filter-box d-flex justify-content-between align-items-center'>
                                <input type="text" className='border-0 my-1' placeholder='جستجو بین دوره ها' />
                                <FiSearch fontSize={25} className='text-secondary cursor-pointer' />
                            </div>
                            <div className='bg-white filter-box d-flex justify-content-between align-items-center mt-3'>
                                <div className='fw-bold fs14 c-text-secondary'> فقط دوره های رایگان</div>
                                <div className=''>
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <div className='bg-white filter-box d-flex justify-content-between align-items-center mt-3'>
                                <div className='fw-bold fs14 c-text-secondary'> دوره های خریداری شده  </div>
                                <div className=''>
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Col> */}
                    <Col xl={12}>
                        <Row>
                            {
                                courses.length !== 0 ?
                                    courses.map((course) =>
                                        <Col  key={course.id} className='mt-4' md={6} xl={4}>
                                            <div className='course-card p-3 cursor-pointer'>
                                                <div className='position-relative'>
                                                    <img src={baseUrl + course.image} alt="" className='w-100' />
                                                </div>
                                                <div className='d-flex justify-content-between align-items-center mt-3 '>
                                                    <div className='d-flex align-items-center'>
                                                        <svg width="20" height="20" viewBox="0 0 25 20" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7169 2.69166C16.6042 1.00962 14.5859 0 12.5 0C10.4141 0 8.39587 1.00961 5.28315 2.69166L5.22727 2.72186L5.22726 2.72186C3.68828 3.55348 2.46412 4.21498 1.6299 4.77848C1.2074 5.06386 0.826207 5.36214 0.543285 5.68702C0.257095 6.01565 0 6.45496 0 7V15C0 15.5523 0.447715 16 1 16C1.55228 16 2 15.5523 2 15V9.46227C2.55931 9.81417 3.25267 10.2042 4.0643 10.6476C3.9998 11.452 3.99989 12.4916 3.99999 13.8335L4 13.9999C4 18.9999 5.49418 19.9999 12.4656 19.9999C19 19.9999 21 19 21 13.9999C21 12.5794 21 11.4883 20.9287 10.6514C21.9332 10.1028 22.757 9.63567 23.3701 9.22152C23.7926 8.93613 24.1738 8.63785 24.4567 8.31297C24.7429 7.98434 25 7.54503 25 6.99999C25 6.45496 24.7429 6.01565 24.4567 5.68702C24.1738 5.36214 23.7926 5.06386 23.3701 4.77847C22.5359 4.21498 21.3117 3.55348 19.7728 2.72186L19.7169 2.69166ZM18.9819 11.7034C16.277 13.1472 14.4171 14 12.5 14C10.5822 14 8.7216 13.1466 6.01498 11.7017C6.00026 12.2995 6 13.0465 6 13.9999C6 16.465 6.41412 16.9896 6.76855 17.2386C7.03417 17.4253 7.53095 17.6393 8.50505 17.7887C9.47215 17.937 10.7509 17.9999 12.4656 17.9999C14.0655 17.9999 15.2949 17.9375 16.2488 17.7893C17.2075 17.6404 17.7532 17.4239 18.0763 17.2092C18.523 16.9123 19 16.3212 19 13.9999C19 13.0462 18.9985 12.2997 18.9819 11.7034ZM2.74938 6.43581C2.37924 6.68583 2.16569 6.86955 2.05196 7C2.16569 7.13045 2.37924 7.31417 2.74938 7.56419C3.49128 8.06532 4.62684 8.68035 6.23397 9.54881C9.466 11.2953 11.0169 12 12.5 12C13.9832 12 15.534 11.2953 18.7661 9.54881C20.3732 8.68035 21.5087 8.06532 22.2506 7.56419C22.6208 7.31417 22.8343 7.13044 22.948 6.99999C22.8343 6.86955 22.6208 6.68582 22.2506 6.4358C21.5087 5.93467 20.3732 5.31965 18.7661 4.45119C15.534 2.70467 13.9832 2 12.5 2C11.0169 2 9.466 2.70467 6.23397 4.45119C4.62684 5.31965 3.49128 5.93468 2.74938 6.43581ZM23.0157 7.09148L23.0144 7.0888C23.0153 7.0906 23.0157 7.09148 23.0157 7.09148ZM23.0144 6.91119L23.0157 6.90851C23.0157 6.90851 23.0153 6.9094 23.0144 6.91119ZM1.98561 6.9112C1.98467 6.9094 1.9843 6.90851 1.98434 6.90852L1.98561 6.9112Z" fill="currentColor"></path>
                                                        </svg>
                                                        <div className='me-2 fs14 c-text-secondary mt-1'>آرمان کرد بچه</div>
                                                    </div>
                                                    <div className=''>
                                                        <FaStar fontSize={20} color='#f8bc24' />
                                                        <span className='me-2 fs13'>5 امتیاز</span>
                                                    </div>
                                                </div>
                                                <div className='mt-3 fw-bold c-text-secondary lh-1-8'>
                                                    {course.title}
                                                </div>

                                                <div className='d-flex justify-content-between align-items-center fw-bold mt-4 pt-2 pb-2'>
                                                    <div className='c-text-secondary'>
                                                        <span className='fs18 fflalezar text-secondary'>
                                                            {Number(course.price).toLocaleString()}
                                                        </span>
                                                        <span className='me-1 fflalezar text-secondary'>تومان</span>
                                                    </div>
                                                    <div>
                                                        <Link to={`/courses/${course.slug}`} className='fs13 show-m-course'>
                                                            مشاهده دوره
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ) : <div className='bg-danger br-10 fflalezar text-white mt-4 p-3'>دوره ای یافت نشد!</div>

                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
