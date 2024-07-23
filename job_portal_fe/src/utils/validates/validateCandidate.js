import _ from "lodash";
import {isValidPhone} from "../helper.js";

export const validateCandidate = (data, type, errors) => {
    let error = false
    let dataError = _.cloneDeep(errors);

    switch (type) {
        case 'first_name':
            if (!data.first_name) {
                dataError.first_name = 'Họ không được bỏ trống!';
                error = true;
            } else {
                dataError.first_name = '';
            }
            break;
        case 'last_name':
            if (!data.last_name) {
                dataError.last_name = 'Tên không được bỏ trống!';
                error = true;
            } else {
                dataError.last_name = '';
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
    }

    return {
        isError: error,
        error: dataError,
    }
}
