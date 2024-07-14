import React, {useEffect, useState} from 'react';
import {Button, Input, Skeleton} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "../../../../assets/images/icons/light/warning.svg";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {setErrorCreateOrUpdate} from "../../../../states/modules/user/index.js";
import {handleCheckValidateConfirm} from "../../../../utils/helper.js";

export default function CreateOrUpdate(props) {
    const {isTypeModalCreate, closeModal} = props;
    const dispatch = useDispatch();
    const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        address: '',
        password: ''
    });
    const isLoadingBtnCreateOrUpdate = useSelector(state => state.user.isLoadingBtnCreateOrUpdate);
    const errorCreateOrUpdate = useSelector(state => state.user.errorCreateOrUpdate);
    const visibleModalCreateOrUpdate = useSelector(state => state.user.visibleModalCreateOrUpdate);
    const detailUser = useSelector(state => state.user.detailUser);
    const detailAdmin = useSelector(state => state.user.detailAdmin);
    const isLoadingDetailUser = useSelector(state => state.user.isLoadingDetailUser);

    useEffect(() => {
        if (detailAdmin && !isTypeModalCreate) {
            let data = _.cloneDeep(dataCreateOrUpdate);
            data.username = detailAdmin.username;
            data.first_name = detailAdmin.first_name;
            data.last_name = detailAdmin.last_name;
            data.email = detailAdmin.email;
            data.mobile = detailAdmin.mobile;
            data.address = detailAdmin.address;
            data.password = detailAdmin.password;
            setDataCreateOrUpdate(data)
        } else {
            setDataCreateOrUpdate({
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                mobile: '',
                address: '',
                password: ''
            })
        }
    }, [detailAdmin, isTypeModalCreate, visibleModalCreateOrUpdate])

    const handleReloadError = () => {
        if (
            errorCreateOrUpdate.username?.length !== 0 ||
            errorCreateOrUpdate.first_name?.length !== 0 ||
            errorCreateOrUpdate.last_name?.length !== 0 ||
            errorCreateOrUpdate.email?.length !== 0 ||
            errorCreateOrUpdate.mobile?.length !== 0 ||
            errorCreateOrUpdate.address?.length !== 0 ||
            errorCreateOrUpdate.password?.length !== 0
        ) {
            dispatch(setErrorCreateOrUpdate({
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                mobile: '',
                address: '',
                password: ''
            }))
        }
    }

    const handleChangeInput = (e, type) => {
        handleReloadError();
        let value = e.target.value;
        let data = _.cloneDeep(dataCreateOrUpdate);
        data[type] = value
        setDataCreateOrUpdate(data)
    }

    const handleChangeSelect = (value, type) => {
        handleReloadError();
        let data = _.cloneDeep(dataCreateOrUpdate);
        data[type] = value
        setDataCreateOrUpdate(data)
    }

    const handleConfirmCreate = () => {
        let validate = handleCheckValidateConfirm(dataCreateOrUpdate, errorCreateOrUpdate);
        dispatch(setErrorCreateOrUpdate(validate.dataError))
        if (!validate.isError) {
        }
    }

    const handleConfirmUpdate = () => {
        delete dataCreateOrUpdate.password;
        let validate = handleCheckValidateConfirm(dataCreateOrUpdate, errorCreateOrUpdate);
        dispatch(setErrorCreateOrUpdate(validate.dataError))
        if (!validate.isError) {
        }
    }

    return (
        <div>
            <div className={'flex justify-between'}>
                <div className={'w-5/12'}>
                    <div className={`input-wrap`}>
                        <div className={'label-wrap'}>
                            Username <span className={'required'}>*</span>
                        </div>
                        {
                            !isTypeModalCreate && isLoadingDetailUser ?
                                <Skeleton.Input size={"large"} active={true} block={true}/> :
                                <Input
                                    className={`main-input`}
                                    placeholder={'Enter username'}
                                    value={dataCreateOrUpdate.username}
                                    onChange={(e) => handleChangeInput(e, 'username')}
                                />
                        }
                        {
                            errorCreateOrUpdate && errorCreateOrUpdate.username?.length > 0 ?
                                <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height="auto"/>
              </div>
                                    {errorCreateOrUpdate.username}
            </span> : ''
                        }
                    </div>

                    <div className={`input-wrap`}>
                        <div className={'label-wrap'}>
                            First name <span className={'required'}>*</span>
                        </div>
                        {
                            !isTypeModalCreate && isLoadingDetailUser ?
                                <Skeleton.Input size={"large"} active={true} block={true}/> :
                                <Input
                                    className={`main-input`}
                                    placeholder={'Enter first name'}
                                    value={dataCreateOrUpdate.first_name}
                                    onChange={(e) => handleChangeInput(e, 'first_name')}
                                />
                        }
                        {
                            errorCreateOrUpdate && errorCreateOrUpdate.first_name?.length > 0 ?
                                <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height="auto"/>
              </div>
                                    {errorCreateOrUpdate.first_name}
            </span> : ''
                        }
                    </div>

                    <div className={`input-wrap`}>
                        <div className={'label-wrap'}>
                            Last name <span className={'required'}>*</span>
                        </div>
                        {
                            !isTypeModalCreate && isLoadingDetailUser ?
                                <Skeleton.Input size={"large"} active={true} block={true}/> :
                                <Input
                                    className={`main-input`}
                                    placeholder={'Enter last name'}
                                    value={dataCreateOrUpdate.last_name}
                                    onChange={(e) => handleChangeInput(e, 'last_name')}
                                />
                        }
                        {
                            errorCreateOrUpdate && errorCreateOrUpdate.last_name?.length > 0 ?
                                <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height="auto"/>
              </div>
                                    {errorCreateOrUpdate.last_name}
            </span> : ''
                        }
                    </div>

                    <div className={`input-wrap`}>
                        <div className={'label-wrap'}>
                            Email <span className={'required'}>*</span>
                        </div>
                        {
                            !isTypeModalCreate && isLoadingDetailUser ?
                                <Skeleton.Input size={"large"} active={true} block={true}/> :
                                <Input
                                    className={`main-input`}
                                    placeholder={'Enter email'}
                                    value={dataCreateOrUpdate.email}
                                    onChange={(e) => handleChangeInput(e, 'email')}
                                />
                        }
                        {
                            errorCreateOrUpdate && errorCreateOrUpdate.email?.length > 0 ?
                                <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height="auto"/>
              </div>
                                    {errorCreateOrUpdate.email}
            </span> : ''
                        }
                    </div>
                </div>
                <div className={'w-6/12'}>
                    {
                        isTypeModalCreate ?
                            <div className={`input-wrap`}>
                                <div className={'label-wrap'}>
                                    Password <span className={'required'}>*</span>
                                </div>
                                <Input.Password
                                    className={`main-input`}
                                    placeholder={'Enter password'}
                                    value={dataCreateOrUpdate.password}
                                    onChange={(e) => handleChangeInput(e, 'password')}
                                />
                                {
                                    errorCreateOrUpdate && errorCreateOrUpdate.password?.length > 0 ?
                                        <span className={'error'}>
                    <div className={'icon'}>
                      <InlineSVG src={IconWarning} width={14} height="auto"/>
                    </div>
                                            {errorCreateOrUpdate.password}
                  </span> : ''
                                }
                            </div> : ''
                    }

                    <div className={`input-wrap !mb-[15px]`}>
                        <div className={'label-wrap'}>
                            Phone <span className={'required'}>*</span>
                        </div>
                        {
                            !isTypeModalCreate && isLoadingDetailUser ?
                                <Skeleton.Button shape={"round"} size={"large"} active={true}/> :
                                <Input
                                    className={`main-input`}
                                    placeholder={'Enter phone'}
                                    value={dataCreateOrUpdate.mobile}
                                    onChange={(e) => handleChangeInput(e, 'mobile')}
                                />
                        }
                        {
                            errorCreateOrUpdate && errorCreateOrUpdate.mobile?.length > 0 ?
                                <span className={'error'}>
                    <div className={'icon'}>
                      <InlineSVG src={IconWarning} width={14} height="auto"/>
                    </div>
                                    {errorCreateOrUpdate.mobile}
                  </span> : ''
                        }
                    </div>

                    <div className={`input-wrap !mb-[15px]`}>
                        <div className={'label-wrap'}>
                            Address
                        </div>
                        {
                            !isTypeModalCreate && isLoadingDetailUser ?
                                <Skeleton.Button shape={"round"} size={"large"} active={true}/> :
                                <Input
                                    className={`main-input`}
                                    placeholder={'Enter address'}
                                    value={dataCreateOrUpdate.address}
                                    onChange={(e) => handleChangeInput(e, 'address')}
                                />
                        }
                    </div>
                </div>
            </div>
            <div className={`flex justify-center`}>
                <Button
                    className={`main-btn-close mr-[10px]`}
                    size={'large'}
                    onClick={() => closeModal()}
                >Close
                </Button>
                {
                    isTypeModalCreate ?
                        <Button
                            className={`main-btn-primary`}
                            type={'primary'}
                            size={'large'}
                            loading={isLoadingBtnCreateOrUpdate}
                            onClick={() => handleConfirmCreate()}
                        >Create
                        </Button> :
                        <Button
                            className={`main-btn-primary`}
                            type={'primary'}
                            size={'large'}
                            loading={isLoadingBtnCreateOrUpdate}
                            onClick={() => handleConfirmUpdate()}
                        >Update
                        </Button>
                }
            </div>
        </div>

    )
}
