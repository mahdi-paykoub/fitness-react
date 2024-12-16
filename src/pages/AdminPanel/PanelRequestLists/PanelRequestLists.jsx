import { React, useState, useEffect } from 'react'
import swal from "sweetalert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container, Table } from 'react-bootstrap';
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import DataBox from '../../../components/AdminPanel/DataBox/DataBox';
import ErrorBox from '../../../components/AdminPanel/ErrorBox/ErrorBox';
import MyModal from '../../../components/MyModal/MyModal';
import { SiAnswer } from 'react-icons/si';
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import { SlRefresh } from 'react-icons/sl';

function PanelRequestLists() {
    const [userId, setUserId] = useState(null)
    const [unCode, setInCode] = useState('')
    const [loader, setLoader] = useState(true)
    const [courses, setCourses] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [typeOfCode, setTypeOfCode] = useState('percent');

    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const baseUrl = process.env.REACT_APP_BASE_URL



    const form = useForm();
    const { register, control, setValue, handleSubmit, formState, reset } = form
    const { errors } = formState;
    const onSubmit = (data) => {

        let formData = new FormData()
        formData.append('code', data.code)
        formData.append('type', data.type)
        formData.append('value', data.value)
        formData.append('for', data.for)
        formData.append('user_id', userId)


        fetch(`${baseUrl}admin/subscribe-code`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if (response.status !== false) {
                    setModalShow(false)
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then(response => {
                        reset();
                        getCourses()
                    })

                } else {
                    swal({
                        title: response.message[0],
                        icon: "error",
                        buttons: 'باشه'
                    }).then(response => {
                    })
                }

            })
    }

    const getCourses = () => {
        fetch(`${baseUrl}admin/contact-us`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);

                setCourses(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getCourses()
    }, [])


    const handleNewCode = () => {
        fetch(`${baseUrl}admin/get-unique-code`,
            {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
            })
            .then(res => res.json())
            .then(response => {
                if (response.status !== false) {
                    setValue('code', response.data)
                }

            })
    }
    return (<>
        <div className='mt-5 mb-5 pb-5'>
            {
                loader ?
                    <SniperLoader />
                    :
                    courses.length !== 0 ?
                        <DataBox title='درخواست ها'>
                            <Table className='box-child-table mt-4' hover>
                                <thead>
                                    <tr>
                                        <th>نام کاربر </th>
                                        <th>تلفن</th>
                                        <th>عنوان درخواست</th>

                                        <th>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {courses.reverse().map((course, index) =>
                                        <tr key={course.id}>
                                            <td>{course.user.name}</td>
                                            <td>{course.user.phone}</td>
                                            <td>{course.title}</td>
                                            <td>
                                                {
                                                    course.has_code == 0 ?
                                                        <button className='btn btn-sm btn-primary'
                                                            variant="primary" onClick={() => {
                                                                setModalShow(true)
                                                                setUserId(course.user.id)
                                                            }}
                                                        >اختصاص کد معرف</button>
                                                        :
                                                        <button className='btn btn-secondary btn-sm'>کد دارد</button>

                                                }
                                            </td>

                                        </tr>)
                                    }

                                </tbody>
                            </Table>

                        </DataBox>
                        : <ErrorBox text='درخواستی ای یافت نشد' />
            }

        </div>

        <MyModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        >
            <div className='p-4 fflalezar c-text-secondary'>
                <div className='fflalezar fs20 color-2'>
                    <SiAnswer fontSize={20} className='ms-2' />
                    ساخت کد معرف
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    <div className='mt-3 d-flex align-items-center'>
                        <div className='w-100'>
                            <input type="text" className='form-control' placeholder='کد معرف :مثلا: morabi_user_name'
                                {...register('code', formValidation('کد'))}
                            />
                            {/* <p className=' text-danger px-2'>
                                {errors.title?.message}
                            </p> */}
                        </div>
                        <div className='me-2'>
                            <button type='button' className='btn btn-danger'
                                onClick={handleNewCode}
                            >
                                <SlRefresh fontSize={18} />
                            </button>
                        </div>
                    </div>
                    <div className='mt-3 '>
                        <select name="" id="" className='form-control text-secondary'
                            {...register('type', formValidation('نوع تخفیف'))}
                            onChange={(e) => setTypeOfCode(e.target.value)}>
                            <option value="percent" selected={true}>
                                درصدی
                            </option>
                            <option value="amount">
                                مقدار ثابت
                            </option>
                        </select>
                        <p className='mt-3 text-danger px-2'>
                            {errors.value?.message}
                        </p>
                    </div>

                    <div className='mt-3'>
                        <input type="text" className='form-control' placeholder={typeOfCode == 'percent' ? 'درصد تخفیف: مثلا : 5' : 'مقدار تخفیف به تومان: مثلا: 5000'}
                            {...register('value', formValidation('نام دوره'))}
                        />
                        <p className='mt-3 text-danger px-2'>
                            {errors.value?.message}
                        </p>
                    </div>
                    <div className='mt-3'>
                        <div className='mb-2'>
                            این کد برای کدام بخش مورد استفاده قرار بگیرد؟
                        </div>
                        <div className='d-flex align-items-center'>
                            <input type="radio" className='form-check-input' value='plan' id='plan'
                                {...register('for', formValidation('نام دوره'))}
                            />
                            <label htmlFor="plan" className='me-1'>برنامه</label>



                            <input type="radio" className='form-check-input me-3' value='course' id='course'
                                {...register('for', formValidation('نام دوره'))}
                            />
                            <label htmlFor="course" className='me-1'>دوره</label>
                            <p className='mt-3 text-danger px-2'>
                                {errors.type?.message}
                            </p>

                            <input type="radio" className='form-check-input' value='all' id='all'
                                {...register('for', formValidation('نام دوره'))}
                            />
                            <label htmlFor="all" className='me-1'>هر دو</label>
                            <p className='mt-3 text-danger px-2'>
                                {errors.type?.message}
                            </p>
                        </div>
                    </div>
                    <div className='text-start mt-2'>
                        <button className='btn btn-primary btn-sm px-4 fflalezar'>اختصاص کد </button>
                    </div>
                </form>
            </div>

        </MyModal>
    </>);
}

export default PanelRequestLists;