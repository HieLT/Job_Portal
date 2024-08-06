import HeaderOnly from "../../layouts/HeaderOnly/index.jsx";
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {setBreadcrumb} from "../../states/modules/app/index.js";
import {Avatar, Button, Empty, Input, Popover, Skeleton, Tag, Tooltip} from "antd";
import IconSearch from "../../assets/images/icons/duotone/magnifying-glass.svg";
import _ from "lodash";
import {USER_ROLE} from "../../utils/constants.js";
import DefaultAvatar from '../../assets/images/logos/user_default.png'
import {DownOutlined, RocketOutlined, SendOutlined, SmileOutlined} from '@ant-design/icons'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import MessageContainer from "./MessageContainer/index.jsx";
import {filterDistinctValueByKeyInObjectArray, getNotification} from "../../utils/helper.js";
import styles from './styles.module.scss'
import {startConversation} from "../../api/conversation/index.js";
import {
    appendMessages,
    setActiveConversation,
    setIsKeepScroll,
    setIsNewConversation
} from "../../states/modules/conversation/index.js";
import socketService from "../../socket/index.js";

export default function Conversation() {
    const dispatch = useDispatch()
    const conversations = useSelector(state => state.conversation.conversations)
    const activeConversationId = useSelector(state => state.conversation.activeConversationId)
    const isLoadingGetConversations = useSelector(state => state.conversation.isLoadingGetConversations)
    const isLoadingGetOldMessages = useSelector(state => state.conversation.isLoadingGetOldMessages)
    const isLoadingGetAppliedCompanies = useSelector(state => state.conversation.isLoadingGetAppliedCompanies)
    const appliedCompanies = useSelector(state => state.conversation.appliedCompanies)
    const receiverAccount = useSelector(state => state.conversation.receiverAccount)
    const activeConversation = useSelector(state => state.conversation.activeConversation)
    const authUser = useSelector(state => state.auth.authUser)
    const [scrollToBottom, setScrollToBottom] = useState(false)
    const [sendMessage, setSendMessage] = useState('')
    const inputRef = useRef()

    const hasAvatarOrLogo = activeConversation?.avatar || activeConversation?.logo
    const isCandidate = authUser?.account.role === USER_ROLE['CANDIDATE']
    const [companies, setCompanies] = useState([])

    const handleChangeInput = (value, type) => {
        setSendMessage(type === 'text' ? value : prevState => prevState + value.native)
    }

    const handleSendMessage = () => {
        if (sendMessage?.trim()) {
            const socket = socketService.getSocket()
            if (socket) {
                socket.emit('text_message', {
                    message: sendMessage,
                    id_conversation: activeConversationId,
                    id_sender: authUser?.account?._id,
                    id_recipient: receiverAccount?._id
                })
                setSendMessage('')
                dispatch(setIsKeepScroll(false))
            } else {
                getNotification('error', 'Không thể kết nối')
            }
        }
    }

    const handleStartConversation = (receiver, isNew) => {
        dispatch(setActiveConversation(receiver))
        dispatch(setIsNewConversation(isNew))
        dispatch(startConversation(receiver?._id))
    }

    const handleScrollToBottom = () => {
        dispatch(setIsKeepScroll(false))
    }

    useEffect(() => {
        dispatch(setBreadcrumb([
            {
                title: 'Trang chủ',
                href: '/'
            },
            {
                title: 'Trò chuyện'
            }
        ]))
    }, [dispatch])

    useEffect(() => {
        socketService.createNewSocket(authUser?.account?._id)
        const socket = socketService.getSocket()

        socket.on('message_sent', (msg) => {
            dispatch(appendMessages(msg.message))
        })
        socket.on('new_message', (msg) => {
            dispatch(appendMessages(msg.message))
        })

        return () => {
            socketService.disconnectSocket()
        }
    }, [authUser?.account?._id])

    useEffect(() => {
        inputRef?.current?.focus()
    }, [activeConversation])

    useEffect(() => {
        if (authUser?.account?.role === USER_ROLE['CANDIDATE']) {
            const chattedCompanyIds = conversations?.map(item => item.participants?.find(item => item?.company)?.company?._id)
            const distinctCompanies = filterDistinctValueByKeyInObjectArray(appliedCompanies?.map(item => item.job_id.company_id), '_id')
            setCompanies(distinctCompanies?.filter(item => !chattedCompanyIds?.includes(item._id)))
        }
    }, [appliedCompanies, authUser, conversations])

    return <HeaderOnly>
        <div className={'h-[calc(100vh_-_132px)] mt-6'}>
            <div className={'h-full flex items-center rounded-md bg-[white] shadow-[0_3px_4px_4px_#00000008]'}>

                {/* Conversations */}
                <div className={`${isCandidate ? 'w-1/4' : 'w-1/3'} p-8 border-r-[1px] h-full flex flex-col`}>
                    <Input
                        prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt=""/>}
                        className={`main-input`}
                        placeholder={`Tìm kiếm theo tên ${isCandidate ? 'công ty' : 'ứng viên'}`}
                    />
                    <div className={'mt-3 flex-1'}>
                        {
                            isLoadingGetConversations ? <Skeleton active/> :
                                (
                                    conversations?.length > 0 ? <div className={styles.conversationsWrap}>
                                            {
                                                conversations?.map(conversation => {
                                                    const receiver = conversation.participants?.find(par => isCandidate ? !_.isEmpty(par?.company) : !_.isEmpty(par?.candidate))[isCandidate ? 'company' : 'candidate']

                                                    return (
                                                        <div key={conversation._id}
                                                             onClick={() => handleStartConversation(receiver, false)}
                                                             className={`flex items-center h-[55px] ${receiver._id === activeConversation?._id ? 'bg-[#456]' : 'bg-gray-400'} mb-5 rounded-full p-3 cursor-pointer text-white select-none`}
                                                        >
                                                            <Avatar
                                                                src={isCandidate ? (receiver.logo || DefaultAvatar) :
                                                                    (receiver.avatar || DefaultAvatar)}
                                                                size={40}
                                                            />
                                                            <Tooltip
                                                                title={isCandidate ? receiver.name : (receiver.first_name + ' ' + receiver.last_name)}>
                                                                <div
                                                                    className={'font-semibold text-[15px] ml-3 max-w-[70%] whitespace-nowrap overflow-hidden overflow-ellipsis'}>
                                                                    {isCandidate ? receiver.name : (receiver.first_name + ' ' + receiver.last_name)}
                                                                </div>
                                                            </Tooltip>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div> :
                                        <div className={'mt-36'}>
                                            <Empty
                                                description={
                                                    <i className={'text-gray-500'}>Chưa có cuộc trò chuyện nào</i>
                                                }
                                            />
                                        </div>
                                )
                        }
                    </div>
                </div>

                {/* Message */}
                <div className={`${isCandidate ? 'w-1/2' : 'w-2/3'} h-full p-8`}>
                    {
                        isLoadingGetOldMessages ? <Skeleton active/> :
                            (
                                !_.isEmpty(activeConversation) ?
                                    <div className={'h-full relative'}>
                                        <div className={'flex items-center border-b-[1px] pb-5'}>
                                            <Avatar
                                                size={'large'}
                                                src={!hasAvatarOrLogo ? DefaultAvatar : (isCandidate ? activeConversation?.logo : activeConversation?.avatar)}/>
                                            <div className={'ml-3'}>
                                                <div className={'font-semibold text-base'}>
                                                    {isCandidate ? activeConversation.name.toUpperCase() : (activeConversation.first_name + ' ' + activeConversation.last_name)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.chatWrap}>
                                            <MessageContainer setScrollToBottom={setScrollToBottom}
                                                              receiver={activeConversation}/>
                                        </div>
                                        {scrollToBottom ?
                                            <Button shape={'circle'} icon={<DownOutlined/>}
                                                    onClick={handleScrollToBottom}
                                                    className={'absolute bottom-[60px] right-0 bg-white'}></Button> : ''}
                                        <div className={'border-t-[1px] pt-[20px]'}>
                                            <Input
                                                ref={inputRef}
                                                size={'large'}
                                                placeholder={`Tin nhắn tới ${isCandidate ? activeConversation.name : (activeConversation.first_name + ' ' + activeConversation.last_name)}`}
                                                value={sendMessage}
                                                onChange={e => handleChangeInput(e.target.value, 'text')}
                                                suffix={
                                                    <>
                                                        <Popover trigger="click" content={
                                                            <Picker
                                                                data={data}
                                                                onEmojiSelect={e => handleChangeInput(e, 'emoji')}
                                                            />
                                                        }>
                                                            <SmileOutlined/>
                                                        </Popover>
                                                        <SendOutlined className={'cursor-pointer ml-1'}
                                                                      onClick={handleSendMessage}/>
                                                    </>
                                                }
                                                onKeyPress={e => {
                                                    if (e.key === 'Enter') {
                                                        handleSendMessage()
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div> :
                                    <div className={'h-full flex flex-col items-center justify-center'}>
                                        <RocketOutlined style={{fontSize: '80px', color: '#dce0e6'}}/>
                                        <i className={'text-[#999898] text-base mt-2'}>Hãy chọn một cuộc trò chuyện</i>
                                    </div>
                            )
                    }
                </div>

                {/* Applied companies */}
                {
                    isCandidate ? <div className={'py-6 pl-4 w-1/4 border-l-[1px] h-full'}>
                        {
                            isLoadingGetAppliedCompanies ? <Skeleton active/> :
                                (
                                    companies?.length > 0 ? <>
                                            <div className={'font-semibold text-[17px]'}>Công ty đã ứng tuyển</div>
                                            <div className={styles.companyWrap}>
                                                {
                                                    companies?.map(company => (
                                                        <div key={company._id}
                                                             className={'flex items-center justify-between mb-6'}>
                                                            <div className={'flex items-center'}>
                                                                <div className={'rounded-[50%] border-[1px] p-0.5'}>
                                                                    <Avatar src={company.logo || DefaultAvatar} size={40}/>
                                                                </div>
                                                                <Tooltip title={company.name}>
                                                                    <div
                                                                        className={'font-semibold text-[13px] ml-2 max-w-[70%] whitespace-nowrap overflow-hidden overflow-ellipsis'}>
                                                                        {company.name.toUpperCase()}
                                                                    </div>
                                                                </Tooltip>
                                                            </div>
                                                            <div onClick={() => handleStartConversation(company, true)}
                                                                 className={'cursor-pointer'}>
                                                                <Tag color={'success'} className={'font-semibold'}>
                                                                    Nhắn tin
                                                                </Tag>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </> :
                                        <div className={'h-full flex items-center justify-center'}>
                                            <Empty
                                                description={
                                                    <i className={'text-gray-500'}>Bạn chưa ứng tuyển thêm công việc
                                                        nào</i>
                                                }
                                            />
                                        </div>
                                )
                        }
                    </div> : ''
                }
            </div>
        </div>
    </HeaderOnly>
}
