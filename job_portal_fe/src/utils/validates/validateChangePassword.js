import _ from "lodash";

export const validateChangePassword = (data, type, errors) => {
    let error = false
    let dataError = _.cloneDeep(errors);

    switch (type) {
        case 'currentPassword':
            if (!data.currentPassword) {
                dataError.currentPassword = 'Mật khẩu hiện tại không được bỏ trống!';
                error = true;
            } else {
                dataError.currentPassword = '';
            }
            break;
        case 'newPassword':
            if (!data.newPassword) {
                dataError.newPassword = 'Mật khẩu mới không được bỏ trống!';
                error = true;
            } else if (data.currentPassword && (data.newPassword === data.currentPassword)) {
                dataError.newPassword = 'Mật khẩu mới và mật khẩu hiện tại trùng nhau!';
                error = true;
            } else {
                dataError.newPassword = ''
            }
            break;
        case 'confirmPassword':
            if (!data.confirmPassword) {
                dataError.confirmPassword = 'Mật khẩu xác nhận không được bỏ trống!';
                error = true;
            } else if (data.newPassword && (data.newPassword !== data.confirmPassword)) {
                dataError.confirmPassword = 'Mật khẩu xác nhận không khớp!';
                error = true;
            } else {
                dataError.confirmPassword = ''
            }
            break;
    }

    return {
        isError: error,
        error: dataError,
    }
}
