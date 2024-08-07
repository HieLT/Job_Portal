import React, { useEffect, useRef, useState } from 'react';
import { Input, Select, Button, Pagination } from 'antd';
import HeaderOnly from '../../layouts/HeaderOnly';
import ResultField from "./components/ResultField/index.jsx";
import { setBreadcrumb } from '../../states/modules/app/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { getJob } from '../../api/home/index.js';
import styles from './styles.module.scss';


const Type = ['FULL-TIME', 'INTERNSHIP', 'PART-TIME'];
const Experience = ['LESS THAN 1 YEAR', 'NOT REQUIRED', '1-3 YEARS', 'MORE THAN 3 YEARS'];

const HomePage = () => {
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.home.jobs);
    const currentPage = useSelector((state) => state.home.page);
    const totalPages = useSelector((state) => state.home.totalPages);
    const Categories = useSelector((state) => state.jobManagement.categories)

    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchExperience, setSearchExperience] = useState('');
    const [searchCategory, setSearchCategory] = useState('');


    useEffect(() => {
        dispatch(setBreadcrumb([{ title: 'Trang chủ' }]));
    }, [dispatch]);

    const handleSearch = async () => {
        await dispatch(getJob({
            key: searchInput,
            experience_required: searchExperience,
            category: searchCategory,
            type: searchType,
        }));
    };

    const handlePageChange = async (page) => {
        if (page >= 1 && page <= totalPages) {
            await dispatch(getJob({
                key: searchInput,
                experience_required: searchExperience,
                category: searchCategory,
                type: searchType,
                page: page
            }));
            window.scroll({
                top: 0, 
                left: 0, 
                behavior: 'smooth' 
               });
        }
    };

    return (
        <HeaderOnly>
            <div className={styles.container}>
                <div className={styles.inputGroup}>
                    <div className={styles.leftContainer}>
                        <Input
                            placeholder="Tìm công ty, việc làm"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                    <div className={styles.rightContainer}>
                        <Select
                            options={Categories.map((category) => {
                                return {
                                    label: category.name,
                                    value: category.name
                                }
                            })}
                            allowClear={true}
                            placeholder='Ngành Nghề'
                            value={searchCategory ? searchCategory : null}
                            onChange={(value) => setSearchCategory(value)}
                            style={{ width: '200px' }}
                        />
                        <Select
                            options={Experience.map((exp) => {
                                return {
                                    label : exp,
                                    value : exp
                                }
                            })}
                            placeholder='Kinh Nghiệm'
                            allowClear={true}
                            value={searchExperience? searchExperience : null}
                            onChange={(value) => setSearchExperience(value)}
                            style={{ width: '200px' }}
                        />

                        <Select
                            id="type"
                            value={searchType ? searchType : null}
                            options={Type.map((typ) => {
                                return {
                                    label : typ,
                                    value : typ
                                }    
                            })}
                            allowClear={true}
                            placeholder="Hình Thức"
                            onChange={(value) => setSearchType(value)}
                            style={{ width: '200px' }}
                        />

                        <Button type="primary" onClick={handleSearch}>
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
                <ResultField jobs={jobs}  />
                {jobs?.length > 0 ? (
                    <div className='flex items-center justify-center mt-5'>
                        <Pagination
                        current={currentPage}
                        total={totalPages * 10} 
                        onChange={handlePageChange}
                        pageSize={10}
                    />
                    </div>
                ) : ''} 
            </div>
        </HeaderOnly>
    );
};

export default HomePage;
