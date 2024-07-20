import CandidateProfile from "../Candidate/Profile/index.jsx";
import CompanyProfile from "../Company/Profile/index.jsx";
import React from "react";
import {getAuthRole} from "../../utils/localStorage.js";

export default function ProfileRouting() {
    return getAuthRole() === 'Candidate' ? <CandidateProfile/> : <CompanyProfile/>
}
