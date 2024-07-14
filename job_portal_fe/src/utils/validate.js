import {isValidEmail, isValidPhone} from "./helper";
import _ from "lodash";

export const isValidate = (data, type, errors) => {
    let error = false
    let dataError = _.cloneDeep(errors);

    switch (type) {
        case 'first_name':
            if (data.first_name?.length === 0) {
                dataError.first_name = 'Họ không được bỏ trống!';
                error = true;
            } else if (data.first_name?.length > 200) {
                dataError.first_name = 'Kí tự tối đa cho phép là 200 kí tự!';
                error = true;
            } else {
                dataError.first_name = '';
            }
            break;
        case 'last_name':
            if (data.last_name?.length === 0) {
                dataError.last_name = 'Tên không được bỏ trống!';
                error = true;
            } else if (data.last_name?.length > 200) {
                dataError.last_name = 'Kí tự tối đa cho phép là 200 kí tự!';
                error = true;
            } else {
                dataError.last_name = '';
            }
            break;
        case 'email':
            if (!data.email || data.email?.length === 0) {
                dataError.email = 'Email không được bỏ trống!';
                error = true;
            } else if (!isValidEmail(data.email)) {
                dataError.email = 'Email không đúng định dạng!';
                error = true;
            } else if (data.email?.length > 200) {
                dataError.email = 'Kí tự tối đa cho phép là 200 kí tự!';
                error = true;
            } else {
                dataError.email = '';
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
            }
            break;
        case 'password':
            if (data.password?.length === 0) {
                dataError.password = 'Mật khẩu không được bỏ trống!';
                error = true;
            } else {
                dataError.password = '';
            }
            break;
        case 'confirm_password':
            if (data.confirm_password?.length === 0 || data.confirm_password !== data.password) {
                dataError.confirm_password = 'Mật khẩu xác nhận không khớp!';
                error = true;
            } else {
                dataError.confirm_password = '';
            }
            break;
    }

    return {
        isError: error,
        error: dataError,
    }
}
