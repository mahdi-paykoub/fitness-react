import { React } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Page404() {


    return (
        <>
            <Container className='my-5 '>
                <Row className='justify-content-center'>
                    <Col xs='8' md='5' lg="4" className='text-center'>
                        <img src="/images/19. Chat.png" className='w-100' alt="" />
                        <div className='mt-4 fflalezar fs20 c-text-secondary'>صفحه مورد نظر یافت نشد</div>
                        <div className='mt-4'>
                            <Link to='/' className='fflalezar send-btn px-4 py-2 '>خانه</Link>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
