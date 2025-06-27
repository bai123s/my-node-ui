import React, { useRef, useEffect, useState } from "react";
import backgroundImage1 from './assets/images/背景、.png';
import titleImage1 from './assets/images/整体标题1.png';
import image2 from './assets/images/image2.png';
import part1Img from './assets/images/PART·1.png';
import part2Img from './assets/images/PART·2.png';
import part3Img from './assets/images/PART·3.png';
import { useNavigate } from 'react-router-dom';

// 通用下拉选择组件
function DropdownSelect({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', width: 230 }}>
      <button
        className="cursor-pointer w-full h-12 bg-white border border-[#e6e6e6] rounded flex items-center justify-between px-4"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span className="text-neutral-500 text-[16px]">{value || placeholder}</span>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M12 14.5L17 9.5H7L12 14.5Z" fill="#484848" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-14 w-full bg-white border border-[#e6e6e6] rounded shadow z-10">
          {options.map((opt) => (
            <div
              key={opt}
              className="px-4 py-2 hover:bg-[#f3e6f9] cursor-pointer text-neutral-700 text-[16px]"
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Desktop1() {
  const titleRef = useRef(null);
  const comboRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  // 下拉选择框的选项和状态
  const [tag, setTag] = useState("");
  const [maleRole, setMaleRole] = useState("");
  const [femaleRole, setFemaleRole] = useState("");
  const tagOptions = ["先婚后爱", "破镜重圆", "青梅竹马", "追妻火葬场"];
  const maleOptions = ["大佬", "总裁", "哥哥", "少爷"];
  const femaleOptions = ["千金", "公主", "妹妹", "夫人"];
  const navigate = useNavigate();

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.transition = 'opacity 1.5s cubic-bezier(0.4,0,0.2,1)';
      titleRef.current.style.opacity = 1;
    }

    const handleScroll = () => {
      if (comboRef.current) {
        const rect = comboRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < windowHeight - 200) {
          comboRef.current.style.transition = 'opacity 1.2s cubic-bezier(0.4,0,0.2,1)';
          comboRef.current.style.opacity = 1;
        } else {
          comboRef.current.style.transition = 'opacity 0.6s';
          comboRef.current.style.opacity = 0;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 页面加载后触发渐显
    setTimeout(() => setTitleVisible(true), 50);
  }, []);

  return (
    <div className="relative w-full min-h-screen">
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
      {/* 内容层，zIndex 保证在背景之上 */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Desktop1 区域内容 */}
        <div
          className="relative w-full"
          style={{ height: "1023px", position: "relative" }}
        >
          {/* 整体标题1.png 居中 */}
          <div
            ref={titleRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: '-0.7cm',
              width: '1208.65px',
              height: '825px',
              transform: 'translateX(-50%) scale(0.9)',
              backgroundImage: `url(${titleImage1})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: titleVisible ? 1 : 0,
              transition: 'opacity 1.5s cubic-bezier(0.4,0,0.2,1)',
              // border: "2px solid red" // 可选，调试用
            }}
          />
        </div>
        {/* Desktop8 区域内容 */}
				<div
				  className="relative w-full flex justify-center items-center"
				  style={{ height: "1023px" }}
				>
				  {/* PART·1 和 消失的选择 组合体，整体居中 */}
				  <div
				    className="relative w-[1109px] h-[549px]"
				    style={{ margin: "0 auto" }}
				  >
				    {/* "PART·1" 左下角 */}
				    <div
				      ref={comboRef}
				      style={{ opacity: 0, position: 'relative', width: '100%', height: '100%' }}
				    >
				      <div
				        className="absolute left-0 bottom-0 w-[877px] h-[316px]"
				        style={{ transform: 'translate(-120px, -70px)', zIndex: 2 }}
				      >
				        <img
				          src={part1Img}
				          alt="PART·1"
				          style={{
				            width: '100%',
				            height: '100%',
				            objectFit: 'contain',
				            display: 'block',
				          }}
				        />
				      </div>
				      {/* "消失的选择" 右上角 */}
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
				        <p style={{ textAlign: "right", margin: 0 }}>消失的</p>
				        <p style={{ textAlign: "right", margin: 0 }}>选择</p>
				      </div>
				    </div>
				  </div>
				</div>
				
				{/* Desktop3 区域内容（完整 Figma 结构，整体居中） */}
				<div className="relative bg-black w-full h-[825px] flex justify-center items-center" id="node-20_98">
				  {/* image2 背景层，放在最底层 */}
				  <div
				    className="absolute"
				    style={{
				      top: '39.5px',
				      left: 0,
				      width: '100%',
				      height: 'calc(100% - 39.5px)',
				      backgroundImage: `url(${image2})`,
				      backgroundSize: 'cover',
				      backgroundPosition: 'top center',
				      backgroundRepeat: 'no-repeat',
				      filter: 'blur(2px)',
				      opacity: 1,
				      zIndex: 0,
				      pointerEvents: 'none',
				    }}
				    data-name="image 2"
				    id="node-27_754"
				  />
				  {/* 粉白渐变框，zIndex: 1 */}
				  <div
				    className="absolute left-0 top-0"
				    style={{
				      width: "100%",
				      height: "79px",
				      zIndex: 1,
				      background: "linear-gradient(180deg, #ffffff 0%, #ffe1ff 29.808%, #ffc4ff 82.692%)"
				    }}
				    id="node-27_427"
				  >

          
				  </div>
				  {/* 网站标题 */}
				  <div
				    style={{
				      position: 'absolute',
				      top: '8px',
				      left: '50%',
				      width: '420px',
				      height: '63px',
				      zIndex: 2,
				      transform: 'translateX(-50%)',
				      display: 'flex',
				      alignItems: 'center',
				      justifyContent: 'center',
				    }}
				  >
				    <div
				      style={{
				        fontFamily: 'STZhongsong, sans-serif',
				        fontWeight: 400,
				        letterSpacing: '29.7px',
				        color: '#110822',
				        fontSize: '45px',
				        lineHeight: 'normal',
				        textAlign: 'center',
				        width: '100%',
				      }}
				    >
				      女生小说网
				    </div>
				  </div>
				  {/* 下面是内容层 */}
				  <div className="relative w-[1440px] h-[880px]" style={{ top: '-50px' }}>
				    {/* 其他内容 */}
				    <div
				      style={{
				        position: 'absolute',
				        top: '8px',
				        left: '50%',
				        width: '420px',
				        height: '63px',
				        zIndex: 2,
				        transform: 'translateX(-50%)',
				        display: 'flex',
				        alignItems: 'center',
				        justifyContent: 'center',
				      }}
				    >
				      <div
				        style={{
				          fontFamily: 'STZhongsong, sans-serif',
				          fontWeight: 400,
				          letterSpacing: '29.7px',
				          color: '#110822',
				          fontSize: '45px',
				          lineHeight: 'normal',
				          textAlign: 'center',
				          width: '100%',
				        }}
				      >
				        
				      </div>
				    </div>
								
						
            <div
              className="absolute contents left-[223px] top-[261px]"
              id="node-27_584"
            >
              <div
                className="absolute h-[507px] left-[223px] top-[268px] w-[1010px]"
                id="node-20_250"
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 1010 507"
                >
                  <path
                    d="M1008.75 1.25V505.75H1.25V1.25H1008.75Z"
                    fill="var(--fill-0, #110822)"
                    id="Rectangle 2"
                    stroke="var(--stroke-0, white)"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
              <div className="absolute flex h-[67px] items-center justify-center left-[223px] top-[270px] w-[1010px]">
                <div className="flex-none scale-y-[-100%]">
                  <div
                    className="bg-gradient-to-b from-[#ffffff] h-[67px] to-[#ffc4ff] to-[63.462%] via-[#ffdeff] via-[29.808%] w-[1010px]"
                    id="node-27_589"
                  />
                </div>
              </div>
              <div
                className="absolute font-['PingFang_SC:Medium',_sans-serif] h-[68px] leading-[0] left-[1154px] not-italic text-[#ffffff] text-[50px] text-left top-[261px] w-[38px]"
                id="node-20_251"
              >
                <p className="block leading-[normal]">×</p>
              </div>
              <div
                className="absolute h-[174px] left-[382px] top-[593px] w-[391px]"
                id="node-27_428"
              >
                <div
                  className="absolute font-['PingFang_SC:Medium',_sans-serif] h-16 leading-[0] left-[-40px] not-italic text-[#ffffff] text-[32px] text-left top-3.5 w-[437px]"
                  id="node-27_429"
                >
                  <p className="block leading-[normal]">经典情节:</p>
                </div>
                <div
                  className="absolute h-[35px] left-[21px] top-[72px] w-80"
                  id="node-27_430"
                >
                  <button
                    className="absolute bg-[#ffffff] cursor-pointer left-[100px] rounded top-[-6px]"
                    data-name="tag"
                    id="node-78_604"
                  >
                    <DropdownSelect
                      options={tagOptions}
                      value={tag}
                      onChange={setTag}
                      placeholder="选择情节"
                    />
                  </button>
                  <div
                    className="absolute flex flex-col font-['PingFang_SC:Medium',_sans-serif] justify-center leading-[0] left-0 not-italic text-[#ffffff] text-[36px] text-left top-[17.5px] translate-y-[-50%] w-[88px]"
                    id="node-27_431"
                  >
                    <p className="block leading-[normal]">#tag</p>
                  </div>
                </div>
              </div>
              <div
                className="absolute h-[108px] left-[455px] top-[405px] w-[595px]"
                id="node-27_459"
              >
                <div className="absolute contents left-0 top-12" id="node-27_461">
                  <div
                    className="absolute font-['PingFang_SC:Medium',_sans-serif] h-12 leading-[0] left-0 not-italic text-[#ffffff] text-[36px] text-left top-[53px] w-[75px]"
                    id="node-27_516"
                  >
                    <p className="block leading-[normal]">♂</p>
                  </div>
                  <button
                    className="absolute bg-[#ffffff] cursor-pointer left-[370px] rounded top-[53px]"
                    data-name="女"
                    id="node-78_420"
                  >
                    <DropdownSelect
                      options={femaleOptions}
                      value={femaleRole}
                      onChange={setFemaleRole}
                      placeholder="选择女主"
                    />
                  </button>
                  <button
                    className="absolute bg-[#ffffff] cursor-pointer left-12 rounded top-[54px]"
                    data-name="男"
                    id="node-74_278"
                  >
                    <DropdownSelect
                      options={maleOptions}
                      value={maleRole}
                      onChange={setMaleRole}
                      placeholder="选择男主"
                    />
                  </button>
                  <div
                    className="absolute font-['PingFang_SC:Medium',_sans-serif] h-12 leading-[0] left-[318px] not-italic text-[#ffffff] text-[36px] text-left top-12 w-[51px]"
                    id="node-27_517"
                  >
                    <p className="block leading-[normal]">♀</p>
                  </div>
                </div>
              </div>
              <div
                className="absolute font-['PingFang_SC:Medium',_sans-serif] h-16 leading-[0] left-[340px] not-italic text-[#ffffff] text-[32px] text-left top-[402px] w-[725px]"
                id="node-27_460"
              >
                <p className="block leading-[normal]">角色称呼:</p>
              </div>
              <div
                className="absolute bg-[#ffffff] h-12 left-[1037px] top-[679px] w-[134px]"
                id="node-27_518"
              >
                <div className="absolute border border-[#363636] border-solid inset-0 pointer-events-none" />
                <div className="flex flex-row items-center justify-center relative size-full">
                  <div className="box-border content-stretch flex flex-row gap-2.5 h-12 items-center justify-center p-[10px] relative w-[134px]">
                    <div
                      className="flex flex-col font-['PingFang_SC:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2c2c2c] text-[30px] text-center text-nowrap"
                      id="node-27_519"
                      onClick={() => {
                        if (tag && maleRole && femaleRole) {
                          // 跳转并带上参数
                          navigate(`/desktop2?male=${encodeURIComponent(maleRole)}&female=${encodeURIComponent(femaleRole)}&tag=${encodeURIComponent(tag)}`);
                        } else {
                          alert('请先选择全部选项');
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <p className="block leading-[normal] whitespace-pre">确认</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
							  className="absolute"
							  style={{
							    top: "278px",
							    left: "673px",
							    // width: "92px", // 先注释掉或去掉
							    fontFamily: "HYXinRenWenSongW, sans-serif",
							    fontWeight: 400,
							    letterSpacing: "20.4px",
							    color: "#110822",
							    fontSize: "34px",
							    lineHeight: "normal",
							    textAlign: "left"
							  }}
							>
							  搜索
							</div>

              
            </div>
            <div
              className="absolute font-['PingFang_SC:Medium',_sans-serif] h-[61px] leading-[0] left-[223px] not-italic text-[#ffffff] text-[24px] text-left top-[809px] w-[809px]"
              id="node-18_5"
            >
              <p className="block leading-[normal]">
                * 下拉选择标签，点击确认查找你想看的小说吧！
              </p>
            </div>
            <div
              className="absolute contents left-[328px] top-[166px]"
              id="node-27_585"
            >
            
                     
						<div
						  className="absolute"
						  style={{
						    top: "166px",
						    left: "328px",
						    // width: "829px", // 先注释掉或去掉
						    fontFamily: "STZhongsong, sans-serif",
						    fontWeight: 400,
						    letterSpacing: "24.38px",
						    color: "#f9feea",
						    fontSize: "46px",
						    lineHeight: "normal",
						    textAlign: "left"
						  }}
						>
						  全世界最好看的女频小说！
						</div>
						
						
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desktop1;