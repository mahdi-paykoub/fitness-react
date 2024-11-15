import { React } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NotAccess() {


    return (
        <>

            <Container>
                <Row className='justify-content-center mt-5'>
                    <Col lg='3' className='text-center'>
                        <div className='fflalezar fs20 c-text-secondary'>
                            <img src="/images/3. Web Check.png" className='w-100' alt="" />
                            شما اجازه دسترسی به این صفحه را ندارید
                        </div>
                        <div className='mt-4 d-flex justify-content-center'>
                            <Link to='/' className='fflalezar send-btn px-4 py-2 '>
                                خانه
                            </Link>
                          
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
