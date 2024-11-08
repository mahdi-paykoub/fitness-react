import { React } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default function FalidPay() {


    return (
        <>
            <Container >
                <Row className='justify-content-center mt-5 pt-lg-5'>
                    <Col xs='10' md='5' lg='4' className='text-center '>
                        <img src="/images/logo-morabihamrah-dark.png" width={150} alt="" />
                        <div className='bg-white p-5 mt-4' style={{ 'borderRadius': '20px' }}>
                            <img src="/images/9. Crying.png" width={140} alt="" />
                            <div className='text-danger  mt-3 fflalezar'>پرداخت ناموفق بود</div>
                            <Link to='/' className='mt-4 btn px-5 fflalezar py-2 btn-danger ' style={{ 'borderRadius': '40px' }}>بازگشت</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
