import _ from "lodash";

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
    }

    return {
        isError: error,
        error: dataError,
    }
}
