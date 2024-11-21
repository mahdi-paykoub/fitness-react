import { React, useState, useEffect } from 'react'
import './style.css'
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FiUserCheck } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import { ShimmerDiv, ShimmerSectionHeader, ShimmerText } from 'shimmer-effects-react';


export default function MyCourses() {
    const [courses, setCourses] = useState([])
    const [loader, setLoader] = useState(true)
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const getTickets = () => {
        fetch(`${baseUrl}get-user-courses`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setCourses(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getTickets()
    }, [])


    return (
        <>

            {
                loader ?
                    <Container className='mt-4'>
                        <Row>
                            <Col lg='4' className='mt-3'>
                                <ShimmerDiv mode="light" width='100%' height={200} rounded={1} />
                                <ShimmerText mode="light" line={5} gap={6} className='mt-3' />


                            </Col>
                            <Col lg='4' className='mt-3'>
                                <ShimmerDiv mode="light" width='100%' height={200} rounded={1} />
                                <ShimmerText mode="light" line={5} gap={6} className='mt-3' />

                            </Col>
                            <Col lg='4' className='mt-3'>
                                <ShimmerDiv mode="light" width='100%' height={200} rounded={1} />
                                <ShimmerText mode="light" line={5} gap={6} className='mt-3' />
                            </Col>
                        </Row>
                    </Container>
                    :
                    courses.length !== 0 ?
                    <Container className='mb-5'>
                        <Row>
                            {
                                courses.map((course) =>
                                    <Col md={6} xl={4}>
                                        <Card className='buyed-course-box-card border-0 mt-4'>
                                            <div className='position-relative img-overly-course-p'>
                                                <Card.Img variant="top" src={`${baseUrl}${course.orderable.image}`} />
                                                <div className='img-overly-course d-flex align-items-center justify-content-center position-absolute text-center w-100 h-100 '>
                                                    <Link to={`/courses/${course.orderable.slug}`}>
                                                        <li>
                                                            <BsFillPlayFill className='fs40icon' />
                                                        </li>
                                                    </Link>
                                                </div>
                                            </div>
                                            <Card.Body>
                                                <div className='lh1-8 fw600 mt-2'>
                                                    {course.orderable.title}
                                                </div>
                                                <div className='mt-4 d-flex justify-content-between'>
                                                    <div>
                                                        <FiUserCheck className='fs20 porple-text-color2' />
                                                        <span className='fs14 text-secondary me-2'>آرمان کرد بچه</span>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <Link to={`/courses/${course.orderable.slug}`} className='btn-more-course-detail'>مشاهده دوره</Link>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }


                        </Row>
                    </Container>
                    :
                    <div className='bg-danger text-white br-10 p-3 mt-4 fflalezar'>دوره ای یافت نشد</div>
            }


        </>
    )
}
