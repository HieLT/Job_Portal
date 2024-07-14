import _ from "lodash";
import moment from "moment";

export const isValidateLesson = (data, type, errors) => {
    let error = false
    let dataError = _.cloneDeep(errors);

    switch (type) {
        case 'roomCode':
            if (data.roomCode.length === 0) {
                dataError.roomCode = 'Mã phòng không được để trống!';
                error = true;
            } else {
                dataError.roomCode = '';
            }
            break;
        case 'name':
            if (data.name.length === 0) {
                dataError.name = 'Tên buổi học không được để trống!';
                error = true;
            } else {
                dataError.name = '';
            }
            break;
        case 'startTime':
            if (!data.startTime || data.startTime.length === 0) {
                dataError.startTime = 'Thời gian bắt đầu không được để trống!';
                error = true;
            } else {
                dataError.startTime = '';
            }
            break;
        case 'endTime':
            if (!data.endTime || data.endTime.length === 0) {
                dataError.endTime = 'Thời gian bắt đầu không được để trống!';
                error = true;
            } else if (data.endTime && data.startTime) {
                let start = moment(data.startTime).format('X')
                let end = moment(data.endTime).format('X')
                if (end < start) {
                    dataError.endTime = 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu.';
                    error = true;
                } else {
                    dataError.endTime = '';
                }
            } else {
                dataError.endTime = '';
            }
            break;
    }

    return {
        isError: error,
        error: dataError,
    }
}
