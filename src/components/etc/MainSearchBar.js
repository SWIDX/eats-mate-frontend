import React from "react";
import styles from "./MainSearchBar.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function MainSearchBar() {

    return (
            <div className={styles.banner_menu}>
            <p>혼밥하기 좋은 식당을 탐색해보세요</p>
                <div className={styles.search_t}>
                    <input id="input1" type="text" placeholder="직접 검색하기" className={styles.searchbar} />
                </div>

                <div className={styles.search_m}>
                    <a href="http://localhost:3000/map-service/main">
                        <div className={styles.map}>
                            <p>지도에서 찾기</p>
                        </div>
                    </a>
                </div>
            </div>
    );
}

export default MainSearchBar;