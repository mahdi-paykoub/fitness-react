import React, { useEffect, useState } from 'react'
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import FormBox from '../../../components/AdminPanel/FormBox/FormBox';
import { Col, Row, Table } from "react-bootstrap";
import { MdOutlineDelete, MdTrendingFlat } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

// let nextId = 0;
function PanelAddOffs() {
    const [coursePlans, setcoursePlans] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsCp, setSuggestionsCp] = useState([]);
    const [users, setUsers] = useState([])
    const [isChecked, setIsChecked] = useState(false);

    const [name, setName] = useState('');
    const [courseOrPlanInp, setCourseOrPlanInp] = useState('');
    const [typeOfCode, setTypeOfCode] = useState('percent');

    const [artists, setArtists] = useState([]);
    const [artistsArray, setArtistsArray] = useState([]);
    const [coursesOrPlansListArray, setCoursesOrPlansListArray] = useState([]);
    const [coursesOrPlansList, setCoursesOrPlansList] = useState([]);

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;

    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('code', data.code)
        formData.append('max_usage', data.max_usage)
        formData.append('type', data.type)
        formData.append('value', data.value)
        formData.append('all_user', isChecked)
        formData.append('for', data.for)
        formData.append('users', JSON.stringify({artistsArray}))
        formData.append('products', JSON.stringify({coursesOrPlansListArray}))

        fetch(`${baseUrl}admin/off`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                if (response.status !== false) {
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then(response => {
                        setArtistsArray([])
                        setCoursesOrPlansListArray([])
                        setArtists([])
                        setCoursesOrPlansList([])
                        reset();
                    })
                } else {
                    swal({
                        title: response.message[0],
                        icon: "error",
                        buttons: 'باشه'
                    })
                }

            })
    }

    const getUsers = () => {
        fetch(`${baseUrl}admin/user`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {

                setUsers(res.data)
            })
    }
    const getcoursePlans = () => {
        fetch(`${baseUrl}admin/get-course-plan`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setcoursePlans(res.data)
            })
    }



    useEffect(() => {
        getUsers()
        getcoursePlans()
    }, [])


    const handleChangeSerachedUser = (e) => {
        const value = e.target.value;
        const filteredSuggestions = users.filter(user =>
            user.phone.toLowerCase().includes(value.toLowerCase())
        );


        setSuggestions(filteredSuggestions);
    };
    const handleChangeSerachedcourse = (e) => {
        const value = e.target.value;
        const filteredSuggestions = coursePlans.filter(cp =>
            cp.title.includes(value)
        );

        setSuggestionsCp(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setArtists([
            ...artists,
            // id: nextId++,
            {
                user: [
                    {
                        phone: suggestion.phone,
                        name: suggestion.name
                    }
                ]
            }
        ]);
        setArtistsArray([
            ...artistsArray,
            { id: suggestion.id }
        ]);
        setSuggestions([]);
        setName('')
    };
    const handleSuggestionClickCp = (suggestion) => {
        let type = ''
        if ("visit" in suggestion) {
            type = 'plan'
        } else {
            type = 'course'
        }

        setSuggestionsCp([]);
        setCoursesOrPlansList([
            ...coursesOrPlansList,
            // id: nextId++,
            {
                product: [
                    {
                        name: suggestion.title,
                        type: type
                    }
                ]
            }
        ]);
        setCoursesOrPlansListArray([
            ...coursesOrPlansListArray,
            {
                id: [
                    {
                        type: type,
                        id: suggestion.id
                    },
                ],
            }
        ]);
        setCourseOrPlanInp('')
    };
    return (<>
        <FormBox title='کد تخفیف' >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row className='mt-4'>
                    <Col lg={6} className='mt-3'>
                        <input type="text" className='form-control' placeholder='کد تخفیف'
                            {...register('code', formValidation('کد تخفیف'))}
                        />
                        <p className='mt-3 text-danger px-2'>
                            {errors.code?.message}
                        </p>
                    </Col>


                    <Col lg={6} className='mt-3'>
                        <input type="number" className='form-control' placeholder='حداکثر تعداد استفاده'
                            {...register('max_usage', formValidation('حداکثر'))}
                        />
                        <p className='mt-3 text-danger px-2'>
                            {errors.max_usage?.message}
                        </p>
                    </Col>

                    <Col lg='6'>
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
                                {errors.type?.message}
                            </p>
                        </div>

                    </Col>
                    <Col lg='6'>
                        <div className='mt-3 '>
                            <input type="text" className='form-control' placeholder={typeOfCode == 'percent' ? 'درصد تخفیف: مثلا : 5' : 'مقدار تخفیف به تومان: مثلا: 5000'}
                                {...register('value', formValidation('مقدار تخفیف'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.value?.message}
                            </p>
                        </div>

                    </Col>

                    {/* select user */}
                    <Col lg='6'>
                        <div className='mt-4 d-flex justify-content-between fs15 text-secondary'>
                            <div>
                                انتخاب کاربر
                            </div>
                            <div className='d-flex'>
                                <input type="checkbox" className='form-check-input'
                                    checked={isChecked}
                                    onChange={(e) => {
                                        setIsChecked(!isChecked);
                                    }}

                                />
                                <div className='me-1'>همه کاربران</div>
                            </div>
                        </div>
                        {
                            isChecked == false &&
                            <Row className='mt-2'>
                                <Col lg='12' className=''>
                                    <div className='fs14 text-secondary mt-4'>شماره تلفن کاربر</div>
                                    <div className='mb-4 d-flex justify-content-between fs14 text-secondary mt-2 w-100 align-items-center'>
                                        <div className='w-100 position-relative'>
                                            <input type="text" placeholder='شماره تلفن کاربر' className='form-control w-100'
                                                value={name}
                                                onChange={e => {
                                                    handleChangeSerachedUser(e)
                                                    setName(e.target.value)
                                                }} />
                                            {suggestions.length > 0 && (
                                                <ul className="suggestions">
                                                    {suggestions.map((suggestion, index) => (
                                                        <li className='d-flex justify-content-between' key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                                            <div>{suggestion.phone}</div>
                                                            <div>{suggestion.name}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                    {artists.map((artist, index) => (
                                        <div className='d-flex align-items-center justify-content-between mt-3 p-3 bg-body-secondary br-10'>
                                            <div className='fs-15 c-text-secondary'>
                                                {/* {index + 1}- */}
                                                {artist.user[0].phone}
                                            </div>
                                            <div>
                                                {artist.user[0].name}
                                            </div>
                                        </div>
                                    ))}
                                </Col>
                            </Row>
                        }

                    </Col>



                    <Col lg='6' className='mt-4'>
                        <div className='d-flex justify-content-between fs15 text-secondary'>

                            <div className=''>
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
                        </div>
                        {/* //////////////////////////////////////////// */}
                        <div className='mt-4'>
                            <div className='mb-3 mt-3 d-flex justify-content-between fs14 text-secondary mt-4 w-100 align-items-center'>
                                <div className='w-100 position-relative'>
                                    <div className='mb-2'>عنوان برنامه یا دوره:</div>
                                    <input type="text" placeholder='عنوان ' className='form-control w-100'
                                        value={courseOrPlanInp}
                                        onChange={e => {
                                            setCourseOrPlanInp(e.target.value)
                                            handleChangeSerachedcourse(e)
                                            // setName(e.target.value)
                                        }} />
                                    {suggestionsCp.length > 0 && (
                                        <ul className="suggestions">
                                            {suggestionsCp.map((suggestion, index) => (
                                                <li className='d-flex justify-content-between' key={index}
                                                    onClick={() => handleSuggestionClickCp(suggestion)}>
                                                    <div>{suggestion.title}</div>
                                                    <div>{suggestion.type == 'course' ? 'دوره' : 'برنامه'}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            {coursesOrPlansList.map((coursesOrPlan, index) => (
                                <div className='d-flex align-items-center justify-content-between mt-3 p-3 bg-body-secondary br-10'>
                                    <div className='fs-15 c-text-secondary'>
                                        {/* {index + 1}- */}
                                        {coursesOrPlan.product[0].name}
                                    </div>
                                    <div>
                                        {coursesOrPlan.product[0].type == 'course' ? <span className='text-danger fs14'>دوره</span> :
                                            <span className='text-primary fs14'>برنامه</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>





                    <div className="text-start mt-5">
                        <button className="btn btn-primary">ساخت کد تخفیف</button>
                    </div>
                </Row>
            </form>
        </FormBox>
    </>);
}

export default PanelAddOffs;