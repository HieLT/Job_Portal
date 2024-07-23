import CandidateProfile from "../Candidate/Profile/index.jsx";
import CompanyProfile from "../Company/Profile/index.jsx";
import React from "react";
import {useSelector} from "react-redux";
import {USER_ROLE} from "../../utils/constants.js";

export default function ProfileRouting() {
    const authUser = useSelector(state => state.auth.authUser)
    return authUser?.account?.role === USER_ROLE['CANDIDATE'] ? <CandidateProfile/> : <CompanyProfile/>
}
