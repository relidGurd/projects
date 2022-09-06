import React from 'react';
import styles from './card.css';

export function Card() {
  return (
    <li className={styles.card}>
      <div className={styles.textContent}>
        <div className={styles.metaData}>
          <div className={styles.userLink}>
            <img className={styles.avatar} src="https://cdn.dribbble.com/users/12116994/avatars/normal/data?1655211663" alt="" />
            <a className={styles.username} href="">Александр Пупко</a>
          </div>
          <span className={styles.createdAt}> 4 часа назад</span>
        </div>
        <h1 className={styles.title}>
          <a className={styles.postLink} href="">Реплицированные с зарубежных источников возможности </a>
        </h1>
      </div>
      <div className={styles.preview}>
        <img className={styles.previewImg} src="https://cdn.dribbble.com/users/8703552/screenshots/18484888/media/93698da76950a51d76b8607223979b31.jpg?compress=1&resize=800x600&vertical=top" alt="" />
      </div>
      <div className={styles.menu}>
        <button className={styles.menuButton}>
          <svg width="5" height="20" viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2.5" r="2.5" fill="#D9D9D9"/>
            <circle cx="2.5" cy="10" r="2.5" fill="#D9D9D9"/>
            <circle cx="2.5" cy="17.5" r="2.5" fill="#D9D9D9"/>
          </svg>
        </button>
      </div>
      <div className={styles.controls}></div>
    </li>
  );
}
