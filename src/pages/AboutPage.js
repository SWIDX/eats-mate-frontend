import React from "react";
import NavBar from '../components/navigation/NavBar';
import styles from './AboutPage.module.css';
import { useMediaQuery } from "react-responsive"
import Burger from '../components/navigation/mobile/Burger';

function AboutPage(){
    const isPc = useMediaQuery({ query: "(min-width:426px)" });
    const isMobile = useMediaQuery({ query: "(max-width:426px)" });

    return(
    <>
        {isPc && <NavBar />}
        {isMobile && <Burger />}
        <div className={styles.scrollContainer}>
        <div className={styles.section}>
        <div className={styles.bgLogo}>
                <img src="/img/logo-character.svg" alt="banner1 mockup" />
            </div>
            <div className={styles.banner1}>
                <h1>잇츠메이트와 함께
                <br />
                혼행 라이프를 즐겨보세요</h1>
                <h6>잇츠 메이트는 누구나 눈치보지 않고 혼자 즐길 수 있는
                <br />
                건강한 문화를 만들어가고 있습니다</h6>
                </div>
                <div className={styles.macMockup}>
                    { <img src="/img/mac_mainpage.png" alt="banner1 mockup" /> }
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.banner2}>
                    <div className={styles.numbers}>01</div>
                    <h2>식당 탐색하기</h2>
                    <h6>실시간 인기 맛집과 생생한 후기들을 만나보세요</h6>
                    <img src="/img/banner2-page.jpg" alt="banner2 page image" />
                    <div className={styles.floating}>
                        <img src="/img/float-icons.png" alt="banner2 float icon" />
                    </div>
                    <div className={styles.banner2icon}>
                        <div className={styles.icon1}>
                            <img src="/img/banner2-01.png" alt="banner2 background icon1" />
                        </div>
                        <div className={styles.icon2}>
                            <img src="/img/banner2-02.png" alt="banner2 background icon2" />
                        </div>
                        <div className={styles.icon3}>
                            <img src="/img/banner2-03.png" alt="banner2 background icon3" />
                        </div>
                    </div>
                </div>
        </div>
            <div className={styles.section}>
                <div className={styles.banner3}>
                    <div className={styles.numbers}>02</div>
                    <h2>나만의 혼행 코스 만들기</h2>
                    <h6>혼밥만 하기 아쉽다면 한국관광공사 데이터 기반으로 혼자 가기 좋은 곳을 추천해드릴게요 <br />
                    가고 싶은 장소들을 골라 직접 코스를 만들고 떠나보세요</h6>
                    <img src="/img/banner3-map.png" alt="banner3 page image" />
                    <div className={styles.icon1}>
                            <img src="/img/banner3-01.png" alt="banner3 background icon1" />
                        </div>
                        <div className={styles.icon2}>
                            <img src="/img/banner3-02.png" alt="banner3 background icon2" />
                        </div>
                    </div>
                </div>
            <div className={styles.section}>
                <div className={styles.banner4}>
                    <div className={styles.numbers}>03</div>
                    <h2>혼행 경험 공유하기</h2>
                    <h6>잇츠 메이트로 장소를 탐색하고 다녀온 혼행 경험을<br />
                        다른 메이트들과 공유하고, 나만의 기록으로 남겨보세요!</h6>
                    <img src="/img/banner4-mypage.png" alt="banner4 page image" />
                    <div className={styles.icon1}>
                            <img src="/img/banner4-01.png" alt="banner2 background icon1" />
                        </div>
                        <div className={styles.icon2}>
                            <img src="/img/banner4-02.png" alt="banner2 background icon2" />
                        </div>
                        <div className={styles.icon3}>
                            <img src="/img/banner4-03.png" alt="banner2 background icon3" />
                        </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default AboutPage;