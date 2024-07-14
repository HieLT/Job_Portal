import React from "react";
import {Pagination, Table} from "antd";
import styles from './styles.module.scss'
import './styles.scss'
import PropTypes from "prop-types";

TableDefault.prototype = {
    isPagination: PropTypes.bool
}

TableDefault.defaultProps = {
    isPagination: true
}

function TableDefault(props) {
    let {
        dataSource, columns, pagination, loading, rowSelection, extraClassName,
        onChange, handleSelectPagination, isPagination, rowKey
    } = props;

    return (
        <div className={`${styles.tableDefaultWrap}`}>
            <Table
                rowSelection={rowSelection || false}
                loading={loading}
                className={`main-table mb-[15px] ${!isPagination ? 'no-pagination' : ''} ${extraClassName || ''}`}
                rowClassName={`main-row`}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                rowKey={rowKey || '_id'}
                onChange={onChange}
                scroll={{y: isPagination ? 'calc(100vh - 380px)' : ''}}
            />
            {
                isPagination ?
                    <Pagination
                        className={'flex justify-end'}
                        current={pagination.currentPage}
                        total={pagination.totalRecord}
                        pageSize={pagination.perPage}
                        onChange={(e) => handleSelectPagination(e)}
                    />
                    : ''
            }
        </div>
    )
}

export default TableDefault

