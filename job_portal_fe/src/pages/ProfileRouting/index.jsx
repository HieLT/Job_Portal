import {useSelector} from "react-redux";
import CandidateProfile from "../Candidate/Profile/index.jsx";
import React from "react";

export default function ProfileRouting() {
    const userRole = useSelector(state => state.auth.authUser)

    return userRole !== 'Candidate' ? <CandidateProfile/> : ''
}
