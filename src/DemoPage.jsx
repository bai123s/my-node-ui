import React, { useState, useEffect, useRef } from "react";
import backgroundImage1 from './assets/images/背景、.png';
import image2 from './assets/images/image2.png';
import titlecloud from './assets/images/titlecloud.png';
import part2Img from './assets/images/PART·2.png';
import part3Img from './assets/images/PART·3.png';

const imgFrame28 = require('./assets/images/cover1.jpeg');
const imgFrame54 = require('./assets/images/cover1.jpeg');
const imgFencha = require('./assets/images/cover1.jpeg');

const imgWord1 = require('./assets/images/cover1.jpeg');
const imgTitles1 = require('./assets/images/cover1.jpeg');
const imgRenxi1 = require('./assets/images/cover1.jpeg');
const imgJimeng202506155261 = require('./assets/images/cover1.jpeg');
const imgEllipse4 = require('./assets/images/cover1.jpeg');
const imgEllipse3 = require('./assets/images/cover1.jpeg');

// 无限循环滚动组件
function InfiniteCarousel({ images, badge, direction = 'left', speed = 40, align = 'left' }) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [groupWidth, setGroupWidth] = useState(0);

  // 渲染20组
  const GROUP_COUNT = 20;
  const allImages = Array(GROUP_COUNT).fill(images).flat();

  useEffect(() => {
    if (containerRef.current) {
      // 只需量一组的宽度
      setGroupWidth(containerRef.current.scrollWidth / GROUP_COUNT);
    }
  }, [images]);

  // 自动滚动动画
  useEffect(() => {
    let raf;
    let lastTimestamp = performance.now();
    function animate(now) {
      const elapsed = now - lastTimestamp;
      lastTimestamp = now;
      setOffset(prev => {
        let next = direction === 'left'
          ? prev - (elapsed * 0.12)
          : prev + (elapsed * 0.12);

        // 区间为 [ -groupWidth * GROUP_COUNT / 2, 0 ]
        const min = -groupWidth * GROUP_COUNT / 2;
        const max = 0;

        if (next < min) next = max;
        if (next > max) next = min;

        return next;
      });
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [groupWidth, direction]);

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        left: 0,
        height: 375,
        margin: '28px 0',
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 44,
          transform: `scale(0.75) translateX(${offset}px)`,
          transformOrigin: align === 'right' ? 'right' : 'left',
          willChange: 'transform',
          transition: 'none',
        }}
      >
        {allImages.map((img, i) => (
          <div key={i} style={{ position: 'relative', width: 281, height: 375 }}>
            <img
              src={img}
              alt={`cover${i}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }}
            />
            <img
              src={badge}
              alt={`jiaobiao${i}`}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: 120,
                height: 121,
                objectFit: 'cover',
                borderRadius: 0,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopBack({ children }) {
  const [showP7, setShowP7] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // 新增：记录是否到达过P9-5
  const [hasReachedP95, setHasReachedP95] = useState(false);
  // 新增：小圆点hover状态
  const [dot1Hover, setDot1Hover] = useState(false);
  const [dot2Hover, setDot2Hover] = useState(false);
  const [dot3Hover, setDot3Hover] = useState(false);
  const [dot4Hover, setDot4Hover] = useState(false);
  const [dot5Hover, setDot5Hover] = useState(false);
  const [dot6Hover, setDot6Hover] = useState(false);
  // 新增：卡片hover状态
  const [hoverCard, setHoverCard] = useState(null); // 'left' | 'right' | null

  // 渐显动效ref和visible
  const [part2Ref, part2Visible] = usePart2FadeInOnScroll();
  const [part3Ref, part3Visible] = usePart3FadeInOnScroll();

  // 1. 这里定义内容数组
  const descList = [
    '数据在版权评估中是绕不开的话题。不管是平台方还是影视公司，都认同好的数据表现对于IP是加分的。',
    '近年来晋江的版权定价区间基本保持在七位数及以上。IP改编的成本居高不下，但爆火的剧又多出自IP，让大平台、大公司都在围积IP，不肯轻易放手，直到再不拍就要过期，才会着手进行改编。',
    '然而，资方囤积的IP数量早已超过其能够在短期内改编完成的数量。根据行业研究与报告，网文IP从版权入手到影视化改编完成的平均周期在3年左右，早期甚至达到7年以上[4]。',
    '因此，版权方的考虑与读者的口碑始终存在"时间差"。带来了读者口碑和版权方最初的考量形成分化、相差甚远。',
    '与此同时，前期在版权上投入的大量成本使得资方难以抛弃沉没成本，无法逆转这种"时间差"：哪怕IP过时了也不能抛售，只能硬着头皮往下推进。这一盈利机制巨大的惯性使得网文市场"脱离读者"的情况不停地往下延伸，加剧文本与读者的分化。',
  ];
  const cardList = [
    [
      <>业内人士称，截至2023年，行业有两种方式去做第一阶段的IP评估。</>,
      <>其一是考量原著在<span style={{color:'#FFC3FF'}}>站内平台</span>的<span style={{color:'#FFC3FF'}}>多维度数据</span>；</>,
      <>其二是去参考过往的成功经验，"如果某知名作者此前有过<span style={{color:'#FFC3FF'}}>成功的影视化作品</span>，那他其他作品天然在评估中更具优势。"[2]</>,
    ],
    [
      { type: 'image', src: require('./assets/images/card2.png') }
    ],
    [
      { type: 'image', src: require('./assets/images/card3.png') }
    ],
    [
      { type: 'image', src: require('./assets/images/card4.png') }
    ],
    [
      { type: 'image', src: require('./assets/images/card5.png') }
    ],
  ];
  const logicImgList = [
    require('./assets/images/logic1.png'),
    require('./assets/images/logic2.png'),
    require('./assets/images/logic3.png'),
    require('./assets/images/logic4.png'),
    require('./assets/images/logic5.png'),
  ];

  // 2. 其余渲染逻辑和切换函数都可以放在组件内部
  const P9_HEIGHT = 940;
  const IMG_BOTTOM = 60;
  const logicBottomY = P9_HEIGHT - IMG_BOTTOM;
  // 支持不同卡片高度
  const CARD_HEIGHTS = [390, 460, 460, 460, 450];
  const CARD_HEIGHT = CARD_HEIGHTS[currentIndex] || 390;
  const CARD_CENTER_OFFSET = 365; // 可调整
  const cardCenterY = logicBottomY - CARD_CENTER_OFFSET;
  const cardTop = cardCenterY - CARD_HEIGHT / 2;
  const DESC_HEIGHT = 68;
  const DESC_BOTTOM_OFFSETS = [625, 625, 625, 625, 650];
  const DESC_BOTTOM_OFFSET = DESC_BOTTOM_OFFSETS[currentIndex] || 625;
  const descBottom = logicBottomY - DESC_BOTTOM_OFFSET;
  const descTop = descBottom - DESC_HEIGHT;
  const handlePrev = () => setCurrentIndex(i => (i - 1 + descList.length) % descList.length);
  const handleNext = () => setCurrentIndex(i => (i + 1) % descList.length);

  useEffect(() => {
    if (currentIndex === 4 && !hasReachedP95) {
      setHasReachedP95(true);
    }
  }, [currentIndex, hasReachedP95]);

  // 在DesktopBack组件内部：
  function useFadeInOnScroll() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      function onScroll() {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setVisible(true);
        }
      }
      window.addEventListener('scroll', onScroll);
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return [ref, visible];
  }

  // part2渐显逻辑
  function usePart2FadeInOnScroll() {
    const ref = React.useRef(null);
    const [visible, setVisible] = React.useState(false);
    React.useEffect(() => {
      function onScroll() {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const winTwoThird = window.innerHeight * 2 / 3;
        if (mid < winTwoThird + 40) { // 允许有点提前
          setVisible(true);
        }
      }
      window.addEventListener('scroll', onScroll);
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return [ref, visible];
  }

  // part3渐显逻辑
  function usePart3FadeInOnScroll() {
    const ref = React.useRef(null);
    const [visible, setVisible] = React.useState(false);
    React.useEffect(() => {
      function onScroll() {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const winTwoThird = window.innerHeight * 2 / 3;
        if (mid < winTwoThird + 40) {
          setVisible(true);
        }
      }
      window.addEventListener('scroll', onScroll);
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return [ref, visible];
  }

  // 在组件内部
  const frame21Ref = useRef(null);
  const [frame21Visible, setFrame21Visible] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!frame21Ref.current) return;
      const rect = frame21Ref.current.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const winThreeQuarter = window.innerHeight * 3 / 4;
      if (mid < winThreeQuarter) {
        setFrame21Visible(true);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll(); // 首次渲染时也判断一次
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const yanxiCardRef = useRef(null);
  const [yanxiCardVisible, setYanxiCardVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!yanxiCardRef.current) return;
      const rect = yanxiCardRef.current.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const winThreeQuarter = window.innerHeight * 3 / 4;
      if (mid < winThreeQuarter) {
        setYanxiCardVisible(true);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cardGroupRef = useRef(null);
  const [cardGroupVisible, setCardGroupVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!cardGroupRef.current) return;
      const rect = cardGroupRef.current.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const winThreeQuarter = window.innerHeight * 3 / 4;
      if (mid < winThreeQuarter) {
        setCardGroupVisible(true);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jiujieCardRef = useRef(null);
  const [jiujieCardVisible, setJiujieCardVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!jiujieCardRef.current) return;
      const rect = jiujieCardRef.current.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const winThreeQuarter = window.innerHeight * 3 / 4;
      if (mid < winThreeQuarter) {
        setJiujieCardVisible(true);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const renxiCardRef = useRef(null);
  const [renxiCardVisible, setRenxiCardVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!renxiCardRef.current) return;
      const rect = renxiCardRef.current.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const winQuarter = window.innerHeight * 3 / 4; // 视口下四分之一
      if (mid < winQuarter) {
        setRenxiCardVisible(true);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll(); // 首次渲染时也判断一次
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* 背景层：图片中心锚点，上下位置不动，左右卡边且放大 */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
          backgroundImage: `url(${backgroundImage1})`,
          backgroundSize: "100vw auto", // 宽度100vw，高度自适应
          backgroundPosition: "center center", // 图片中心锚点
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000",
          pointerEvents: "none",
        }}
      />
      
      {/* 统一的滚动内容容器 */}
      <div style={{
        position: 'relative',
          zIndex: 1,
        width: '100%',
        // overflowY: 'auto',  // 删除或注释掉
        // height: '100vh'     // 删除或注释掉
      }}>
        {/* 篇章一：主内容，带黑色背景 */}
        <div style={{ background: 'black' }}>
          {/* 顶部的所有内容都移到这里 */}
        {/* 背景图 image2 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 'calc(45.5px - 11.25cm)', // 向上移动8cm（原3cm+5cm）
            width: '100%',
            height: 'auto',
            zIndex: 0,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden', // 裁剪超出部分
          }}
        >
          <img
            src={image2}
            alt="image2"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: 'blur(2px)',
              opacity: 1,
              pointerEvents: 'none',
            }}
          />
        </div>
        {/* 顶部渐变条和标题 */}
        <div style={{
          width: '100%',
          height: '79px',
          background: 'linear-gradient(180deg, #ffffff 0%, #ffe1ff 29.808%, #ffc4ff 82.692%)',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '8px',
            width: '500px',
            height: '63px',
            transform: 'translateX(-50%)',
            color: '#110822',
            fontFamily: 'STZhongsong, serif',
            fontSize: '45px',
            letterSpacing: '29.7px',
            textAlign: 'center'
          }}>
            女生小说网
          </div>
        </div>

        {/* 第一组封面（左对齐） */}
        <div style={{ marginTop: '-0.7cm' }}>
          <InfiniteCarousel
            images={[
              require('./assets/images/cover5.png'),
              require('./assets/images/cover4.png'),
              require('./assets/images/cover2.png'),
              require('./assets/images/cover3.jpeg'),
              require('./assets/images/cover1.jpeg'),
            ]}
            badge={require('./assets/images/jiaobiao2.png')}
            direction="left"
            align="left"
          />
        </div>

        {/* 第二组封面（右对齐） */}
        <div style={{ marginTop: '-70px' }}>
          <InfiniteCarousel
            images={[
              require('./assets/images/cover10.png'),
              require('./assets/images/cover9.png'),
              require('./assets/images/cover8.png'),
              require('./assets/images/cover7.png'),
              require('./assets/images/cover6.png'),
            ]}
            badge={require('./assets/images/jiaobiao2.png')}
            direction="right"
            align="right"
          />
        </div>

        {/* Figma node-id=2064-70 还原内容开始 */}
          <div style={{ position: 'relative', width: '1440px', color: '#fff', fontFamily: 'PingFang SC, Microsoft YaHei, STZhongsong, serif', fontSize: 24, marginLeft: 'auto', marginRight: 'auto' }}>
          {/* 顶部主标题描述 */}
            <div style={{ width: '1125px', height: '34px', marginTop: '90px', marginLeft: '164px' }}>
            今年21岁，有着11年"女频文学"阅读爱好的严茜发现：自己越来越""。
          </div>

            {/* Figma frame21 还原内容开始 */}
          <div
            ref={frame21Ref}
            style={{
              width: '1110px',
              minHeight: '400px',
              margin: '60px auto 0 auto',
              background: 'linear-gradient(180deg, #ffc4ff 2.381%, #fff 111.15%)',
              borderRadius: 0,
              boxSizing: 'border-box',
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: frame21Visible ? 1 : 0,
              transition: 'opacity 1.0s',
            }}
          >
            <div style={{
              position: 'relative',
              width: '1110px',
              minHeight: '400px',
            }}>
              {/* 说明文字 */}
              <div style={{
                position: 'absolute', left: 67, top: 38, color: '#2F106A', fontFamily: 'HYXinRenWenSongW, serif', fontSize: 24, width: 965, fontWeight:500
              }}>
                女频小说是以女性读者为核心受众的网络文学类型，通常以女性视角刻画情感与成长历程。
              </div>
              {/* 四个分组图片 */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '28px',
                position: 'absolute',
                left: 91,
                top: 98
              }}>
                {[
                  require('./assets/images/image13.png'),
                  require('./assets/images/image15.png'),
                  require('./assets/images/image14.png'),
                  require('./assets/images/image12.png')
                ].map((img, idx) => (
                  <div key={idx} style={{
                    width: 175,
                    height: 243,
                    background: '#eee',
                    borderRadius: 0,
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {/* 粉色渐变fill */}
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none',
                      background: 'linear-gradient(0deg, #fd83be 0%, #ffdbff 12.5%, #ffffff00 54.3%)',
                      opacity: 0.7,
                    }} />
                  </div>
                ))}
              </div>
              {/* 标签 */}
              <div style={{
                position: 'absolute', left: 67, top: 320, color: '#2f106a', fontFamily: 'HYXinRenWenSongW, serif', fontSize: 30, textShadow: '3px -1px 3.1px rgba(255,255,255,0.57)'
              }}>现代都市言情</div>
              <div style={{
                position: 'absolute', left: 282, top: 320, color: '#2f106a', fontFamily: 'HYXinRenWenSongW, serif', fontSize: 30, textShadow: '3px -1px 3.1px rgba(255,255,255,0.57)'
              }}>古代言情</div>
              <div style={{
                position: 'absolute', left: 477, top: 320, color: '#2f106a', fontFamily: 'HYXinRenWenSongW, serif', fontSize: 30, textShadow: '3px -1px 3.1px rgba(255,255,255,0.57)'
              }}>玄幻仙侠</div>
              <div style={{
                position: 'absolute', left: 682, top: 320, color: '#2f106a', fontFamily: 'HYXinRenWenSongW, serif', fontSize: 30, textShadow: '3px -1px 3.1px rgba(255,255,255,0.57)'
              }}>青春校园</div>
              {/* 省略号 */}
              <div style={{
                position: 'absolute', left: 905, top: 125, color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 96, letterSpacing: '9.6px'
              }}>...</div>
            </div>
          </div>
          {/* Figma frame21 还原内容结束 */}

          {/* 第二段描述 */}
            <div style={{ width: '1100px', height: '68px', margin: '60px 0 0 160px', lineHeight: 1.5, textAlign: 'justify' }}>
              可以说，女频网文就是为了满足女性读者的阅读偏好存在的。"无书可读"的感受与严茜最初阅读"女频文学"时的感受大相径庭。
          </div>
            
          {/* 第三段描述 */}
            <div style={{ width: '1110px', height: '68px', margin: '50px 0 0 158px', lineHeight: 1.5 }}>
              严茜还记得，阅读网文曾带给她很大的影响，尤其是其中女性形象的塑造。幼年时期，女频网文曾经塑造过她面对生活的许多观念。
          </div>

            {/* 头像与信息卡片区域 */}
            <div
              ref={yanxiCardRef}
              style={{
                position: 'relative',
                width: '100%',
                height: '291px',
                margin: '60px 0 0 0',
                opacity: yanxiCardVisible ? 1 : 0,
                transition: 'opacity 1.0s',
              }}
            >
          {/* 背景渐变卡片1（右侧，说明文字） */}
          <div style={{
            position: 'absolute',
            left: 748,
                top: 34,
            width: 457,
            height: 217,
            zIndex: 1,
            borderRadius: 10,
            boxShadow: '-7px -7px 4px 0px #fff',
            background: 'linear-gradient(180deg, #ffc3ff 0%, #ffdbff 66.346%, #fff 100%)',
            transform: 'rotate(180deg)'
          }} />
          {/* 说明文字 */}
          <div style={{
            position: 'absolute',
            left: 824,
                top: 82,
            width: 352,
            height: 144,
            color: '#2f106a',
            fontFamily: 'HYXinRenWenSongW, serif',
            fontSize: 20,
            textAlign: 'left',
            zIndex: 2,
            background: 'none',
            lineHeight: 'normal',
            fontStyle: 'normal',
            fontWeight: 500,
            letterSpacing: 0
          }}>
            最早看网文的时候，经常看到女主角被私设的配角陷害的那种套路，那时候我就特别追求那种纯粹、忠心的友情与爱情。可以说到现在，我的友情观和爱情观都很理想，甚至有点"精神洁癖"。
          </div>
          {/* 背景渐变卡片2（左侧，信息卡片） */}
          <div style={{
            position: 'absolute',
            left: 249,
                top: 130,
            width: 368,
            height: 163,
            zIndex: 1,
            borderRadius: 10,
            boxShadow: '-5px -7px 4px 0px #fff',
            background: 'linear-gradient(180deg, #ffc3ff 0%, #ffdbff 66.346%, #fff 100%)',
            transform: 'rotate(180deg)'
          }} />
          {/* 信息卡片文字 */}
          <div style={{
            position: 'absolute',
            left: 283.65,
                top: 148,
            width: 319.86,
            height: 125,
            color: '#110822',
            fontFamily: 'HYXinRenWenSongW, serif',
            fontSize: 24,
            textAlign: 'left',
            zIndex: 2,
            background: 'none',
            lineHeight: 1.8,
            fontStyle: 'normal',
            fontWeight: 500,
            letterSpacing: 0
          }}>
            <div>读者姓名：严茜</div>
            <div>年龄：21岁</div>
            <div>接触女频网文时长：11年</div>
          </div>
          {/* 头像图片 */}
          <div style={{
            position: 'absolute',
            left: 548,
                top: 10,
            width: 255.134,
            height: 291,
            background: `url(${require('./assets/images/yanxi.png')}) center/cover no-repeat`,
            borderRadius: 0,
            zIndex: 3
          }} />
            </div>

            {/* 第四段描述 */}
            <div style={{ width: '1108px', height: '68px', margin: '60px 0 0 178px', lineHeight: 1.5 }}>
              <div>大约13岁时，严茜的阅读频率开始下降。</div>
              <div>作为读者，严茜发现，她不再能够共情其中的女性角色。她的品味与网文开始逐渐背离，产生矛盾。</div>
            </div>
            
            {/* 第五段描述 */}
            <div style={{ width: '1083px', height: '113px', margin: '50px 0 0 178px', lineHeight: 1.5,textAlign: 'justify' }}>
              每一类女性角色都是脸谱化的。"都是一个套路，同质化太严重了。"严茜这样形容自己当时的阅读感受。翻开一本古言穿越类小说，她闭着眼睛都能猜到情节的发展：有一个跟女主雌竞的恶毒女配，所有人都要去跟她争男主的爱或者其他资源。
            </div>
        </div>
        {/* Figma node-id=2064-70 还原内容结束 */}

        {/* frame34 还原内容开始 */}
          <div style={{ position: 'relative', width: '1442px', background: 'none', margin: '30px auto 0 auto' }}>
          {/* P4 区块 */}
            <div style={{ position: 'relative', width: '1442px', height: '810px', overflow: 'hidden' }}>
            {/* 女主插画 */}
            <div style={{
              position: 'absolute',
              left: '50%',
                top: 80,
              width: 384.188,
              height: 683,
                transform: 'translateX(-50%) scale(0.85)',
              background: `url(${require('./assets/images/women.jpeg')}) center/cover no-repeat`,
              boxShadow: '4px 4px 4px 0px #fff',
            }}>
              {/* 新增图注文本框 */}
              <div style={{
                position: 'absolute',
                left: '500px', // 右侧偏移
                top: '585px',
                width: '335px',
                color: '#fff',
                fontSize: '15px',
                fontFamily: 'Microsoft YaHei, sans-serif',
                lineHeight: 1.8,
                textAlign: 'justify',
                zIndex: 10,
              }}>
                *数据来源：对晋江文学网总分榜前两百名小说中随机抽取40部，提取小说文本中对女性不同部位的描写语句，进行词频统计并进行词云图呈现，截止时间为2025年6月16日
              </div>
              {/* 六个粉色小圆点 */}
              {/* 1. 眼睛 */}
              <div
                style={{ position: 'absolute', left: 115, top: 50, width: 35, height: 35, background: 'transparent', borderRadius: '50%', cursor: 'pointer', zIndex: 2, pointerEvents: 'auto' }}
                onMouseEnter={() => setDot1Hover(true)}
                onMouseLeave={() => setDot1Hover(false)}
              >
                <div style={{ width: 14, height: 14, background: '#FD83BE', borderRadius: '50%', position: 'absolute', left: 10.5, top: 10.5 }} />
              </div>
              {/* 2. 嘴 */}
              <div
                style={{ position: 'absolute', left: 125, top: 120, width: 35, height: 35, background: 'transparent', borderRadius: '50%', cursor: 'pointer', zIndex: 2, pointerEvents: 'auto' }}
                onMouseEnter={() => setDot2Hover(true)}
                onMouseLeave={() => setDot2Hover(false)}
              >
                <div style={{ width: 14, height: 14, background: '#FD83BE', borderRadius: '50%', position: 'absolute', left: 10.5, top: 10.5 }} />
              </div>
              {/* 3. 脸 */}
              <div
                style={{ position: 'absolute', left: 260, top: 83, width: 35, height: 35, background: 'transparent', borderRadius: '50%', cursor: 'pointer', zIndex: 2, pointerEvents: 'auto' }}
                onMouseEnter={() => setDot3Hover(true)}
                onMouseLeave={() => setDot3Hover(false)}
              >
                <div style={{ width: 14, height: 14, background: '#FD83BE', borderRadius: '50%', position: 'absolute', left: 10.5, top: 10.5 }} />
              </div>
              {/* 4. 手 */}
              <div
                style={{ position: 'absolute', left: 260, top: 275, width: 35, height: 35, background: 'transparent', borderRadius: '50%', cursor: 'pointer', zIndex: 2, pointerEvents: 'auto' }}
                onMouseEnter={() => setDot4Hover(true)}
                onMouseLeave={() => setDot4Hover(false)}
              >
                <div style={{ width: 14, height: 14, background: '#FD83BE', borderRadius: '50%', position: 'absolute', left: 10.5, top: 10.5 }} />
              </div>
              {/* 5. 身材 */}
              <div
                style={{ position: 'absolute', left: 65, top: 310, width: 35, height: 35, background: 'transparent', borderRadius: '50%', cursor: 'pointer', zIndex: 2, pointerEvents: 'auto' }}
                onMouseEnter={() => setDot5Hover(true)}
                onMouseLeave={() => setDot5Hover(false)}
              >
                <div style={{ width: 14, height: 14, background: '#FD83BE', borderRadius: '50%', position: 'absolute', left: 10.5, top: 10.5 }} />
              </div>
              {/* 6. 腿 */}
              <div
                style={{ position: 'absolute', left: 250, top: 490, width: 35, height: 35, background: 'transparent', borderRadius: '50%', cursor: 'pointer', zIndex: 2, pointerEvents: 'auto' }}
                onMouseEnter={() => setDot6Hover(true)}
                onMouseLeave={() => setDot6Hover(false)}
              >
                <div style={{ width: 14, height: 14, background: '#FD83BE', borderRadius: '50%', position: 'absolute', left: 10.5, top: 10.5 }} />
              </div>
              {/* 指示线和文字 */}
              {dot1Hover && (
                <>
                  {/* SVG指示线 */}
                  <svg
                    style={{ position: 'absolute', left: -100, top: 0, pointerEvents: 'none', zIndex: 3 }}
                    width={250} height={100}
                  >
                    {/* 线段：从圆点左侧25px处(105,67)到(30,40)再到(-100,40) */}
                    <polyline
                      points="205,67 130,40 0,40"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* 文字 */}
                  <div style={{
                    position: 'absolute',
                    left: -160,
                    top: 20,
                    color: '#fff',
                    fontSize: 25,
                    fontFamily: 'Microsoft YaHei, sans-serif',
                    zIndex: 4,
                    width: 60,
                    textAlign: 'left',
                    userSelect: 'none',
                    opacity: dot1Hover ? 1 : 0,
                    transition: 'opacity 0.4s',
                  }}>
                    眼睛
                  </div>
                  {/* 眼睛图片 */}
                  <img
                    src={require('./assets/images/1-yanjing.png')}
                    alt="眼睛图"
                    style={{
                      position: 'absolute',
                      left: -500,
                      top: 140,
                      zIndex: 4,
                      transform: 'scale(1.3)',
                      opacity: dot1Hover ? 1 : 0,
                      transition: 'opacity 0.4s',
                    }}
                  />
                </>
              )}
              {dot2Hover && (
                <>
                  {/* SVG指示线 */}
                  <svg
                    style={{ position: 'absolute', left: -100, top: 70, pointerEvents: 'none', zIndex: 3 }}
                    width={250} height={100}
                  >
                    {/* 线段：从圆点左侧25px处(105,67)到(30,40)再到(-100,40) */}
                    <polyline
                      points="205,67 130,67 0,67"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* 文字 */}
                  <div style={{
                    position: 'absolute',
                    left: -160,
                    top: 119,
                    color: '#fff',
                    fontSize: 25,
                    fontFamily: 'Microsoft YaHei, sans-serif',
                    zIndex: 4,
                    width: 60,
                    textAlign: 'left',
                    userSelect: 'none',
                    opacity: dot2Hover ? 1 : 0,
                    transition: 'opacity 0.4s',
                  }}>
                    嘴
                  </div>
                  {/* 嘴图片 */}
                  <img
                    src={require('./assets/images/1-zui.png')}
                    alt="嘴图"
                    style={{
                      position: 'absolute',
                      left: -500,
                      top: 240,
                      zIndex: 4,
                      transform: 'scale(1.3)',
                      opacity: dot2Hover ? 1 : 0,
                      transition: 'opacity 0.4s',
                    }}
                  />
                </>
              )}
              {dot3Hover && (
                <>
                  {/* SVG指示线（右侧） */}
                  <svg
                    style={{ position: 'absolute', left: 284, top: 0, pointerEvents: 'none', zIndex: 3 }}
                    width={250} height={100}
                  >
                    {/* 线段：从圆点右侧25px处(0,7)到(120,40)再到(250,40) */}
                    <polyline
                      points="25,97 120,40 220,40"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* 文字 */}
                  <div style={{
                    position: 'absolute',
                    left: 530,
                    top: 20,
                    color: '#fff',
                    fontSize: 25,
                    fontFamily: 'Microsoft YaHei, sans-serif',
                    zIndex: 4,
                    width: 60,
                    textAlign: 'left',
                    userSelect: 'none',
                    opacity: dot3Hover ? 1 : 0,
                    transition: 'opacity 0.4s',
                  }}>
                    脸
                  </div>
                  {/* 脸图片 */}
                  <img
                    src={require('./assets/images/1-lian.png')}
                    alt="脸图"
                    style={{
                      position: 'absolute',
                      left: 550,
                      top: 130,
                      zIndex: 4,
                      transform: 'scale(1.3)',
                      opacity: dot3Hover ? 1 : 0,
                      transition: 'opacity 0.4s',
                    }}
                  />
                </>
              )}
              {dot4Hover && (
                <>
                  {/* SVG指示线（右侧） */}
                  <svg
                    style={{ position: 'absolute', left: 294, top: 190, pointerEvents: 'none', zIndex: 3 }}
                    width={250} height={100}
                  >
                    {/* 线段：从圆点右侧25px处(0,7)到(120,40)再到(250,40) */}
                    <polyline
                      points="2,110 120,10 200,10"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* 文字 */}
                  <div style={{
                    position: 'absolute',
                    left: 510,
                    top: 180,
                    color: '#fff',
                    fontSize: 25,
                    fontFamily: 'Microsoft YaHei, sans-serif',
                    zIndex: 4,
                    width: 60,
                    textAlign: 'left',
                    userSelect: 'none',
                    opacity: dot4Hover ? 1 : 0,
                    transition: 'opacity 0.4s',
                  }}>
                    手
                  </div>
                  {/* 手图片 */}
                  <img
                    src={require('./assets/images/1-shou.png')}
                    alt="手图"
                    style={{
                      position: 'absolute',
                      left: 510,
                      top: 260,
                      zIndex: 4,
                      transform: 'scale(1.2)',
                      opacity: dot4Hover ? 1 : 0,
                      transition: 'opacity 0.4s',
                    }}
                  />
                </>
              )}
              {dot5Hover && (
                <>
                  {/* SVG指示线（左侧） */}
                  <svg
                    style={{ position: 'absolute', left: -100, top: 260, pointerEvents: 'none', zIndex: 3 }}
                    width={250} height={100}
                  >
                    {/* 线段：从圆点左侧25px处(205,67)到(130,40)再到(0,40) */}
                    <polyline
                      points="150,67 90,20 0,20"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* 文字 */}
                  <div style={{
                    position: 'absolute',
                    left: -160,
                    top: 260,
                    color: '#fff',
                    fontSize: 25,
                    fontFamily: 'Microsoft YaHei, sans-serif',
                    zIndex: 4,
                    width: 60,
                    textAlign: 'left',
                    userSelect: 'none',
                    opacity: dot5Hover ? 1 : 0,
                    transition: 'opacity 0.4s',
                  }}>
                    身材
                  </div>
                  {/* 身材图片 */}
                  <img
                    src={require('./assets/images/1-shencai.png')}
                    alt="身材图"
                    style={{
                      position: 'absolute',
                      left: -500,
                      top: 360,
                      zIndex: 4,
                      transform: 'scale(1.25)',
                      opacity: dot5Hover ? 1 : 0,
                      transition: 'opacity 0.4s',
                    }}
                  />
                </>
              )}
              {dot6Hover && (
                <>
                  {/* SVG指示线（右侧） */}
                  <svg
                    style={{ position: 'absolute', left: 274, top: 420, pointerEvents: 'none', zIndex: 3 }}
                    width={250} height={100}
                  >
                    {/* 线段：从圆点右侧25px处(0,7)到(120,40)再到(250,40) */}
                    <polyline
                      points="25,85 120,85 220,85"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* 文字 */}
                  <div style={{
                    position: 'absolute',
                    left: 510,
                    top: 485,
                    color: '#fff',
                    fontSize: 25,
                    fontFamily: 'Microsoft YaHei, sans-serif',
                    zIndex: 4,
                    width: 60,
                    textAlign: 'left',
                    userSelect: 'none',
                    opacity: dot6Hover ? 1 : 0,
                    transition: 'opacity 0.4s',
                  }}>
                    腿
                  </div>
                  {/* 腿图片 */}
                  <img
                    src={require('./assets/images/1-tui.png')}
                    alt="腿图"
                    style={{
                      position: 'absolute',
                      left: 530,
                      top: 125,
                      zIndex: 4,
                      transform: 'scale(1.3)',
                      opacity: dot6Hover ? 1 : 0,
                      transition: 'opacity 0.4s',
                    }}
                  />
                </>
              )}
            </div>
            {/* 提示文字 */}
            <div style={{
              position: 'absolute',
              left: 'calc(50% - 245px)',
              top: 70,
              color: '#fff',
              fontFamily: 'Microsoft YaHei, sans-serif',
              fontSize: 24,
              whiteSpace: 'nowrap'
            }}>
              *鼠标探索下方圆点，查看小说如何描写女主角
            </div>
          </div>
          {/* P5 区块 */}
            <div style={{ position: 'relative', width: '1442px', height: '528px', overflow: 'hidden', marginTop: 80 }}>
            {/* 时间线装饰线 */}
            <div style={{
              position: 'absolute',
              left: 162.839,
                top: 38,
              width: 1049.02,
              height: 367.006
            }}>
              {/* 装饰线图片 */}
              <img src={require('./assets/images/上升线.png')} alt="timeline" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              {/* 图注 */}
              <div style={{ width: '100%', textAlign: 'center', fontSize: 15, color: '#fff', marginTop: 40, fontFamily: 'Microsoft YaHei, sans-serif' }}>
                *数据来源：2015年与2017年阅文集团负责人公开采访
              </div>
            </div>
    
            <div style={{
              position: 'absolute',
              left: 178,
                top: 0,
              width: 1083,
              color: '#fff',
              fontFamily: 'PingFang SC, sans-serif',
              fontSize: 24,
              textAlign: 'justify'
            }}>
              <div style={{ height: 68, marginBottom: 34 }}>
                严茜形容自己的这种转变是"一个很自然的过程"。她说："看多了觉得很无聊，作者的文笔没有让我感受到主角之间很细腻的情感，角色也全是一样的。"她因此丧失了兴趣。
              </div>
              <div style={{ height: 136 }}>
                严茜阅读习惯发生的变化反映了她人生阶段的更替，也暗合了整个网文市场市场化阶段的迭代。2017年，13岁的严茜逐渐接触到真实世界复杂的面相，厌倦了脸谱化的创作。同年，阅文集团以超过930亿港元的市值在香港联交所主板成功上市 [1]。中国网络文学平台进入商业化深化阶段，女频网文的内容似乎也由此开始向"脸谱化"趋势靠拢。
              </div>
            </div>
          </div>
        </div>
        {/* frame34 还原内容结束 */}
        </div>

        {/* 篇章二：透明背景的过渡 */}
        <div style={{ 
          width: '100%', 
          height: '100vh', // 确保撑满一个屏幕高度
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'transparent'
        }}>
          {/* Desktop8 区域内容 */}
          <div
            ref={part2Ref}
            className="relative w-full flex justify-center items-center"
            style={{ height: "1023px", opacity: part2Visible ? 1 : 0, transition: 'opacity 1.2s' }}
          >
            {/* PART·2 和 看不见的手 组合体 */}
            <div
              className="relative w-[1109px] h-[549px]"
              style={{ margin: "0 auto" }}
            >



              
              {/* "PART·2" 左下角 */}
              <div
                style={{ opacity: 1, position: 'relative', width: '100%', height: '100%' }}
              >
                <div
                  className="absolute left-0 bottom-0 w-[877px] h-[316px]"
                  style={{ transform: 'translate(-120px, -70px)', zIndex: 2 }}
           
                >
                  <img
                    src={part2Img}
                    alt="PART·2"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
                {/* "看不见的手" 右上角 */}
                <div
                  className="absolute right-0 top-0 w-[1109px] h-[549px] text-[#f9feea] text-right"
                  style={{
                    fontFamily: "Microsoft YaHei UI, sans-serif",
                    fontSize: "200px",
                    fontWeight: 700,
                    letterSpacing: "18px",
                    lineHeight: "274px",
                  }}
                >
                  <p style={{ textAlign: "right", margin: 0 }}>看不见</p>
                  <p style={{ textAlign: "right", margin: 0 }}>的手</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 篇章三：P1，带自己的黑色背景 */}
        <div style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#000',
          color: '#fff'
        }}>
          <div
            data-name="P1"
            id="node-2123_103"
            className="relative"
            style={{ width: '1440px', height: '930px', overflow: 'clip' }}
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1090px]"
              id="node-2123_104"
            >
              <div className="box-border content-stretch flex flex-col gap-[60px] items-center justify-start p-0 relative w-[1090px]">
                <div className="relative shrink-0 w-full" id="node-2123_105">
                  <div className="box-border content-stretch flex flex-col font-['PingFang_SC:Medium',_sans-serif] gap-[50px] items-start justify-start leading-[0] not-italic p-0 relative text-[#ffffff] text-[24px] text-left w-full">
                    <div
                      className="h-[102px] relative shrink-0 w-full"
                      id="node-2123_106"
                    >
                      <p className="block leading-[normal]" style={{textAlign: 'justify'}}>
                        2017年开始，网文市场发生了转变。"内容"不再直接决定女频网文是否盈利，IP价值成为评价其商业价值的指标。从这时开始，平台的价值取向与作者、读者逐渐背离。而"内容"与"盈利"分离，正是女性形象"板结"的开始。
                      </p>
                    </div>
                    <div
                      className="h-[68px] relative shrink-0 w-full"
                      id="node-2123_107"
                    >
                      <p className="block leading-[normal]" style={{textAlign: 'justify'}}>
                        女频网文作为一种内容产品，它究竟应该以盈利为第一目的还是应该最大程度兼顾人文价值影响？平台与作者、读者有着不同的答案。
                      </p>
                      <div style={{
                        color: '#fff',
                        fontSize: '15px',
                        fontFamily: 'Microsoft YaHei, sans-serif',
                        lineHeight: 1.8,
                        textAlign: 'justify',
                        marginLeft: '250px',
                        marginTop: '515px',
                      }}>
                        *数据源于对晋江文学网、起点女生网、潇湘书院网等女频小说网站付费价格，综合采访数据统计计算，时间到2025年5月21日
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  ref={cardGroupRef}
                  className="flex flex-row gap-[60px] items-start justify-start relative shrink-0"
                  id="node-2123_108"
                  style={{
                    opacity: cardGroupVisible ? 1 : 0,
                    transition: 'opacity 1.0s',
                  }}
                > 
                  <div
                    className="bg-gradient-to-b from-[#2f106a] h-[373.856px] not-italic overflow-clip relative rounded-[20px] text-[#ffffff] text-left to-[#9d69ff] to-[87.981%] w-[474.728px] mt-[31px]"
                    id="node-2123_112"
                  >
                    <div
                      className="[text-shadow:rgba(0,0,0,0.25)_0px_3px_4px] absolute font-['HYXinRenWenSongW:Regular',_sans-serif] h-[216px] text-[24px] top-[34px] w-[391px]"
                      id="node-2123_113"
                      style={{ left: "calc(50% - 195.364px)" }}
                    >
                      <p className="leading-[normal]" style={{ fontFamily: 'HYXinRenWenSongW, serif', textAlign: 'justify' }}>
                        <span>
                          原本的网文依靠内容盈利。一本书连载几百万字，全年基本没有写作空窗期，每一章都收费，甚至可能会让读者付费投票情节的走向。在这种盈利模式下，读者对剧情有着直接的决定权。时至今日，
                        </span>
                        <span className="text-[#ffb5ff]">男频网文</span>
                        <span>仍然延续了这一盈利模式。</span>
                      </p>
                    </div>
                    <div
                      className="absolute font-['PingFang_SC:Heavy',_sans-serif] left-[42.572px] text-[48px] text-nowrap top-[271.45px]"
                      id="node-2123_114"
                    >
                      <p className="block leading-[normal] whitespace-pre" style={{fontWeight: 500}}>
                        内容盈利
                      </p>
                    </div>
                  </div>
                  <div
                    className="bg-gradient-to-b from-[#ffd7ff] h-[436.003px] not-italic overflow-clip relative rounded-[20px] text-left to-[#ff9fcd] to-[85.096%] w-[557.027px]"
                    id="node-2123_109"
                  >
                    <div
                      className="absolute font-['PingFang_SC:Heavy',_sans-serif] h-[67px] left-[327px] text-[#ffffff] text-[55px] top-[299px] w-[166px]"
                      id="node-2123_110"
                    >
                      <p className="block leading-[normal]" style={{fontWeight: 500}}>IP盈利</p>
                    </div>
                    <div
                      className="absolute font-['HYXinRenWenSongW:Regular',_sans-serif] h-52 text-[#2f106a] text-[0px] top-[67px] w-[425px]"
                      id="node-2123_111"
                      style={{ left: "calc(50% - 212.486px)" }}
                    >
                      <p className="leading-[normal] text-[26px]" style={{ fontFamily: 'HYXinRenWenSongW, serif', textAlign: 'justify',fontWeight: 500 }}>
                        <span>
                          2017年，女频网文的盈利模式开始转向IP盈利。这一模式的主要资金来源是售出小说版权，读者的订阅费只占收入的很小一部分。女频长篇订阅费普遍千字
                        </span>
                        <span className="text-[#2f106a]">0.05元钱</span>
                        <span>，短篇基本是买断制</span>
                        <span className="text-[#2f106a]">千字5元到20元</span>
                        <span>不等。</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* P2 */}
        {/* === P2 区块（Figma node-id=2261-408 还原） === */}
        <div style={{ width: '100%', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 811 }}>
          <div style={{ width: 1090, display: 'flex', flexDirection: 'column', gap: 60, alignItems: 'flex-start', justifyContent: 'flex-start', padding: '60px 0 57px 0' }}>
            {/* 顶部文案 */}
            <div style={{ color: '#fff', fontFamily: 'PingFang SC, sans-serif', fontSize: 24, textAlign: 'justify', width: 1097 }}>
              与IP盈利相比，内容盈利可以忽略不计。2020年，付费订阅收入在网络文学市场收入中的占比首次降低到50%以下。顶级爆款（如墨香铜臭《天官赐福》）的影视版权能卖到数千万元、上亿元级别。普通作品的影视或游戏版权也在几十万至数百万元之间 [2]。
            </div>
            {/* 中部图表区 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'max-content max-content', gridTemplateRows: 'max-content', gap: 0, width: '100%' }}>
              {/* 饼图区 */}
              <div style={{ position: 'relative', width: 303, height: 303, marginLeft: 18, marginTop: 79, left: 60 }}>
                {/* 饼状图SVG：紫色填充，白色边，40%占比 */}
                <svg width="233" height="233" viewBox="0 0 233 233" style={{ position: 'absolute', left: 0, top: 0 }}>
                  {/* 紫色扇形 */}
                  <path
                    d="
                      M 116.5 116.5
                      L 226.5 116.5
                      A 110 110 0 0 1 21.24 171.5
                      Z
                    "
                    fill="#9d69ff"
                  />
                  {/* 白色细线圆环 */}
                  <circle
                    cx="116.5"
                    cy="116.5"
                    r="110"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </svg>
             
                {/* 中心大号数字 */}
                <div style={{ position: 'absolute', left: 158, top: 11, color: '#9d69ff', fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 55, width: 196, height: 67, textAlign: 'left' }}>&lt;50%</div>
                {/* 下方说明 */}
                <div style={{ position: 'absolute', left: 0, top: 259, color: '#fff', fontFamily: 'PingFang SC, sans-serif', fontSize: 15, width: 303, height: 21, textAlign: 'left' }}>
                  付费订阅收入在网络文学市场收入中的占比
                </div>
                {/* 饼图图注 */}
                <div style={{ position: 'absolute', left: -50, top: 310, color: '#fff', fontFamily: 'Microsoft YaHei, sans-serif', fontSize: 15, width: 400, textAlign: 'justify', lineHeight: 1.5 }}>
                  *数据来源：中国音像与数字出版协会发布《2020年中国网络文学发展报告》，发布时间为2021年10月9日
                </div>
              </div>
              {/* 树状图区 */}
              <div style={{ position: 'relative', width: 481 + 348, height: 338 + 67, left: 225 }}>
                {/* 顶级爆款竖条 */}
                <div style={{ position: 'absolute', left: 277, top: 40, width: 66, height: 272, background: 'linear-gradient(180deg, #ffc3ff 0%, #fd83be 100%)' }} />
                {/* 普通作品竖条 */}
                <div style={{ position: 'absolute', left: 183, top: 152, width: 66, height: 160, background: 'linear-gradient(180deg, #ffc3ff 0%, #fd83be 100%)' }} />
                {/* 顶级爆款数字 */}
                <div style={{ position: 'absolute', left: 199, top: 0, color: '#fd83be', fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 55, width: 348, height: 67, textAlign: 'left' }}>&gt;10000000</div>
                <div style={{ position: 'absolute', left: 15, top: 109, color: '#fd83be', fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 55, width: 348, height: 67, textAlign: 'left' }}>&gt;100000</div>
                {/* 顶级爆款标签 */}
                <div style={{ position: 'absolute', left: 281, top: 290, color: '#fff', fontFamily: 'PingFang SC, sans-serif', fontSize: 15, width: 73, height: 21, textAlign: 'left' }}>顶级爆款</div>
                {/* 普通作品标签 */}
                <div style={{ position: 'absolute', left: 186, top: 290, color: '#fff', fontFamily: 'PingFang SC, sans-serif', fontSize: 15, width: 73, height: 21, textAlign: 'left' }}>普通作品</div>
                {/* IP价格示意图标签 */}
                <div style={{ position: 'absolute', left: 216, top: 338, color: '#fff', fontFamily: 'PingFang SC, sans-serif', fontSize: 15, width: 92, height: 21, textAlign: 'left' }}>IP价格示意图</div>
                {/* 树状图图注 */}
                <div style={{ position: 'absolute', left: 60, top: 387, color: '#fff', fontFamily: 'Microsoft YaHei, sans-serif', fontSize: 15, width: 400, textAlign: 'justify', lineHeight: 1.5 }}>
                  *此图为综合多部网文作品版权费计算后的示意图，版权费数据部分源于晋江文学网公告，其余为网易号公开发布数据
                </div>
              </div>
            </div>
            {/* 底部文案 */}
            <div style={{ color: '#fff', fontFamily: 'PingFang SC, sans-serif', fontSize: 24, textAlign: 'left', whiteSpace: 'pre' }}>
              在这种模式下，对作者来说最重要的不是内容本身，而是把书的数据和热度炒上去，吸引资方购买版权。
            </div>
          </div>
        </div>

        {/* P3 */}
        {/* Figma节点 106-140 还原 */}
        <div
          className="h-[811px] overflow-clip relative shrink-0 w-full bg-[#000]"
          data-name="P3"
          id="node-2078_56"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1090px]" id="node-2078_54">
            <div className="box-border content-stretch flex flex-col gap-[60px] items-center justify-start p-0 relative w-[1090px]">
              <div className="relative shrink-0 w-full" id="node-2078_53">
                <div className="box-border content-stretch flex flex-row gap-5 items-center justify-start leading-[0] p-0 relative w-full">
                  {/* 新增：左侧插入图片 */}
                  <img
                    src={require('./assets/images/barchat.png')}
                    alt="barchat"
                    style={{ width: 520, height: 'auto', marginRight: 20, display: 'block', marginTop: -40 }}
                  />
                  <div
                    className="font-['PingFang_SC:Medium',_sans-serif] h-[140px] not-italic relative shrink-0 text-[#ffffff] text-[24px] text-left w-[528px]"
                    id="node-106_144"
                    style={{ marginLeft: 'auto' }}
                  >
                    <p className="block leading-[normal]" style={{textAlign: 'justify'}}>
                      2024年上半年，阅文集团版权运营收入同比增长75.7%，成为这半年阅文的主要收入支柱。IP版权收入同比大增34.2%。全年来看，阅文集团实现收入81.2亿元，同比增长15.8%。
                    </p>
                  </div>
                </div>
              </div>
              <div className="font-['PingFang_SC:Medium',_sans-serif] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-[#ffffff] text-[24px] text-left" id="node-2078_55">
                  <div className="[grid-area:1_/_1] h-[68px] ml-0 mt-0 relative w-[1100px]" id="node-106_154">
                    <p className="block leading-[normal]" style={{textAlign: 'justify'}}>
                    伴随着网文产业的迅速商业化，"市场"与作者和读者间的观念矛盾愈演愈烈。这种矛盾看似发生在读者与作者之间，而实际上，她们身处同一阵营。读者看到的是矛盾的A面，作者看到的则是矛盾的B面。
                  </p>
                </div>
                <div className="[grid-area:1_/_1] h-[68px] ml-0 mt-[130px] relative w-[1100px]" id="node-106_155">
                  <p className="block leading-[normal]" style={{textAlign: 'justify'}}>
                    2018年前后，九阶（笔名）在晋江签约，开始将稿费作为自己的一项重要收入。她可以算是乘着网文平台商业化的第一股东风进入行业的作者。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* P4 */}
        {/* Figma节点 2123-151 还原, 已修正居中 */}
        <div className="w-full flex justify-center bg-[#000]">
          <div
            className="relative h-[1094px] overflow-clip w-[1440px]"
            data-name="P4"
            id="node-2123_151"
          >
            <div
              className="absolute contents left-1/2 translate-x-[-50%] translate-y-[-50%]"
              id="node-2123_152"
              style={{ top: "calc(50% + 0.5px)" }}
            >
              <div
                className="absolute left-[175px] top-[474px]"
                id="node-2123_153"
              >
                <div className="box-border content-stretch flex flex-col font-['PingFang_SC:Medium',_sans-serif] gap-[50px] items-start justify-start leading-[0] not-italic p-0 relative text-[#ffffff] text-[24px] text-left w-[1090px]">
                  <div className="h-[68px] relative shrink-0 w-[1091px]" id="node-2123_154">
                    <p className="block leading-[normal]" style={{textAlign: 'justify'}}>最开始，九阶只是随性而写，不考虑市场，"写的女主形象和当时晋江流行的女主形象天差地远"。与那些一进入行业就寻找模板遵照大热攻略写作的作者不同，她的"上榜"之路尤为艰辛。</p>
                  </div>
                  <div className="h-[68px] relative shrink-0 w-[1083px]" id="node-2123_155">
                    <p className="block leading-[normal]" style={{textAlign: 'justify'}}>九阶第一本书完结，"毛病无数，成绩超级差"。九阶开始看榜上的文，渐渐发现，晋江已经不再流行她写的那种悠游自在的游侠式的女主，她开始学习，调整风格。</p>
                  </div>
                  <div className="h-[68px] relative shrink-0 w-[1083px]" id="node-2123_156">
                    <p className="block leading-[normal]" style={{textAlign: 'justify'}}>跳频写作，是九阶适应市场的一种方式。她去了大热门的玄幻言情频道，因为不会跟热点迎合市场，成绩还是不好。为了迎合市场，她开始尝试模仿榜上的文章描写同样形象的女主。</p>
                  </div>
                  <div className="h-[68px] relative shrink-0 w-[1083px]" id="node-2123_157">
                    <p className="block leading-[normal]" style={{textAlign: 'justify'}}>当时，晋江流行娇软女主。九阶学着写了一个"娇软"类型的女主，尽力模仿，但"学得不太像，不是那么软"。因为不太会模仿，她说："跳频的成绩总是不太理想。"</p>
                  </div>
                  <div className="h-[123px] relative shrink-0 w-[1083px]" id="node-2123_158">
                    <p className="block leading-[normal]" style={{textAlign: 'justify'}}>在这一过程中，"网文创作"已不再只是作者与读者之间的事情。读者无法读到最想看的角色，作者无法书写最想写的形象，决定权被"市场"这个第三方力量握在手中。矛盾与勉强之下，"市场"在其中发生了多大的作用？</p>
                  </div>
                </div>
              </div>
              <div
                className="absolute top-[26px] translate-x-[-50%]"
                data-name="jiujie"
                id="node-2123_159"
                ref={jiujieCardRef}
                style={{
                  left: "0%",
                  opacity: jiujieCardVisible ? 1 : 0,
                  transition: 'opacity 1.0s',
                }}
              >
                <div className="absolute contents left-[846.384px] top-[26px]" id="node-2123_160">
                  <div className="absolute flex h-[177px] items-center justify-center left-[846.384px] top-[26px] w-[406.627px]">
                    <div className="flex-none rotate-[180deg]">
                      <div className="bg-gradient-to-b from-[#ffc3ff] h-[177px] rounded-[10px] shadow-[-5px_-7px_4px_0px_#fff] to-[#ffffff] via-[#ffdbff] via-[66.346%] w-[406.627px]" id="node-2123_161" />
                    </div>
                  </div>
                  <div className="absolute font-['HYXinRenWenSongW:Regular',_sans-serif] h-[117.456px] leading-[0] left-[914.007px] not-italic text-[#2f106a] text-[20px] text-left top-[65.152px] w-[313.201px]" id="node-2123_162">
                    <p className="block leading-[1.47]" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>写小说对我来说，并不是离开它就会没饭吃，可以在追随市场喜好的同时，悄悄地稍微保留一点自己的想法。</p>
                  </div>
                </div>
                <div className="absolute contents left-[187.988px] top-36" id="node-2123_163">
                  <div className="absolute flex h-[220px] items-center justify-center left-[187.988px] top-36 w-[658.396px]">
                    <div className="flex-none rotate-[180deg]">
                      <div className="bg-gradient-to-b from-[#ffc3ff] h-[220px] rounded-[10px] shadow-[-5px_-7px_4px_0px_#fff] to-[#ffffff] via-[#ffdbff] via-[66.346%] w-[658.396px]" id="node-2123_164" />
                    </div>
                  </div>
                  <div className="absolute font-['HYXinRenWenSongW:Regular',_sans-serif] h-[143.123px] leading-[1.47] left-[235.944px] not-italic text-[#110822] text-[24px] text-left top-[171px] w-[434.349px]" id="node-2123_165">
                    <p className="block mb-0" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>作者笔名：九阶</p>
                    <p className="block mb-0" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>年龄：35+</p>
                    <p className="block mb-0" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>职业：国企职员、兼职写作</p>
                    <p className="block mb-0" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>写作收入用途：占比较大，用于还房贷</p>
                    <p className="block" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>写作状态：相对自由。</p>
                  </div>
                </div>
                <div
                  className="absolute h-[382.824px] left-[635.505px] top-[31.176px] w-[315.572px]"
                  data-name="jimeng-2025-06-15-526-帮我生成一个像素风的女作者头像，需要长发，大概三十岁，看起来文质彬彬。颜色使用粉色和黑白灰。 1"
                  id="node-2123_166"
                >
                  <img
                    src={require('./assets/images/jiujie.png')}
                    alt="jimeng avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* P5 */}
        {/* Figma节点 2123-167 还原 */}
        <div className="w-full flex justify-center bg-[#000]">
          <div
            className="relative h-[819px] overflow-clip w-[1440px]"
            data-name="P5"
            id="node-2123_167"
          >
            <div
              className="absolute contents left-1/2 translate-x-[-50%] translate-y-[-50%]"
              id="node-2123_168"
              style={{ top: "calc(50% + 0.5px)" }}
            >
              {/* 渐显包裹层开始 */}
              <div
                ref={renxiCardRef}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '500px', // 可根据实际内容调整
                  opacity: renxiCardVisible ? 1 : 0,
                  transition: 'opacity 1.0s',
                  zIndex: 2,
                  pointerEvents: renxiCardVisible ? 'auto' : 'none',
                }}
              >
                {/* 右侧卡片 */}
                <div
                  className="absolute contents left-[858px] top-[102px]"
                  id="node-2123_170"
                >
                  <div className="absolute flex h-[177px] items-center justify-center left-[858px] top-[102px] w-[407px]">
                    <div className="flex-none rotate-[180deg]">
                      <div
                        className="bg-gradient-to-b from-[#ffc3ff] h-[177px] rounded-[10px] shadow-[-7px_-7px_4px_0px_#ffffff] to-[#ffffff] via-[#ffdbff] via-[66.346%] w-[407px]"
                        id="node-2123_171"
                      />
                    </div>
                  </div>
                  <div
                    className="absolute font-['HYXinRenWenSongW:Regular',_sans-serif] h-[118px] leading-[0] left-[921px] not-italic text-[#2f106a] text-[20px] text-left top-[131px] w-[324px]"
                    id="node-2123_172"
                  >
                    <p className="block leading-[1.47]" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>
                      根据现成的关键词文档分配流量，一般不会给创新网文小说投流。相当于一个试验品，如果一次拨太多可能血本无归，我最后绩效也不好看。
                    </p>
                  </div>
                </div>
                {/* 左侧卡片 */}
                <div
                  className="absolute contents left-[175px] top-[216px]"
                  id="node-2123_173"
                >
                  <div className="absolute flex h-[220px] items-center justify-center left-[175px] top-[216px] w-[659px]">
                    <div className="flex-none rotate-[180deg]">
                      <div
                        className="bg-gradient-to-b from-[#ffc3ff] h-[220px] rounded-[10px] shadow-[-7px_-7px_4px_0px_#ffffff] to-[#ffffff] via-[#ffdbff] via-[66.346%] w-[659px]"
                        id="node-2123_174"
                      />
                    </div>
                  </div>
                  <div
                    className="absolute font-['HYXinRenWenSongW:Regular',_sans-serif] h-[175px] leading-[1.47] left-[211px] not-italic text-[#110822] text-[24px] text-left top-[243px] w-[438px]"
                    id="node-2123_175"
                  >
                    <p className="block mb-0" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>姓名：任汐</p>
                    <p className="block mb-0" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>年龄：25</p>
                    <p className="block mb-0" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>职业：某大厂网文小说数据运营</p>
                    <p className="block mb-0" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>从事这项工作时长：4个月</p>
                    <p className="block" style={{ fontFamily: 'HYXinRenWenSongW, serif', fontWeight: 500 }}>工作内容：操作后台，给收到的稿件投流</p>
                  </div>
                </div>
                {/* 人物头像 */}
                <div
                  className="absolute h-[354px] left-[635px] top-[118px] w-[279.303px]"
                  data-name="renxi 1"
                  id="node-2123_176"
                >
                  <img
                    src={require('./assets/images/renxi.png')}
                    alt="renxi avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* 渐显包裹层结束 */}
              {/* 下面保留原有的描述内容等 */}
              <div
                className="absolute left-[187px] top-[532px]"
                id="node-2123_177"
              >
                <div className="box-border content-stretch flex flex-col font-['PingFang_SC:Medium',_sans-serif] gap-[50px] items-start justify-start leading-[0] not-italic p-0 relative text-[#ffffff] text-[24px] text-left w-[1058px]">
                  <div className="relative shrink-0 w-full" id="node-2123_178">
                    <p className="block leading-[normal]">
                      任汐对于这个问题有一定的发言权。2025年4月的一天早晨，她打开电脑开始工作。
                    </p>
                  </div>
                  <div className="relative shrink-0 w-full" id="node-2123_179">
                    <p className="block leading-[normal]" style={{textAlign: 'justify'}}>
                      任汐的这一工作叫作"人工投流"。一篇小说获得多大的流量由两个因素决定：人工投流与后期表现。人工投流通过广告买量、社交媒体推送等方式决定"流量基数"，后期表现好的则在流量基数上再获得更多的额外流量，反之则获得更少的流量[3]。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* P5 */}
        <div className="w-full flex justify-center bg-[#000]">
          <div className="relative w-[1090px] h-[900px] mx-auto flex flex-row items-center">
            <div style={{ width: '275.326px', height: '332.611px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 133, marginLeft: 77, marginTop: -30 }}>
              <img
                src={require('./assets/images/renxishengao.png')}
                alt="renxishengao"
                style={{ maxWidth: '120%', maxHeight: '130%', objectFit: 'contain', display: 'block', transform: 'scale(1.3)' }}
              />
            </div>
            <div
              className="absolute h-[293px] left-[545px] top-[259px] w-[545px]"
              id="node-2123_182"
            >
              <div className="box-border content-stretch flex flex-col font-['PingFang_SC:Medium',_sans-serif] gap-[50px] h-[293px] items-start justify-start leading-[0] not-italic p-0 relative text-[#ffffff] text-[24px] text-left w-[545px]">
                <div className="relative shrink-0 w-full" id="node-2123_183">
                  <p className="leading-[normal]" style={{textAlign: 'justify'}}>
                    <span className>
                      1000篇文章共800万字体量，浓缩到标题上仅有8-15字，看在任汐眼里，仅剩
                    </span>
                    <span className="font-['PingFang_SC:Bold',_sans-serif] not-italic text-[#fd83be]">
                      "替身""萌宝""金手指"
                    </span>
                    <span className>{`等关键词。 `}</span>
                  </p>
                </div>
                <div
                  className="h-[68px] relative shrink-0 w-full"
                  id="node-2123_184"
                >
                  <p className="block leading-[normal]" style={{textAlign: 'justify'}}>
                    在入职的第一天，任汐就收到了一份详尽的投流SOP（标准化操作步骤）文档。文档的第二部分是一个关键词包，归纳了一篇文章当中浓缩出的关键词。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* P6 */}
        <div className="w-full flex justify-center bg-[#000]" style={{ position: 'relative' }}>
          <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center', width: '100%', position: 'relative' }}>
            <div className="relative w-[1440px] h-[1095px] mx-auto" data-name="P6" style={{ background: `url(${require('./assets/images/任汐审稿底.png')}) center/cover no-repeat`, overflow: 'hidden', position: 'relative' }}>
              {/* 右上角卡片 */}
              <div style={{
                position: 'absolute',
                top: '244px',
                left: '1042px',
                width: '299px',
                height: '111px',
                background: '#ffdeff',
                borderRadius: '10px',
                boxShadow: '5px 5px 4px 0px rgba(0,0,0,0.19)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0',
              }}>
                <span style={{
                  color: '#110822',
                  fontFamily: 'PingFang SC, sans-serif',
                  fontSize: '24px',
                  lineHeight: 1.47,
                  textAlign: 'left',
                  padding: '0 30px',
                  display: 'block',
                }}>*鼠标点击来稿标题，查看关键词价格</span>
              </div>
              {/* 居中标题区 */}
              <div
                style={{
                  position: 'absolute',
                  top: '378.324px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '901.782px',
                  height: '656.676px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '50px',
                  fontFamily: 'HYXinRenWenSongW, serif',
                  color: 'rgba(0,0,0,0.55)',
                  cursor: 'pointer',
                }}
                onClick={() => setShowP7(true)}
              >
                <div style={{ fontSize: '35px', whiteSpace: 'pre', lineHeight: 1, textAlign: 'left' }}>
                  <span>《</span><span style={{ color: '#fd83be' }}>白月光</span><span>死后，总裁把我当</span><span style={{ color: '#fb84be' }}>替身</span><span style={{ color: '#fd83be' }}>夜夜索吻》</span>
              </div>
                <div style={{ fontSize: '35px', whiteSpace: 'pre', lineHeight: 1, textAlign: 'left' }}>
                  <span>《</span><span style={{ color: '#fd83be' }}>末世</span><span>生存指南：最强孤狼的养成日记》</span>
                </div>
                <div style={{ fontSize: '35px', whiteSpace: 'pre', lineHeight: 1, textAlign: 'left' }}>
                  <span>《穿成</span><span style={{ color: '#fd83be' }}>炮灰</span><span>女配后，我绑定了神级签到系统》</span>
                </div>
                <div style={{ fontSize: '35px', whiteSpace: 'pre', lineHeight: 1, textAlign: 'left' }}>
                  <span>《</span><span style={{ color: '#fd83be' }}>离婚</span><span>后，天才三岁半</span><span style={{ color: '#fd83be' }}>萌宝</span><span style={{ color: '#fd83be' }}>曝光他爹是首富》</span>
                </div>
                <div style={{ fontSize: '35px', whiteSpace: 'pre', lineHeight: 1, textAlign: 'left' }}>
                  <span>《冷王</span><span style={{ color: '#fd83be' }}>毒宠</span><span>：神医</span><span style={{ color: '#fd83be' }}>弃妃</span><span style={{ color: '#fd83be' }}>休夫后惊艳天下》</span>
                </div>
                <div style={{ fontSize: '35px', whiteSpace: 'pre', lineHeight: 1, textAlign: 'left' }}>
                  <span>《星际探险家：我的队友是AI和异兽》</span>
                </div>
              </div>
              {/* 标题大字 */}
              <div style={{
                position: 'absolute',
                top: '242px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '400px',
                height: '74.811px',
                color: '#000',
                fontFamily: 'PingFang SC, sans-serif',
                fontWeight: 900,
                fontSize: '64px',
                letterSpacing: '39.68px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                lineHeight: '74.811px',
              }}>
                标题
              </div>
              {/* 说明小字 */}
              <div style={{
                position: 'absolute',
                top: '378px',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                width: '432px',
                color: '#110822',
                fontFamily: 'PingFang SC, sans-serif',
                fontSize: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'justify',
              }}>
                *此界面为数据投流模拟界面，部分数据及标题应受访者要求做模糊或替换处理
              </div>
              {/* P7浮层，绝对定位覆盖P6 */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 10,
                  pointerEvents: showP7 ? 'auto' : 'none',
                  opacity: showP7 ? 1 : 0,
                  transition: 'opacity 1.8s',
                }}
              >
                {/* P7内容开始 */}
                <div className="relative w-[1440px] h-[1095px] mx-auto" data-name="P7" style={{ background: `url(${require('./assets/images/任汐审稿底.png')}) center/cover no-repeat`, overflow: 'hidden' }}>
                  {/* 右上角气泡卡片 */}
                  <div style={{
                    position: 'absolute',
                    top: '244px',
                    left: '1042px',
                    width: '299px',
                    height: '111px',
                    background: '#ffdeff',
                    borderRadius: '10px',
                    boxShadow: '5px 5px 4px 0px rgba(0,0,0,0.19)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                  }}>
                    <span style={{
                      color: '#110822',
                      fontFamily: 'PingFang SC, sans-serif',
                      fontSize: '24px',
                      lineHeight: 1.47,
                      textAlign: 'left',
                      padding: '0 30px',
                      display: 'block',
                    }}>*鼠标点击来稿标题，查看关键词价格</span>
                  </div>
                  {/* 左下角气泡卡片 */}
                  <div style={{
                    position: 'absolute',
                    top: '447px',
                    left: '18px',
                    width: '432px',
                    height: '141px',
                    background: '#ffdeff',
                    borderRadius: '10px',
                    boxShadow: '5px 5px 4px 0px rgba(0,0,0,0.19)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                  }}>
                    <span style={{
                      color: '#110822',
                      fontFamily: 'PingFang SC, sans-serif',
                      fontSize: '24px',
                      lineHeight: 1.47,
                      textAlign: 'justify',
                      padding: '0 30px',
                      display: 'block',
                    }}>"大女主""无CP"等关键词，因为新、未经检验，一般不会给投流或是给得很少。</span>
                  </div>
                  {/* 右中气泡卡片 */}
                  <div style={{
                    position: 'absolute',
                    top: 'calc(50% + 305.5px)',
                    left: 'calc(50% + 438px)',
                    width: '366px',
                    height: '146px',
                    background: '#ffdeff',
                    borderRadius: '10px',
                    boxShadow: '5px 5px 4px 0px rgba(0,0,0,0.19)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    transform: 'translate(-50%, -50%)',
                  }}>
                    <span style={{
                      color: '#110822',
                      fontFamily: 'PingFang SC, sans-serif',
                      fontSize: '24px',
                      lineHeight: 1.47,
                      textAlign: 'justify',
                      padding: '0 30px',
                      display: 'block',
                    }}>严茜最讨厌的"狗血挖心挖肺"情节，在关键词包里却被标上了很高的价格。</span>
                  </div>
                  {/* 居中关键词区 */}
                  <div style={{
                    position: 'absolute',
                    top: '369px',
                    left: 'calc(50% - 420px)',
                    width: '468px',
                    height: '657px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    gap: '32px',
                    fontFamily: 'HYXinRenWenSongW, serif',
                    color: '#fd83be',
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{ fontSize: '50px', color: '#fd83be', lineHeight: 1 }}>
                      <span style={{ color: '#fd83be' }}>白月光 </span><span style={{ color: '#fb84be' }}>替身</span>
                    </div>
                    <div style={{ fontSize: '50px', color: '#fd83be', lineHeight: 1 }}>末世、无CP</div>
                    <div style={{ fontSize: '50px', color: '#fd83be', lineHeight: 1 }}>穿书、炮灰、金手指</div>
                    <div style={{ fontSize: '50px', color: '#fd83be', lineHeight: 1 }}>离婚、萌宝</div>
                    <div style={{ fontSize: '50px', color: '#fd83be', lineHeight: 1 }}>毒宠、弃妃、逆袭</div>
                    <div style={{ fontSize: '50px', color: '#fd83be', lineHeight: 1 }}>无CP、探险</div>
                  </div>
                  {/* 标题大字 */}
                  <div style={{
                    position: 'absolute',
                    top: '242px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '400px',
                    height: '74.811px',
                    color: '#000',
                    fontFamily: 'PingFang SC, sans-serif',
                    fontWeight: 900,
                    fontSize: '64px',
                    letterSpacing: '39.68px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    lineHeight: '74.811px',
                  }}>
                    标题
                  </div>
                  {/* 说明小字 */}
                  <div style={{
                    position: 'absolute',
                    top: '378px',
                    left: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                    width: '432px',
                    color: '#110822',
                    fontFamily: 'PingFang SC, sans-serif',
                    fontSize: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'justify',
                  }}>
                    *此界面为数据投流模拟界面，部分数据及标题应受访者要求做模糊或替换处理
                  </div>
                  {/* 右侧数字区 */}
                  <div style={{
                    position: 'absolute',
                    top: '433px',
                    left: '822px',
                    width: '169px',
                    height: '529px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '42px',
                    fontFamily: 'HYXinRenWenSongW, serif',
                    color: '#2f106a',
                    fontSize: '50px',
                    textAlign: 'left',
                  }}>
                    <div style={{ lineHeight: 0.8 }}>150</div>
                    <div style={{ lineHeight: 0.8 }}>50</div>
                    <div style={{ lineHeight: 0.8 }}>200</div>
                    <div style={{ lineHeight: 0.8 }}>150</div>
                    <div style={{ lineHeight: 0.8 }}>120</div>
                    <div style={{ lineHeight: 0.8 }}>30</div>
                  </div>
                </div>
                {/* P7内容结束 */}
              </div>
            </div>
          </div>
        </div>

        {/* P8区块 */}
        <div style={{
          width: '100%',
          height: 735,
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}>
          {/* 内容区：宽1090px，gap自动分配 */}
          <div style={{
            width: 1090,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 50,
            color: '#fff',
            fontFamily: 'PingFang SC, sans-serif',
            
            fontSize: 24,
            boxSizing: 'border-box',
            textAlign: 'left',
            letterSpacing: 0,
            margin: '0 auto',
          }}>
            <div style={{ height: 68, display: 'flex', alignItems: 'center', width: '100%', textAlign: 'justify' }}>
              任汐入职的这段时间，关键词包几乎没有变过。
            </div>
            <div style={{ height: 100, display: 'flex', alignItems: 'center', width: '100%', textAlign: 'justify' }}>
              任汐的工作几乎完全是数据导向的，脱离文本内容。她的工作样态是整个女频网文市场样态的缩影。"人文价值"与"利益至上"之间，市场毫不犹豫地选择了后者，并且搭建起一整套运营机制，不断挤压"人文价值"的生存空间。
            </div>
            <div style={{ height: 68, display: 'flex', alignItems: 'center', width: '100%', textAlign: 'justify' }}>
              在这套运营机制中，市场评判一部网文的标准是抽象数据而非具体内容。
            </div>
            <div style={{ height: 68, display: 'flex', alignItems: 'center', width: '100%', textAlign: 'justify' }}>
              在入职面试时，任汐就被告知：用户的价值提升是由"平台导流"带来的，而不是用户本身就具有高价值属性。换言之，内容不重要，数据的操作和表现才重要。
            </div>
          </div>
        </div>

        {/* P9-1区块 */}
        <div
          style={{
            width: '100%',
            height: 940,
            background: '#000',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* 顶部说明，依靠logic1.png定位 */}
          {(() => {
            return (
              <>
                {/* 顶部说明，依靠logic1.png下边缘定位 */}
                <div style={{
                  width: 1090,
                  margin: '0 auto',
                  color: '#fff',
                  fontFamily: 'PingFang SC, sans-serif',
         
                  fontSize: 24,
                  textAlign: 'justify',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: descTop,
                  height: DESC_HEIGHT,
                }}>
                  {descList[currentIndex]}
              </div>
                {/* 主内容卡片绝对定位（以中心点定位，锚点为logic1.png下边缘） */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: cardTop,
                  transform: 'translateX(-50%)',
                  width: 960,
                  height: CARD_HEIGHT,
                  background: '#2d2d2d',
                  borderRadius: 20,
                  border: '1.5px solid #fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}>
                  {/* 左箭头（仅2-5页显示） */}
                  {currentIndex > 0 && (
                    <div style={{
                      position: 'absolute',
                      left: -100,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: 60,
                      color: '#fff',
                      fontWeight: 400,
                      cursor: 'pointer',
                      userSelect: 'none',
                      zIndex: 2,
                    }} onClick={handlePrev}>{'＜'}</div>
                  )}
                  {/* 右箭头（仅1-4页显示） */}
                  {currentIndex < 4 && (
                    <div style={{
                      position: 'absolute',
                      right: -100,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: 60,
                      color: '#fff',
                      fontWeight: 400,
                      cursor: 'pointer',
                      userSelect: 'none',
                      zIndex: 2,
                    }} onClick={handleNext}>{'＞'}</div>
                  )}
                  {/* 三行主说明文字 */}
                  <div style={{
                    width: 831,
                    color: '#fff',
                    fontFamily: 'HYXinRenWenSongW, sans-serif',
                    fontSize: 24,
                    textAlign: 'left',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                    {Array.isArray(cardList[currentIndex]) && cardList[currentIndex][0]?.type === 'image'
                      ? (
                        <img
                          src={cardList[currentIndex][0].src}
                          alt={`card${currentIndex+1}`}
                          style={
                            currentIndex === 3
                              ? { maxWidth: '100%', maxHeight: 300, display: 'block', margin: '0 auto', transform: 'scale(1.35)', transformOrigin: 'center' }
                              : currentIndex === 4
                                ? { maxWidth: '100%', maxHeight: 300, display: 'block', margin: '0 auto', transform: 'scale(1.3)' }
                                : { maxWidth: '100%', maxHeight: 300, display: 'block', margin: '0 auto', transform: 'scale(1.25)' }
                          }
                        />
                      )
                      : cardList[currentIndex].map((line, idx) => (
                        <p style={{ margin: 0 }} key={idx}>{line}</p>
                      ))}
                  </div>
          </div>
                {/* logic图片 绝对定位在底部60px */}
                <div style={{ position: 'absolute', left: '50%', bottom: 25, transform: 'translateX(-50%)', width: 1090, display: 'flex', justifyContent: 'center' }}>
                  <img src={logicImgList[currentIndex]} alt={`logic${currentIndex+1}`} style={{ width: 1090, height: 'auto', display: 'block', transform: 'scale(0.8)' }} />
        </div>
                {/* 页面加长200px */}
                <div style={{ width: '100%', height: 200, pointerEvents: 'none' }} />
                {/* P9-5后延伸新页面 */}
                {currentIndex === 4 && (
                  <div style={{ width: '100%', height: 940, background: '#000' }} />
                )}
              </>
            );
          })()}
      </div>
    </div>

    {/* P9-1区块后，currentIndex为4时显示新内容 */}
    {hasReachedP95 && (
      <div style={{
        width: '100%',
        minHeight: '940px',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontFamily: 'PingFang SC, sans-serif',
        position: 'relative',
        padding: 0,
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          width: 1440,
          height: 940,
          background: '#000',
          overflow: 'hidden',
        }}>
          {/* 顶部两段大号白色文字 */}
          <div style={{ position: 'absolute', left: 189, top: 136, width: 1090 }}>
            <div style={{ fontSize: 24, color: '#fff', fontFamily: 'PingFang SC, sans-serif', marginBottom: 50 }}>
              这套运营机制是纯粹由数据驱动的。从内容评判的角度出发审视这套机制，会发现：IP运营中的版权购买方滞后性强，版权购买方偏向留下"数据好"但容易过时的IP。
            </div>
            <div style={{ fontSize: 24, color: '#fff', fontFamily: 'PingFang SC, sans-serif' }}>
              "市场"因素在网文产业影响越来越大，其独立的运作逻辑正在发挥越来越显著的作用。女频网文形象塑造单一落后，就是其中很重要的一个作用效果。
            </div>
          </div>
          {/* 右侧说明文字 */}
          <div style={{
            position: 'absolute',
            left: 872,
            top: 532,
            width: 394,
            height: 107,
            fontSize: 20,
            color: '#fff',
            fontFamily: 'HYXinRenWenSongW, serif',
            textAlign: 'left',
            lineHeight: 1.5,
          }}>
            不管剧情如何走向，套路如何变化，但故事中的女主角似乎都很类似，形象相对固定，摆在榜单上的关键词匹配连线，就成了新的爆款。故事中的女主角，她们大多数是炮灰女配，也有一些是白月光型人物，还有一些要去体验娱乐圈中的一夜爆红。
          </div>
          {/* 词云图 */}
          <div style={{
            position: 'absolute',
            left: 189,
            top: 382,
            width: 603,
            height: 385,
            background: `url(${titlecloud}) center/cover no-repeat`,
            backgroundSize: '101.74% 100%',
            borderRadius: 8,
          }} />
          {/* 左下角小字说明 */}
          <div style={{
            position: 'absolute',
            left: 206,
            top: 777,
            fontSize: 15,
            color: '#fff',
            fontFamily: 'PingFang SC, sans-serif',
            whiteSpace: 'pre',
          }}>
            *抓取晋江文学网总分榜与完结全订榜共计785部小说书名进行词频统计与词云图呈现
          </div>
        </div>
      </div>
    )}
    {/* P10后新增PART·3区块 */}
    {hasReachedP95 && (
      <div style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
      }}>
        <div
          ref={part3Ref}
          className="relative w-full flex justify-center items-center"
          style={{ height: "1023px", opacity: part3Visible ? 1 : 0, transition: 'opacity 1.2s' }}
        >
          <div
            className="relative w-[1109px] h-[549px]"
            style={{ margin: "0 auto" }}
          >
            {/* "PART·3" 左下角 */}
            <div
              style={{ opacity: 1, position: 'relative', width: '100%', height: '100%' }}
            >
              <div
                className="absolute left-0 bottom-0 w-[877px] h-[316px]"
                style={{ transform: 'translate(-120px, -70px)', zIndex: 2 }}
              >
                <img
                  src={part3Img}
                  alt="PART·3"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>
              {/* "消失的女人" 右上角 */}
              <div
                className="absolute right-0 top-0 w-[1109px] h-[549px] text-[#f9feea] text-right"
                style={{
                  fontFamily: "Microsoft YaHei UI, sans-serif",
                  fontSize: "200px",
                  fontWeight: 700,
                  letterSpacing: "18px",
                  lineHeight: "274px",
                }}
              >
                <p style={{ textAlign: "right", margin: 0 }}>新造的</p>
                <p style={{ textAlign: "right", margin: 0 }}>女人</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    {/* P10和PART3之后新增"网文市场样态将要走向何方"区块 */}
    {hasReachedP95 && (
      <div style={{
        width: '100%',
        minHeight: '1088px',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontFamily: 'PingFang SC, sans-serif',
        position: 'relative',
        padding: 0,
        marginTop: 0,
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          width: 1440,
          height: 1088,
          background: '#000',
          overflow: 'hidden',
        }}>
          {/* 顶部大段文字 */}
          <div style={{
            position: 'absolute',
            top: 125,
            left: '50%',
            width: 1090,
            transform: 'translateX(-50%)',
            fontSize: 24,
            color: '#fff',
            fontFamily: 'PingFang SC, sans-serif',
            textAlign: 'left',
            lineHeight: 1.7,
          }}>
            <p style={{ margin: 0 }}>网文市场样态将要走向何方？</p>
            <p style={{ margin: 0 }}>&nbsp;</p>
            <p style={{ margin: 0 }}>市场、读者与作者三方角力的背后，是以女频网文为代表的内容市场所面临的争议——当一类会对人们的价值观念带来影响的作品变成一个产业，它究竟应该以盈利为第一目的还是应该最大程度兼顾人文价值影响？</p>
            <p style={{ margin: 0 }}>&nbsp;</p>
            <p style={{ margin: 0 }}>这两个答案看似一个对应着现实一个对应着理想，理想似乎总要向现实妥协。然而，事实并非如此。当读者与作者变化的思潮袭来，那套坚固而庞大的市场运营逻辑正在松动。现有的女频网文市场样态正在出现改变的迹象。</p>
          </div>
          {/* 右侧数据柱状图区块 */}
          <div style={{
            position: 'absolute',
            left: 956,
            top: 660,
            width: 217,
            height: 344,
          }}>
            {/* 柱状条1 */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 94.37,
              height: 272,
              background: 'linear-gradient(180deg, #9d69ff 0%, #2f106a 100%)',
            }} />
            {/* 柱状条2 */}
            <div style={{
              position: 'absolute',
              left: 123,
              top: 209,
              width: 94.37,
              height: 63,
              background: 'linear-gradient(180deg, #9d69ff 0%, #2f106a 100%)',
            }} />
            {/* 数字4 */}
            <div style={{
              position: 'absolute',
              left: 27,
              top: -67,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 55,
              color: '#9d69ff',
              width: 71,
              height: 67,
              textAlign: 'left',
            }}>4</div>
            {/* 数字1 */}
            <div style={{
              position: 'absolute',
              left: 155,
              top: 138,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 55,
              color: '#9d69ff',
              width: 60,
              height: 67,
              textAlign: 'left',
            }}>1</div>
            {/* 说明文字 */}
            <div style={{
              position: 'absolute',
              left: 3,
              top: 280,
              fontSize: 15,
              color: '#fff',
              fontFamily: 'PingFang SC, sans-serif',
              width: 205,
              textAlign: 'left',
            }}>
              晋江文学核心IP有效播放数量
            </div>
            {/* 右侧图注 */}
            <div style={{
              position: 'absolute',
              right: '-38px',
              top: 320,
              fontSize: 15,
              color: '#fff',
              fontFamily: 'PingFang SC, sans-serif',
              textAlign: 'right',
              lineHeight: 1.5,
              whiteSpace: 'nowrap',
            }}>
              *数据来源：云合数据，截止时间为2025年2月27日
            </div>
          </div>
          {/* 右侧说明文字 */}
          <div style={{
            position: 'absolute',
            left: 801,
            top: 491,
            width: 464,
            fontSize: 20,
            color: '#fff',
            fontFamily: 'HYXinRenWenSongW, serif',
            textAlign: 'right',
            lineHeight: 1.5,
          }}>
            {/* 添加紫色竖线 */}
            <div style={{
              position: 'absolute',
              left: 320,
              bottom: -80,
              width: 2,
              height: 60,
              background: '#9d69ff',
            }} />
            与此同时，根据云合数据，截止2025年2月27日，晋江文学的核心 IP 在整体有效播放量中的占比已从四部骤降至一部，进一步印证了原有"高投入、重改编"的路径难以为继。
          </div>
          {/* 左侧说明与图片区块 */}
          <div style={{
            position: 'absolute',
            left: 175,
            top: 551,
            width: 538,
            fontSize: 20,
            color: '#fff',
            fontFamily: 'HYXinRenWenSongW, serif',
            textAlign: 'left',
            lineHeight: 1.5,
          }}>
            <div style={{ marginBottom: 20, textAlign: 'justify' }}> 
              尽管欢瑞世纪长期凭借早期大规模 IP 囤积取得了显著市场份额，但近年来持续亏损的局面表明，依赖传统囤货与"重仓式"运作的模式正面临挑战。
            </div>
            {/* 添加粉色竖线 */}
            <div style={{
              position: 'absolute',
              left: 336,
              top: 80,
              width: 2,
              height: 60,
              background: '#fb84be',
            }} />
            {/* 图片区块 */}
            <div style={{
              position: 'absolute',
              left: 5,
              top: 112,
              width: 663,
              height: 290,
              background: `url(${require('./assets/images/excel.png')}) center/contain no-repeat`,
              borderRadius: 8,
   
            }} />
            {/* 左侧图注 */}
            <div style={{
              position: 'absolute',
              left: 5,
              top: 427,
              width: 663,
              fontSize: 15,
              color: '#fff',
              fontFamily: 'PingFang SC, sans-serif',
              textAlign: 'left',
              lineHeight: 1.5,
            }}>
              *数据来源：欢瑞世纪2024年年报
            </div>
          </div>
          {/* 装饰SVG线条（如有SVG可用img标签，否则可省略） */}
        </div>
      </div>
    )}
    {/* 新增最新趋势区块 */}
    {hasReachedP95 && (
      <div style={{
        width: '100%',
        minHeight: '1088px',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        padding: 0,
        marginTop: 0,
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1440,
          height: 1088,
          background: '#000',
          overflow: 'hidden',
        }}>
          {/* 第一段说明文字 */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 138,
            width: 1093,
            color: '#fff',
            fontFamily: 'PingFang SC, sans-serif',
            fontSize: 24,
            textAlign: 'left',
            lineHeight: 'normal',
          }}>
            在市场、读者与作者三方力量的共同作用下，女频网文正由以往的"规模与速度至上"转向更为精细化、多元化以及强调内容与用户体验的新阶段。
          </div>

          {/* 第二段说明文字 */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 256,
            width: 1093,
            color: '#fff',
            fontFamily: 'PingFang SC, sans-serif',
            fontSize: 24,
            textAlign: 'left',
            lineHeight: 'normal',
          }}>
            以《砸锅卖铁去上学》等目前公认的好作品为例，微博评论中普遍对书籍的评价主要是好看、期待。评价中，读者主要的讨论对象是女性形象，对女主的讨论量是男主的两倍。读者喜欢足够新鲜而丰富的女频小说，期待看到ip运营后的新成果。对女性形象有所突破的作品，读者给出了正向反馈。
          </div>

          {/* 词云图区域 */}
          <div style={{
            position: 'absolute',
            left: 173,
            top: 418,
            width: 909.898,
            height: 532.088,
            backgroundImage: `url(${require('./assets/images/bookwordcloud.png')})`,
            backgroundSize: '102.09% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }} />


          {/* 右侧数据来源说明 */}
          <div style={{
            position: 'absolute',
            left: 1116.67,
            top: 425.963,
            width: 146.329,
            color: '#fff',
            fontFamily: 'PingFang SC, sans-serif',
            fontSize: 15,
            textAlign: 'justify',
            lineHeight: 'normal',
          }}>
            *数据来源：抓取微博关键词为砸锅卖铁去上学、我在废土世界扫垃圾、穿进赛博游戏后干掉boss成功上位三部网文作品的相关帖子文本内容，进行词频统计与可视化呈现，统计时间为2025年5月21日
          </div>
        </div>
      </div>
    )}

    {hasReachedP95 && (


      <div style={{
        width: '100%',
        minHeight: '1200px',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontFamily: 'PingFang SC, sans-serif',
        position: 'relative',
        padding: 0,
        marginTop: 0,
      }}>

        {/* ...内容... */}
        <div style={{ width: 1440, height: 841, background: '#000', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 1091, height: 841, display: 'flex', flexDirection: 'column', gap: 60, justifyContent: 'flex-start', alignItems: 'center', top: 0, left: 0, marginTop: 122 }}>
            {/* 两段主文案 */}
            <div style={{ color: '#fff', fontFamily: 'PingFang SC, sans-serif', fontSize: 24, marginBottom: 0 }}>
              当读者不再满足于公式化的人物，当作者不再默许数据逻辑对创作的主导，一些细微却真实的情绪正在浮现——她们也可以不完美，也可以失败、迟疑、愤怒、脆弱，而依然值得被爱、被理解、被书写。
            </div>
            <div style={{ color: '#fff', fontFamily: 'PingFang SC, sans-serif', fontSize: 24, marginBottom: 0 }}>
              "就算是最可爱的女主，她也是大女主。"在九阶的定义中，"大女主"不再意味着强硬或工具化的标签，而是一种内在的力量，一种"沿着自己的道路勇往直前"的姿态。严茜也希望看到"有反差"的人物——冷冷的外表下藏着温柔的心，"没那么好的一面"也是真实的一部分。
            </div>
            {/* 切换词组区 */}
            <FigmaSwitchWordsBlock />
            {/* 底部总结 */}
            <div style={{ color: '#fff',  width: 1091 ,fontFamily: 'PingFang SC, sans-serif', fontSize: 24, marginTop: 30 }}>
              于是我们开始重新想象：市场的裂缝，藏着新故事萌发的可能。
            </div>
            {/* 参考文献区块 */}
            <div style={{ marginTop: '100px', color: '#fff', fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif', fontSize: 18, lineHeight: 1.8, width: '100%', wordBreak: 'break-all' }}>
              参考文献：<br/>
              [1] 阅文集团今日上市开盘大涨 拥有多个A股合作伙伴_中证网. www.cs.com.cn. [2024-11-22].<br/>
              [2] 网文影视版权市场观察：金榜IP翻拍是爆款捷径吗？,《南方都市报》, 
              <a href="https://baijiahao.baidu.com/s?id=1783146340032896408&wfr=spider&for=pc" target="_blank" rel="noopener noreferrer" style={{ color: '#8ecaff', wordBreak: 'break-all' }}>
                https://baijiahao.baidu.com/s?id=1783146340032896408&amp;wfr=spider&amp;for=pc
              </a>.<br/>
              [3] 邵燕君 雷宁 × 纵横中文网许斌：网络文学的"流量玩法",《文艺论坛》,
              <a href="https://www.chinawriter.com.cn/n1/2024/0730/c404024-40288735.html" target="_blank" rel="noopener noreferrer" style={{ color: '#8ecaff', wordBreak: 'break-all' }}>
                https://www.chinawriter.com.cn/n1/2024/0730/c404024-40288735.html
              </a>.<br/>
              [4] 每日经济新闻(2024) , 对晋江文学城2025网站公开页面进行数据计算并分析
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

// 新增切换词组动画组件
function FigmaSwitchWordsBlock() {
  const switchWords1 = ['白月光', '炮灰', '恶毒女配', '恋人', '工具人'];
  const switchWords2 = ['发光的人', '写不完的支线', '不配合剧本的人', '朋友，旅伴，也可能是陌生人', '自己的人生主角'];
  const colors2 = ['#ff7c7e', '#FFAC75', '#FFDA54', '#FFF7AD', '#fff'];
  const [idx, setIdx] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true); // 开始淡出+滑出
      setTimeout(() => {
        setIdx(i => (i + 1) % switchWords1.length); // 切换词
        setAnimating(false); // 开始淡入+滑入
      }, 400); // 400ms淡出动画
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // 动画样式：animating为true时淡出+上移，为false时淡入+下移
  const getWordStyle = (color, isSecond) => ({
    color: color || '#fd83be',
    fontFamily: isSecond ? 'Microsoft YaHei UI, sans-serif' : 'Microsoft YaHei, sans-serif',
    fontWeight: 'bold',
    fontSize: 50,
    marginLeft: 10,
    transition: 'opacity 0.4s, transform 0.4s',
    opacity: animating ? 0 : 1,
    transform: animating ? 'translateY(-30px)' : 'translateY(0)',
    display: 'inline-block',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center', marginTop: 30, width: '100%' }}>
      {/* 第一行整体居中 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <span style={{ color: '#fff', fontFamily: 'HYXinRenWenSongW, serif', fontSize: 50 }}>
          她不再只是
        </span>
        <span style={getWordStyle('#fd83be', false)}>
          {switchWords1[idx]}
        </span>
      </div>
      {/* 第二行整体居中 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <span style={{ color: '#fff', fontFamily: 'HYXinRenWenSongW, serif', fontSize: 50 }}>
          她可以是
        </span>
        <span style={getWordStyle(colors2[idx], true)}>
          {switchWords2[idx]}
        </span>
      </div>
    </div>
  );
}

export default DesktopBack; 