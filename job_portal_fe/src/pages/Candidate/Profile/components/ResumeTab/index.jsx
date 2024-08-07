import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Button, Flex, Input, Skeleton, Upload} from "antd";
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
import FileIcon from '../../../../../assets/images/icons/light/pdf.svg'

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
    const isLoadingBtnUploadCv = useSelector(state => state.cv.isLoadingBtnUploadCv)
    const isLoadingGetResumes = useSelector(state => state.cv.isLoadingGetResumes)
    const myResumes = useSelector(state => state.cv.myResumes)
    const isLoadingDelete = useSelector(state => state.cv.isLoadingDelete)
    const isOpenModalDelete = useSelector(state => state.cv.isOpenModalDelete)
    const file = useSelector(state => state.cv.newFile)

    const [cvUrl, setCvUrl] = useState('')
    const [loadingCv, setLoadingCv] = useState(false)
    const [cvFileName, setCvFileName] = useState('')
    const [fileName, setFileName] = useState('')
    const [fileId, setFileId] = useState(null)

    useEffect(() => {
        dispatch(setTab('cv'))
        setFileId(null)
        setCvFileName('')
        setCvUrl('')
    }, [dispatch])

    useEffect(() => {
        setFileName(cvFileName)
    }, [cvFileName])

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

    const handleDeleteCv = (fileId) => {
        setFileId(fileId)
        dispatch(setIsOpenModalDelete(true))
    }

    const handleUploadCv = () => {
        if (!fileName) {
            getNotification('error', 'Tên file không được bỏ trống')
        } else {
            const data = new FormData()
            data.append('name_resume', fileName)
            data.append('file', file)
            dispatch(uploadCandidateCv(data))
        }
    }

    const handleConfirmDelete = () => {
        if (fileId) {
            dispatch(deleteCandidateCv(fileId))
        }
    }

    return (
        <div className={styles.cardWrap}>
            <div className={styles.title}>
                <p className={''}>Quản lý CV</p>
            </div>
            <div className={'px-10 pt-7 pb-5'}>
                {
                    isLoadingGetResumes ? <Skeleton active/> :
                        <div>
                            <div className={styles.tabContainer}>
                                <div className={styles.halfPart}>
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
                                    <div className={'mt-6'}>
                                        {
                                            !_.isEmpty(file) ? <>
                                                <div className={'input-wrap flex items-center w-1/2'}>
                                                    <div
                                                        className={'label-wrap flex w-auto mr-4 font-semibold text-sm'}>
                                                        Tên file <div className={'required ml-1'}>*</div>
                                                    </div>
                                                    <Input className={'w-[70%]'} value={fileName}
                                                           onChange={e => setFileName(e.target.value)}/>
                                                </div>
                                                <div className={'flex items-center mr-5 w-full'}>
                                                    <LinkOutlined className={'mr-1'}/>
                                                    <a onClick={() => window.open(cvUrl, '_blank')}
                                                       className={'text-gray-500 max-w-[100%] whitespace-nowrap overflow-hidden overflow-ellipsis'}>
                                                        {cvFileName}
                                                    </a>
                                                </div>
                                            </> : ''
                                        }
                                    </div>
                                </div>
                                <div className={styles.halfPartRight}>
                                    <div className={'font-semibold text-lg mb-5'}>Tải lên gần đây</div>
                                    {
                                        !_.isEmpty(myResumes) ?
                                            myResumes?.map(item => (
                                                <div key={item._id}
                                                     className={'flex items-center justify-between mb-3.5'}>
                                                    <a href={String(item.file_url)} target={'_blank'}
                                                       className={'flex items-center w-[80%] justify-start text-[15px] font-medium'}
                                                       rel="noreferrer"
                                                    >
                                                        <InlineSVG src={FileIcon} width={24} height={24}/>
                                                        <div
                                                            className={'ml-2.5 w-full whitespace-nowrap overflow-hidden overflow-ellipsis'}>
                                                            {item.file_name}
                                                        </div>
                                                    </a>
                                                    <div className={styles.deleteBtn}
                                                         onClick={() => handleDeleteCv(item._id)}>
                                                        <DeleteOutlined/> Xóa
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            <i className={'text-gray-500'}>Không có bản CV nào</i>
                                    }
                                </div>
                            </div>
                        </div>
                }
            </div>
            <div className={'w-full flex justify-end px-10 mt-5'}>
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
