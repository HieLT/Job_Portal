import _ from "lodash";
import moment from "moment";

export const validateJob = (data, type, errors) => {
    let error = false
    let dataError = _.cloneDeep(errors);

    switch (type) {
        case 'title':
            if (!data.title) {
                dataError.title = 'Tiêu đề không được bỏ trống!';
                error = true;
            } else {
                dataError.title = '';
            }
            break;
        case 'description':
            if (!data.description) {
                dataError.description = 'Mô tả không được bỏ trống!';
                error = true;
            } else {
                dataError.description = '';
            }
            break;
        case 'expired_at':
            if (!data.expired_at) {
                dataError.expired_at = 'Ngày hết hạn không được bỏ trống!';
                error = true;
            } else if (moment(data.expired_at).isSameOrBefore(moment())) {
                dataError.expired_at = 'Ngày hết hạn phải lớn hơn ngày hiện tại!';
                error = true;
            } else {
                dataError.expired_at = '';
            }
            break;
        case 'category_id':
            if (!data.category_id) {
                dataError.category_id = 'Ngành nghề không được bỏ trống!';
                error = true;
            } else {
                dataError.category_id = '';
            }
            break;
        case 'salary':
            if (data.salary !== "Thỏa thuận") {
                if (data.salary?.includes('-')) {
                    const range = data.salary?.split('-')
                    if (!range[0] || !range[1] || range[0] === '#' || range[1] === '#') {
                        dataError.salary = 'Mức lương không được bỏ trống!';
                        error = true;
                    } else if (Number(range[1]) <= Number(range[0])) {
                        dataError.salary = 'Số tiền sau phải lớn hơn số tiền trước!';
                        error = true;
                    }
                } else if (!data.salary) {
                    dataError.salary = 'Mức lương không được bỏ trống!';
                    error = true;
                }
            } else {
                dataError.salary = '';
            }
            break;
        case 'position':
            if (!data.position) {
                dataError.position = 'Vị trí không được bỏ trống!';
                error = true;
            } else {
                dataError.position = '';
            }
            break;
        case 'number_of_recruitment':
            if (!data.number_of_recruitment) {
                dataError.number_of_recruitment = 'Số lượng tuyển không được bỏ trống!';
                error = true;
            } else {
                dataError.number_of_recruitment = '';
            }
            break;
    }

    return {
        isError: error,
        error: dataError,
    }
}
