import React from "react";
import {Result} from "antd";

export default function Forbidden() {
    return (
        <div className={'w-screen h-screen flex justify-center items-center'}>
            <Result
                status="403"
                title="403"
                subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
            />
        </div>
    )
}
