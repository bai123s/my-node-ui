import React, { useState } from "react";
import backgroundImage1 from './assets/images/背景、.png';
import P9_2 from './P9_2';

function DesktopBack({ children }) {
  const [page, setPage] = useState(1);

  return (
    <div className="relative w-full min-h-screen" style={{ overflow: 'hidden' }}>
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
        overflowY: 'auto',
        height: page === 1 ? 1675 : 940
      }}>
        {/* 主内容区域 */}
        <div
          style={{
            width: '100%',
            background: 'black',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 只在第一页显示P8和P9-1 */}
          {page === 1 && (
            <>
              {/* P8区块 */}
              <div style={{
                width: 1440,
                height: 735,
                margin: '0 auto',
                background: 'transparent',
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
                  fontWeight: 500,
                  fontSize: 24,
                  boxSizing: 'border-box',
                  textAlign: 'left',
                  letterSpacing: 0,
                }}>
                  <div style={{ height: 68, display: 'flex', alignItems: 'center', width: '100%' }}>
                    任汐入职的这段时间，关键词包几乎没有变过。
                  </div>
                  <div style={{ height: 100, display: 'flex', alignItems: 'center', width: '100%' }}>
                    任汐的工作几乎完全是数据导向的，脱离文本内容。她的工作样态是整个女频网文市场样态的缩影。"人文价值"与"利益至上"之间，市场毫不犹豫地选择了后者，并且搭建起一整套运营机制，不断挤压"人文价值"的生存空间。
                  </div>
                  <div style={{ height: 68, display: 'flex', alignItems: 'center', width: '100%' }}>
                    在这套运营机制中，市场评判一部网文的标准是抽象数据而非具体内容。
                  </div>
                  <div style={{ height: 68, display: 'flex', alignItems: 'center', width: '100%' }}>
                    在入职面试时，任汐就被告知：用户的价值提升是由"平台导流"带来的，而不是用户本身就具有高价值属性。换言之，内容不重要，数据的操作和表现才重要。
                  </div>
                </div>
              </div>
              {/* P9-1区块 */}
              <div
                style={{
                  width: 1440,
                  height: 940,
                  margin: '0 auto',
                  background: '#000',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                {/* 顶部说明 */}
                <div style={{
                  width: 960,
                  margin: '0 auto',
                  color: '#fff',
                  fontFamily: 'PingFang SC, sans-serif',
                  fontWeight: 500,
                  fontSize: 24,
                  textAlign: 'left',
                  position: 'absolute',
                  top: 133.69,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}>
                  数据在版权评估中是绕不开的话题。不管是平台方还是影视公司，都认同好的数据表现对于IP是加分的。
                </div>
                {/* 主内容卡片 */}
                <div style={{
                  width: 960,
                  height: 394,
                  background: '#2d2d2d',
                  borderRadius: 20,
                  border: '1.5px solid #fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center', // 整体上下居中
                  boxSizing: 'border-box',
                }}>
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
                  }}>
                    <p style={{ margin: 0 }}>业内人士称，截至2023年，行业有两种方式去做第一阶段的IP评估。</p>
                    <p style={{ margin: 0 }}>
                      <span>其一是考量原著在</span>
                      <span style={{ color: '#ffc3ff' }}>站内平台</span>
                      <span>的</span>
                      <span style={{ color: '#ffc4ff' }}>多维度数据</span>
                      <span>；</span>
                    </p>
                    <p style={{ margin: 0 }}>
                      <span>其二是去参考</span>
                      <span style={{ color: '#ffc3ff' }}>过往的成功经验</span>
                      <span>，"如果某知名作者此前有过成功的影视化作品，那他其他作品天然在评估中更具优势。" </span>
                    </p>
                  </div>
                </div>
                {/* Group 57 精确还原 */}
                <div
                  style={{
                    position: 'absolute',
                    left: 'calc(50% + 0.5px)',
                    top: 727,
                    transform: 'translateX(-50%)',
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                >
                  {/* 说明文字 */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 317.5,
                      top: 68,
                      transform: 'translateX(-50%)',
                      fontFamily: 'PingFang SC, sans-serif',
                      fontWeight: 500,
                      fontSize: 15,
                      color: '#fff',
                      textAlign: 'center',
                      whiteSpace: 'pre',
                    }}
                  >
                    <div>数据表现是</div>
                    <div>IP价值的评估依据</div>
                  </div>
                  {/* SVG 图形1 */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 477,
                      top: 0,
                      width: 709,
                      height: 23,
                    }}
                  >
                    <img
                      src="http://localhost:3845/assets/bb6ebf98286e2fa9ebfc391a151e0cb77a087639.svg"
                      alt="数据表现图形1"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  {/* SVG 图形2 */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 429,
                      top: 57,
                      width: 709,
                      height: 23,
                    }}
                  >
                    <img
                      src="http://localhost:3845/assets/bb6ebf98286e2fa9ebfc391a151e0cb77a087639.svg"
                      alt="数据表现图形2"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  {/* 分叉线1 */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 255,
                      top: 29.6,
                      width: 73,
                      height: 23,
                    }}
                  >
                    <img
                      src="http://localhost:3845/assets/4b5ff7a8011edda3b0a50bd8c34d90c12cea21a7.svg"
                      alt="分叉线"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  {/* 分叉线2 */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 336,
                      top: 11,
                      width: 129,
                      height: 58.917,
                    }}
                  >
                    <img
                      src="http://localhost:3845/assets/c3eca07c3b9f2000ca8b9633e44c0b88073fabed.svg"
                      alt="分叉线2"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
                {/* frame57箭头区域，绝对定位在P9区域上下居中，允许与主内容卡片重叠 */}
                <div
                  style={{
                    width: 1212,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'Microsoft YaHei, sans-serif',
                    fontWeight: 300,
                    fontSize: 80,
                    color: '#fff',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                >
                  <div style={{ width: 113, height: 105, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>＜</div>
                  <div
                    style={{ width: 113, height: 105, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', pointerEvents: 'auto' }}
                    onClick={() => setPage(2)}
                  >
                    ＞
                  </div>
                </div>
              </div>
            </>
          )}
          {/* 只在第二页显示P9-2 */}
          {page === 2 && <P9_2 />}
        </div>
      </div>
    </div>
  );
}

export default DesktopBack; 