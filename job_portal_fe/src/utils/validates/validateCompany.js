import _ from "lodash";
import {isValidPhone, isValidWebsiteUrl} from "../helper.js";

export const validateCompany = (data, type, errors) => {
    let error = false
    let dataError = _.cloneDeep(errors);
    switch (type) {
        case 'name':
            if (!data.name) {
                dataError.name = 'Tên công ty không được bỏ trống!';
                error = true;
            } else {
                dataError.name = '';
            }
            break;
        case 'phone':
            if (data.phone) {
                if (!isValidPhone(data.phone)) {
                    dataError.phone = 'Số điện thoại không đúng định dạng!';
                    error = true;
                } else if (data.phone?.length > 200) {
                    dataError.phone = 'Kí tự tối đa cho phép là 200 kí tự!';
                    error = true;
                } else {
                    dataError.phone = '';
                }
            } else {
                dataError.phone = 'Số điện thoại không được bỏ trống!';
                error = true;
            }
            break;
        case 'location':
            if (!data.location) {
                dataError.location = 'Địa chỉ không được bỏ trống!';
                error = true;
            } else {
                dataError.location = '';
            }
            break;
        case 'headcount':
            if (data.headcount) {
                if (isNaN(data.headcount) || !Number.isInteger(Number(data.headcount)) || Number(data.headcount) <= 0) {
                    dataError.headcount = 'Số lượng phải là một số nguyên dương!';
                    error = true;
                }
            }
            break;
        case 'website_url':
            if (data.website_url) {
                if (!isValidWebsiteUrl(data.website_url)) {
                    dataError.website_url = 'Website không đúng định dạng!';
                    error = true;
                } else {
                    dataError.website_url = '';
                }
            }
            break;
    }

    return {
        isError: error,
        error: dataError,
    }
}
