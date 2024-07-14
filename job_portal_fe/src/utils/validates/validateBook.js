import _ from "lodash";

export const validateBook = (data, type, errors) => {
    let error = false
    let dataError = _.cloneDeep(errors);

    switch (type) {
        case 'image':
            if (!data.image) {
                dataError.image = 'Cover is required!';
                error = true;
            } else {
                dataError.image = '';
            }
            break;
        case 'title':
            if (!data.title) {
                dataError.title = 'Title is required!';
                error = true;
            } else {
                dataError.title = '';
            }
            break;
        case 'author':
            if (!data.author) {
                dataError.author = 'Author is required!';
                error = true;
            } else {
                dataError.author = '';
            }
            break;
        case 'price':
            if (!data.price) {
                dataError.price = 'Price is required!';
                error = true;
            } else if (data.price && (!_.isNumber(data.price) || (_.isNumber(data.price) && data.price <= 0))) {
                dataError.price = 'Price must be a positive number!';
                error = true;
            } else {
                dataError.price = '';
            }
            break;
        case 'old_price':
            if (data.old_price) {
                if (!_.isNumber(data.old_price) || (_.isNumber(data.old_price) && data.old_price <= 0)) {
                    dataError.old_price = 'Old price must be a positive number!';
                    error = true;
                } else if (_.isNumber(data.old_price) && (data.old_price <= data.price)) {
                    dataError.old_price = 'Old price must be bigger than current price!';
                    error = true;
                }
            } else {
                dataError.old_price = '';
            }
            break;
        case 'quantity':
            if (!data.quantity) {
                dataError.quantity = 'Quantity is required!';
                error = true;
            } else if (data.quantity && (!_.isNumber(data.quantity) || (_.isNumber(data.quantity) && data.quantity < 0))) {
                dataError.quantity = 'Quantity must be a valid number!';
                error = true;
            } else {
                dataError.quantity = '';
            }
            break;
    }

    return {
        isError: error,
        error: dataError,
    }
}
