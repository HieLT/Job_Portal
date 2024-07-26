import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Button, Flex, Upload} from "antd";
import {useDispatch, useSelector} from "react-redux";
import styles from './styles.module.scss'
import {getNotification} from "../../../../../utils/helper.js";
import {DeleteOutlined, LinkOutlined, UploadOutlined} from '@ant-design/icons'
import {setTab} from "../../../../../states/modules/profile/index.js";
import {deleteCandidateCv, uploadCandidateCv} from "../../../../../api/profile/index.js";
import _ from "lodash";
import ModalDeleteDefault from "../../../../../components/ModalDelete/index.jsx";
import {setIsOpenModalDelete, setNewFile} from "../../../../../states/modules/profile/cv/index.js";
import InlineSVG from "react-inlinesvg";
import IconWarning from "../../../../../assets/images/icons/light/warning.svg";

const getBuffer = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsArrayBuffer(file);
};

const beforeUploadCV = (file) => {
    const isPdf = file.type === 'application/pdf'
    if (!isPdf) {
        getNotification('error', 'Loại file CV phải là PDF!');
    }
    return isPdf;
}

export default function ResumeTab() {
    const dispatch = useDispatch();

    const authUser = useSelector(state => state.auth.authUser)
    const candidateProfile = useSelector(state => state.information.candidateProfile)
    const isLoadingBtnUploadCv = useSelector(state => state.cv.isLoadingBtnUploadCv)
    const isLoadingDelete = useSelector(state => state.cv.isLoadingDelete)
    const isOpenModalDelete = useSelector(state => state.cv.isOpenModalDelete)
    const file = useSelector(state => state.cv.newFile)

    const [cvUrl, setCvUrl] = useState('')
    const [loadingCv, setLoadingCv] = useState(false)
    const [cvFileName, setCvFileName] = useState('')
    const [oldCv, setOldCv] = useState(null)

    useEffect(() => {
        dispatch(setTab('cv'))
        setCvFileName('')
        setCvUrl('')
        setOldCv(null)
    }, [dispatch])

    useEffect(() => {
        setOldCv(candidateProfile?.resume_path || null)
    }, [candidateProfile])

    const handleChangeCV = (info) => {
        if (info.file.status === 'uploading') {
            setLoadingCv(true)
        } else if (info.file.status === 'done') {
            getBuffer(info.file.originFileObj, () => {
                setCvFileName(info.file.originFileObj.name)
                setCvUrl(info.file?.response?.url)
                dispatch(setNewFile(info.file.originFileObj))
            });
            setLoadingCv(false)
        } else if (info.file.status === 'error') {
            getNotification('error', 'Tải file thất bại!')
            setLoadingCv(false)
        }
    }

    const handleDeleteCv = () => {
        if (!_.isEmpty(file)) {
            dispatch(setNewFile({}))
            setCvFileName('')
            setCvUrl('')
            setOldCv(null)
        } else {
            dispatch(setIsOpenModalDelete(true))
        }
    }

    const handleUploadCv = () => {
        const data = new FormData()
        data.append('file', file)
        dispatch(uploadCandidateCv(data))
    }

    const handleConfirmDelete = () => {
        dispatch(deleteCandidateCv())
    }

    return (
        <div className={styles.cardWrap}>
            <div className={styles.title}>
                <p className={''}>Quản lý CV</p>
            </div>
            <div className={'px-10 pt-7 pb-5'}>
                <div>
                    <div className={'mt-3 input-wrap'}>
                        <Upload
                            name="file"
                            disabled={_.isEmpty(authUser?.profile)}
                            customRequest={({file, onSuccess}) => {
                                setTimeout(() => {
                                    const uploadedFileUrl = URL.createObjectURL(file);
                                    onSuccess({url: uploadedFileUrl});
                                }, 0);
                            }}
                            showUploadList={false}
                            beforeUpload={beforeUploadCV}
                            onChange={handleChangeCV}
                        >
                            <Button icon={<UploadOutlined/>} loading={loadingCv}
                                    className={'h-[40px] w-[150px] font-medium'}
                                    disabled={_.isEmpty(authUser?.profile)}
                            >
                                Tải CV (.pdf)
                            </Button>
                        </Upload>
                        <div className={'mt-4 flex justify-between items-center w-full'}>
                            {
                                ((candidateProfile?.resume_path && candidateProfile?.resume_path !== '') || !_.isEmpty(file) || oldCv) ?
                                    <div className={'flex items-center mr-5 w-3/4'}>
                                        <LinkOutlined className={'mr-1'}/>
                                        <a onClick={() => window.open(_.isEmpty(file) ? candidateProfile?.resume_path : cvUrl, '_blank')}
                                           className={'text-gray-500 max-w-[100%] whitespace-nowrap overflow-hidden overflow-ellipsis'}>
                                            {_.isEmpty(file) ? candidateProfile?.resume_path : cvFileName}
                                        </a>
                                    </div> : ''
                            }
                            {
                                ((candidateProfile?.resume_path && candidateProfile?.resume_path !== '') || !_.isEmpty(file)) ?
                                    <div className={styles.deleteBtn} onClick={handleDeleteCv}>
                                        <DeleteOutlined/> {_.isEmpty(file) ? 'Xóa' : 'Xóa bản mới tải lên'}
                                    </div> : <i className={'text-gray-500'}>Không có bản CV nào</i>
                            }
                        </div>
                        {
                            _.isEmpty(authUser?.profile) ?
                                <div className={'input-wrap mt-3'}>
                                        <span className={`error !text-[#bdbe63]`}>
                                            <div className={`icon`}>
                                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                                            </div>
                                            Vui lòng cập nhật thông tin cá nhân trước!
                                        </span>
                                </div> : ''
                        }
                    </div>
                </div>
            </div>
            <div className={'w-full flex justify-end px-10'}>
                <Flex vertical gap="small">
                    <Button
                        loading={isLoadingBtnUploadCv}
                        type="primary"
                        onClick={handleUploadCv}
                        size={'large'}
                        className={`main-btn-primary flex justify-center items-center font-semibold`}
                        block
                        disabled={_.isEmpty(file)}
                    >
                        Cập nhật
                    </Button>
                </Flex>
            </div>
            <ModalDeleteDefault
                isModalOpen={isOpenModalDelete}
                loading={isLoadingDelete}
                content={'Xóa bản CV này?'}
                contentBtn={'Xóa'}
                handleOk={handleConfirmDelete}
                handleCancel={() => dispatch(setIsOpenModalDelete(false))}
                handleConfirm={handleConfirmDelete}
            />
        </div>
    );
}
