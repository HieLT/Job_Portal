import React, {useEffect, useRef, useState} from 'react';
import {Button, DatePicker, Input, Select, Switch} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "../../../../../assets/images/icons/light/warning.svg";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {initialData, setErrorCreateOrUpdate, setJob} from "../../../../../states/modules/jobManagement/index.js";
import {
    convertConstantToOptionArray,
    convertISOStringToDate,
    handleCheckValidateConfirm,
    isPositiveNumber
} from "../../../../../utils/helper.js";
import {EMPLOYEE_TYPE, JOB_EXPERIENCE, JOB_STATUS, SALARY_OPTIONS} from "../../../../../utils/constants.js";
import dayjs from "dayjs";
import {postJob, updateJob} from "../../../../../api/jobManagement/index.js";
import store from "../../../../../states/configureStore.js";
import moment from "moment";

export default function CreateOrUpdate(props) {
    const {isTypeModalCreate, closeModal} = props;
    const dispatch = useDispatch();
    const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({...initialData.job});
    const isLoadingBtnCreateOrUpdate = useSelector(state => state.jobManagement.isLoadingCreateOrUpdate);
    const errorCreateOrUpdate = useSelector(state => state.jobManagement.errorCreateOrUpdateJob);
    const visibleModalCreateOrUpdate = useSelector(state => state.jobManagement.visibleModalCreateOrUpdate);
    const categories = useSelector(state => state.jobManagement.categories);
    const isLoadingGetCategories = useSelector(state => state.jobManagement.isLoadingGetCategories);
    const detailJob = useSelector(state => state.jobManagement.detailJob);
    const [salaryOption, setSalaryOption] = useState(SALARY_OPTIONS['FIXED'])
    const [salaryRange, setSalaryRange] = useState({
        from: '',
        to: ''
    })
    const firstInputRef = useRef(null)

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const salaryOptions = [
        {
            label: 'Số cứng',
            value: SALARY_OPTIONS['FIXED']
        },
        {
            label: 'Khoảng',
            value: SALARY_OPTIONS['RANGE']
        },
        {
            label: 'Thỏa thuận',
            value: SALARY_OPTIONS['AGREEMENT']
        }
    ]

    const requiredExperienceOptions = convertConstantToOptionArray(JOB_EXPERIENCE)

    const jobTypes = convertConstantToOptionArray(EMPLOYEE_TYPE)

    useEffect(() => {
        if (visibleModalCreateOrUpdate) {
            firstInputRef?.current?.focus()
        }
    }, [visibleModalCreateOrUpdate])

    useEffect(() => {
        setSalaryRange({
            from: '',
            to: ''
        })
        if (!_.isEmpty(detailJob) && !isTypeModalCreate) {
            let data = _.cloneDeep(dataCreateOrUpdate);
            data.title = detailJob.title;
            data.description = detailJob.description;
            data.salary = detailJob.salary;
            data.position = detailJob.position;
            data.number_of_recruitment = detailJob.number_of_recruitment;
            data.experience_required = detailJob.experience_required;
            data.type = detailJob.type;
            data.expired_at = detailJob.expired_at;
            data.status = detailJob.status;
            data.applied_candidates = detailJob.applied_candidates;
            data.category_id = detailJob.category_id._id;
            setDataCreateOrUpdate(data)

            if (data.salary) {
                if (data.salary?.includes('-')) {
                    const range = data.salary?.split('-')
                    setSalaryOption(SALARY_OPTIONS['RANGE'])
                    setSalaryRange({
                        from: range[0],
                        to: range[1]
                    })
                } else if (data.salary === 'Thỏa thuận') {
                    setSalaryOption(SALARY_OPTIONS['AGREEMENT'])
                } else {
                    setSalaryOption(SALARY_OPTIONS['FIXED'])
                }
            }
        } else {
            setDataCreateOrUpdate({...initialData.job})
        }
    }, [detailJob, isTypeModalCreate, visibleModalCreateOrUpdate])

    useEffect(() => {
        dispatch(setErrorCreateOrUpdate({...initialData.errorCreateOrUpdateJob}))
    }, [dispatch])

    const handleChangeInput = (value, type) => {
        if (errorCreateOrUpdate[type] && errorCreateOrUpdate[type]?.length !== 0) {
            dispatch(setErrorCreateOrUpdate({
                ...errorCreateOrUpdate,
                [type]: ''
            }))
        }

        let data = _.cloneDeep(dataCreateOrUpdate);
        if (type === 'salary' || type === 'number_of_recruitment') {
            if (!value || (isPositiveNumber(value) && !value?.includes('.'))) {
                data[type] = value
            }
        } else if (type === 'expired_at') {
            data[type] = value ? moment(value.toISOString()).startOf('day').toISOString() : ''
        } else {
            data[type] = value
        }
        setDataCreateOrUpdate(data)
    }

    const handleChangeSelect = (value, type) => {
        if (errorCreateOrUpdate[type] && errorCreateOrUpdate[type]?.length !== 0) {
            dispatch(setErrorCreateOrUpdate({
                ...errorCreateOrUpdate,
                [type]: ''
            }))
        }

        let data = _.cloneDeep(dataCreateOrUpdate);
        data[type] = value
        setDataCreateOrUpdate(data)
    }

    const handleChangeSalaryRange = (value, type) => {
        dispatch(setErrorCreateOrUpdate({...errorCreateOrUpdate, salary: ''}))

        if (!value || (isPositiveNumber(value) && !value?.includes('.'))) {
            setSalaryRange({
                ...salaryRange,
                [type]: value
            })
        }
    }

    const handleConfirmCreate = () => {
        dispatch(setJob({
            ...dataCreateOrUpdate,
            salary: salaryOption === SALARY_OPTIONS['RANGE'] ?
                (salaryRange.from + '-' + salaryRange.to) : dataCreateOrUpdate.salary
        }))
        const newJob = store.getState().jobManagement.job
        let validate = handleCheckValidateConfirm(newJob, errorCreateOrUpdate, 'job');
        dispatch(setErrorCreateOrUpdate(validate.dataError))
        if (!validate.isError) {
            dispatch(postJob(newJob))
        }
    }

    const handleConfirmUpdate = () => {
        dispatch(setJob({
            id_job: detailJob._id,
            dataUpdate: {
                ...dataCreateOrUpdate,
                salary: salaryOption === SALARY_OPTIONS['RANGE'] ?
                    (salaryRange.from + '-' + salaryRange.to) : dataCreateOrUpdate.salary,
            }
        }))
        const updatedJob = store.getState().jobManagement.job
        let validate = handleCheckValidateConfirm(updatedJob.dataUpdate, errorCreateOrUpdate, 'job');
        dispatch(setErrorCreateOrUpdate(validate.dataError))
        if (!validate.isError) {
            dispatch(updateJob(updatedJob))
        }
    }

    const handleBlur = () => {

    }

    return (
        <div>
            <div className={'flex justify-between'}>
                <div className={'w-5/12'}>
                    <div className={`input-wrap`}>
                        <div className={'label-wrap'}>
                            Tiêu đề <span className={'required'}>*</span>
                        </div>
                        <Input ref={firstInputRef}
                               onBlur={handleBlur}
                               className={`main-input`}
                               placeholder={'Nhập tiêu đề'}
                               value={dataCreateOrUpdate.title}
                               onChange={(e) => handleChangeInput(e.target.value, 'title')}
                        />
                        {
                            errorCreateOrUpdate && errorCreateOrUpdate.title?.length > 0 ?
                                <span className={'error'}>
                                  <div className={'icon'}>
                                    <InlineSVG src={IconWarning} width={14} height="auto"/>
                                  </div>
                                    {errorCreateOrUpdate.title}
                                </span> : ''
                        }
                    </div>

                    <div className={`input-wrap`}>
                        <div className={'label-wrap'}>
                            Mô tả <span className={'required'}>*</span>
                        </div>
                        <textarea
                            onBlur={handleBlur}
                            className={`main-input w-full 
                            ${salaryOption === SALARY_OPTIONS['AGREEMENT'] ? '!h-[210px]' : '!h-[150px]'}`
                            }
                            placeholder={'Nhập mô tả'}
                            value={dataCreateOrUpdate.description}
                            onChange={(e) => handleChangeInput(e.target.value, 'description')}
                        />
                        {
                            errorCreateOrUpdate && errorCreateOrUpdate.description?.length > 0 ?
                                <span className={'error'}>
                                  <div className={'icon'}>
                                    <InlineSVG src={IconWarning} width={14} height="auto"/>
                                  </div>
                                    {errorCreateOrUpdate.description}
                                </span> : ''
                        }
                    </div>

                    <div className={`input-wrap`}>
                        <div className={'label-wrap'}>
                            Mức lương <span className={'required'}>*</span>
                        </div>
                        <Select onBlur={handleBlur} options={salaryOptions}
                                className={'main-select w-full mb-3'}
                                value={salaryOption}
                                onChange={(value) => {
                                    setSalaryOption(value)
                                    setSalaryRange({
                                        from: '',
                                        to: ''
                                    })
                                    setDataCreateOrUpdate({
                                        ...dataCreateOrUpdate,
                                        salary: value === SALARY_OPTIONS['AGREEMENT'] ? 'Thỏa thuận' : null
                                    })
                                }}
                        />
                        {
                            salaryOption === SALARY_OPTIONS['FIXED'] ?
                                <Input onBlur={handleBlur}
                                       className={`main-input`}
                                       placeholder={'Nhập mức lương'}
                                       value={dataCreateOrUpdate.salary}
                                       onChange={(e) => handleChangeInput(e.target.value, 'salary')}
                                /> : (
                                    salaryOption === SALARY_OPTIONS['RANGE'] ?
                                        <div className={'flex justify-between items-center'}>
                                            <Input onBlur={handleBlur}
                                                   className={`main-input w-2/5`}
                                                   placeholder={'Từ'}
                                                   value={salaryRange.from}
                                                   onChange={(e) => handleChangeSalaryRange(e.target.value, 'from')}
                                            />
                                            -
                                            <Input onBlur={handleBlur}
                                                   className={`main-input w-2/5`}
                                                   placeholder={'Đến'}
                                                   value={salaryRange.to}
                                                   onChange={(e) => handleChangeSalaryRange(e.target.value, 'to')}
                                            />
                                        </div> : ''
                                )
                        }
                        {
                            errorCreateOrUpdate && errorCreateOrUpdate.salary?.length > 0 ?
                                <span className={'error'}>
                                  <div className={'icon'}>
                                    <InlineSVG src={IconWarning} width={14} height="auto"/>
                                  </div>
                                    {errorCreateOrUpdate.salary}
                                </span> : ''
                        }
                    </div>
                </div>
                <div className={'w-6/12'}>
                    <div className={`input-wrap`}>
                        <div className={'label-wrap'}>
                            Vị trí <span className={'required'}>*</span>
                        </div>
                        <Input onBlur={handleBlur}
                               className={`main-input`}
                               placeholder={'Nhập vị trí tuyển'}
                               value={dataCreateOrUpdate.position}
                               onChange={(e) => handleChangeInput(e.target.value, 'position')}
                        />
                        {
                            errorCreateOrUpdate && errorCreateOrUpdate.position?.length > 0 ?
                                <span className={'error'}>
                                  <div className={'icon'}>
                                    <InlineSVG src={IconWarning} width={14} height="auto"/>
                                  </div>
                                    {errorCreateOrUpdate.position}
                                </span> : ''
                        }
                    </div>

                    <div className={'flex justify-between items-center mb-[5px]'}>
                        <div className={'w-[45%]'}>
                            <div className={`input-wrap !mb-[15px]`}>
                                <div className={'label-wrap'}>
                                    Số lượng tuyển <span className={'required'}>*</span>
                                </div>
                                <Input onBlur={handleBlur}
                                       className={`main-input`}
                                       placeholder={'Nhập số lượng'}
                                       value={dataCreateOrUpdate.number_of_recruitment}
                                       onChange={(e) => handleChangeInput(e.target.value, 'number_of_recruitment')}
                                />
                                {
                                    errorCreateOrUpdate && errorCreateOrUpdate.number_of_recruitment?.length > 0 ?
                                        <span className={'error'}>
                                    <div className={'icon'}>
                                      <InlineSVG src={IconWarning} width={14} height="auto"/>
                                    </div>
                                            {errorCreateOrUpdate.number_of_recruitment}
                                  </span> : ''
                                }
                            </div>
                        </div>

                        <div className={'w-[45%]'}>
                            <div className={`input-wrap !mb-[15px]`}>
                                <div className={'label-wrap'}>
                                    Ngày hết hạn <span className={'required'}>*</span>
                                </div>
                                <DatePicker onBlur={handleBlur}
                                            disabledDate={(current) => current && current < new Date().setHours(23, 59, 59, 0)}
                                            className={'main-datepicker w-full'}
                                            placeholder={'Ngày hết hạn'}
                                            format={dateFormatList}
                                            value={
                                                dataCreateOrUpdate?.expired_at ?
                                                    dayjs(convertISOStringToDate(dataCreateOrUpdate?.expired_at), dateFormatList[0])
                                                    : null
                                            }
                                            onChange={(e) => handleChangeInput(e, 'expired_at')}
                                />
                                {
                                    errorCreateOrUpdate && errorCreateOrUpdate.expired_at?.length > 0 ?
                                        <span className={'error'}>
                                  <div className={'icon'}>
                                    <InlineSVG src={IconWarning} width={14} height="auto"/>
                                  </div>
                                            {errorCreateOrUpdate.expired_at}
                                </span> : ''
                                }
                            </div>
                        </div>
                    </div>

                    <div className={'flex justify-between items-center mb-[5px]'}>
                        <div className={'w-[45%]'}>
                            <div className={`input-wrap !mb-[15px]`}>
                                <div className={'label-wrap'}>
                                    Kinh nghiệm yêu cầu
                                </div>
                                <Select onBlur={handleBlur}
                                        onChange={value => handleChangeSelect(value, 'experience_required')}
                                        options={requiredExperienceOptions}
                                        value={dataCreateOrUpdate.experience_required}
                                        className={'main-select w-full'}/>
                            </div>
                        </div>
                        <div className={'w-[45%]'}>
                            <div className={`input-wrap !mb-[15px]`}>
                                <div className={'label-wrap'}>
                                    Loại công việc
                                </div>
                                <Select onBlur={handleBlur} onChange={value => handleChangeSelect(value, 'type')}
                                        options={jobTypes} value={dataCreateOrUpdate.type}
                                        className={'main-select w-full'}/>
                            </div>
                        </div>
                    </div>

                    <div className={`input-wrap !mb-[15px]`}>
                        <div className={'label-wrap'}>
                            Ngành nghề <span className={'required'}>*</span>
                        </div>
                        <Select onBlur={handleBlur} onChange={value => handleChangeSelect(value, 'category_id')}
                                loading={isLoadingGetCategories}
                                placeholder={'Chọn ngành nghề'}
                                className={'main-select w-full'}
                                value={dataCreateOrUpdate.category_id || null}
                                options={categories?.map(item => {
                                    return {
                                        label: item.name,
                                        value: item._id
                                    }
                                })}
                        />
                        {
                            errorCreateOrUpdate && errorCreateOrUpdate.category_id?.length > 0 ?
                                <span className={'error'}>
                                  <div className={'icon'}>
                                    <InlineSVG src={IconWarning} width={14} height="auto"/>
                                  </div>
                                    {errorCreateOrUpdate.category_id}
                                </span> : ''
                        }
                    </div>

                    <div className={`input-wrap !mb-[15px]`}>
                        <div className={'label-wrap'}>
                            Trạng thái
                        </div>
                        <Switch
                            onChange={checked => setDataCreateOrUpdate({
                                ...dataCreateOrUpdate,
                                status: checked ? JOB_STATUS['OPEN'] : JOB_STATUS['CLOSED']
                            })}
                            className={'main-switch'}
                            checked={dataCreateOrUpdate.status === JOB_STATUS['OPEN']}
                        />
                    </div>
                </div>
            </div>
            <div className={`flex justify-center mt-2.5`}>
                <Button
                    className={`main-btn-close mr-[10px]`}
                    size={'large'}
                    onClick={() => closeModal()}
                >
                    Hủy
                </Button>
                {
                    isTypeModalCreate ?
                        <Button
                            className={`main-btn-primary`}
                            type={'primary'}
                            size={'large'}
                            loading={isLoadingBtnCreateOrUpdate}
                            onClick={() => handleConfirmCreate()}
                        >
                            Đăng tuyển
                        </Button> :
                        <Button
                            className={`main-btn-primary`}
                            type={'primary'}
                            size={'large'}
                            loading={isLoadingBtnCreateOrUpdate}
                            onClick={() => handleConfirmUpdate()}
                        >
                            Cập nhật
                        </Button>
                }
            </div>
        </div>

    )
}
