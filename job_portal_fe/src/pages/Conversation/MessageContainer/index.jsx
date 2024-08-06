import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIsKeepScroll} from "../../../states/modules/conversation/index.js";
import moment from "moment";
import {Avatar} from "antd";
import DefaultAvatar from '../../../assets/images/logos/user_default.png'
import {USER_ROLE} from "../../../utils/constants.js";
import styles from './styles.module.scss'

export default function MessageContainer(props) {
    const receiver = props.receiver
    const oldMessages = useSelector(state => state.conversation.oldMessages)
    const senderAccount = useSelector(state => state.conversation.senderAccount)
    const isKeepScroll = useSelector(state => state.conversation.isKeepScroll)
    const me = useSelector(state => state.auth.authUser)
    const dispatch = useDispatch()
    const messageRef = useRef()
    let messageCount = 0
    let time = null

    const isCandidate = me?.account?.role === USER_ROLE['CANDIDATE']

    const handleScrollMessages = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight < 200) {
            dispatch(setIsKeepScroll(false))
            props.setScrollToBottom(false)
        } else {
            dispatch(setIsKeepScroll(true))
            props.setScrollToBottom(true)
        }
    }

    useEffect(() => {
        if (messageRef?.current && !isKeepScroll) {
            messageRef.current.scrollTop = messageRef.current?.scrollHeight - messageRef.current?.offsetHeight
        }
    }, [oldMessages, isKeepScroll])

    const formatTime = (isoString) => {
        return moment(isoString).format('HH:mm')
    }

    return <div
        className={styles.messageWrap} ref={messageRef}
        onScroll={handleScrollMessages}
    >
        {
            oldMessages?.map((item, index) => {
                time = formatTime(item.created_at)
                const showTime = (formatTime(oldMessages?.[index + 1]?.created_at) !== time) || (senderAccount?._id !== oldMessages?.[index + 1]?.from)
                const isMe = item.from === me?.account?._id
                !isMe ? messageCount++ : messageCount = 0

                return (
                    <div key={index}>
                        <div className={`flex ${isMe ? 'justify-end' : ''}`}>
                            <div className={'flex mb-[6px] max-w-[100%]'}>
                                {isMe ? <div className={'w-[116px]'}></div> : ''}
                                {
                                    (!isMe && messageCount === 1) ?
                                        <Avatar size={40} className={'select-none'} src={
                                            (receiver?.logo || receiver?.avatar) ?
                                                (isCandidate ? receiver?.logo : receiver?.avatar)
                                                : DefaultAvatar
                                        }/> :
                                        <div className={'ml-[40px]'}></div>
                                }
                                <div
                                    className={`max-w-[calc(100%_-_116px_-_40px)] p-3 ml-2 rounded-xl shadow-message-card flex-1 ${isMe ? 'bg-[#c8ddff]' : 'bg-gray-200'}`}>
                                    <p className={'text-base'} style={{wordWrap: 'break-word'}}>{item.text}</p>
                                    {showTime ? <p className={'text-xs select-none mt-2.5'}>{time}</p> : ''}
                                </div>
                                {!isMe ? <div className={'w-[116px]'}></div> : ''}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
}
