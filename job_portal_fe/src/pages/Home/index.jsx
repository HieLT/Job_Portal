import React from 'react';
import styles from './styles.module.scss';
import HeaderOnly from '../../layouts/HeaderOnly';
import ResultField from "./components/ResultField/index.jsx"
import { setBreadcrumb } from '../../states/modules/app/index.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(setBreadcrumb([
      {
        href : '/',
        title: 'Trang chủ'
      }
    ]))
  },[])

  console.log(useSelector((state) => state.app.breadcrumb));
  return (
    <HeaderOnly>
      <div className={styles.card}>
        <div className={styles.inputGroup}>
          <div className={styles.inputItem}>
            <input
              type="text"
              placeholder="Tìm công ty, việc làm"
              className={styles.input}
            />
          </div>
          <div className={styles.inputItem}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a6 6 0 00-6 6c0 4 6 12 6 12s6-8 6-12a6 6 0 00-6-6z" />
            </svg>
            <select className={styles.select}>
              <option value="">Thành phố</option>
              <option value="nyc">New York</option>
              <option value="sf">San Francisco</option>
              <option value="la">Los Angeles</option>
            </select>
          </div>
          <div className={styles.inputItem}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-6l-2-2h-4l-2 2z" />
            </svg>
            <select className={styles.select}>
              <option value="">Danh mục </option>
              <option value="dev">Development</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
          <div className={styles.inputItem}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35" />
            </svg>
            <button className={`${styles.button} ${styles.buttonFind}`}>
              Tìm kiếm
            </button>
          </div>
          <div className={styles.inputItem}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <button className={`${styles.button} ${styles.buttonFilter}`}>
              Tìm kiếm nâng cao
            </button>
          </div>
        </div>
        <ResultField  />
      </div>
    </HeaderOnly>
  );
};

export default HomePage;
