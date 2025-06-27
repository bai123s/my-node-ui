import React, { useEffect, useState } from 'react';
import image2 from './assets/images/image2.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Papa from 'papaparse';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Desktop2() {
  const navigate = useNavigate();
  const query = useQuery();
  const male = query.get('male');
  const female = query.get('female');
  const tag = query.get('tag');
  const [novel, setNovel] = useState(null);

  useEffect(() => {
    Papa.parse(process.env.PUBLIC_URL + '/标签简介2.CSV', {
      download: true,
      header: false,
      complete: (results) => {
        const found = results.data.find(row =>
          row[1] === male && row[2] === female && row[3] === tag
        );
        if (found) {
          setNovel({
            index: found[0],
            male: found[1],
            female: found[2],
            tag: found[3],
            title: found[4],
            desc: found[5],
          });
        } else {
          setNovel(null);
        }
      }
    });
  }, [male, female, tag]);

  if (!novel) return <div style={{ color: '#fff' }}>未找到对应小说，请返回重新选择。</div>;

  const coverImg = require(`./assets/images/封面/fengmian${novel.index}.jpg`);

  return (
    <div className="relative w-full bg-black flex flex-col items-center justify-center overflow-x-hidden" id="node-28_762" style={{ left: 0, minHeight: '100dvh' }}>
      {/* 背景虚化图 */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-cover blur-[2px] filter"
        style={{
          backgroundImage: `url(${image2})`,
          opacity: 1,
          zIndex: 0,
        }}
        data-name="image 2"
        id="node-28_763"
      />
      {/* 渐变条 */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: '79px',
          background: 'linear-gradient(180deg, #ffffff 0%, #ffe1ff 29.808%, #ffc4ff 82.692%)',
          zIndex: 1,
        }}
        id="node-28_767"
      />
      {/* 网站标题 */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '8px',
          width: '500px',
          height: '63px',
          transform: 'translateX(-50%)',
          color: '#110822',
          fontFamily: 'STZhongsong, serif',
          fontSize: '45px',
          letterSpacing: '29.7px',
          textAlign: 'center',
          zIndex: 2,
          whiteSpace: 'nowrap'
        }}
        id="node-28_768"
      >
        <p style={{ margin: 0 }}>女生小说网</p>
      </div>
      {/* 内容主框 */}
      <div className="relative w-full flex justify-center items-start mt-[60px]" id="node-28_769" style={{ zIndex: 2, transform: 'scale(0.8)' }}>
        {/* 深色主内容框 */}
        <div
          className="relative w-full max-w-[1259px] mx-auto"
          style={{
            background: '#110822',
            border: '2.5px solid #fff',
            boxSizing: 'border-box',
            minHeight: '790px',
          }}
          id="node-28_770"
        >
          {/* 顶部渐变条 */}
          <div
            className="w-full"
            style={{
              height: '71.219px',
              background: 'linear-gradient(180deg, #ffffff 0%, #ffe1ff 29.808%, #ffc4ff 82.692%)',
            }}
            id="node-28_771"
          />
          {/* 关闭按钮 */}
          <div
            className="absolute"
            style={{
              right: '1.6px',
              top: '1.6px',
              width: '38px',
              height: '68px',
              color: '#fff',
              fontFamily: 'PingFang SC, sans-serif',
              fontSize: '50px',
              textShadow: '2px 4px 4px rgba(0,0,0,0.25)',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              marginRight: '0.5cm',
              cursor: 'pointer',
            }}
            id="node-33_953"
            onClick={() => navigate('/demopage')}
          >
            <p style={{ margin: 0 }}>×</p>
          </div>
          {/* 点击查看更多 */}
          <div
            className="absolute"
            style={{
              right: '-23px',
              top: '-40px',
              width: '125px',
              height: '55px',
              color: '#fff',
              fontFamily: 'PingFang SC, sans-serif',
              fontSize: '20px',
              textAlign: 'center',
              transform: 'translateX(0%)',
              textShadow: '2px 4px 4px rgba(0,0,0,0.25)',
              zIndex: 3,
            }}
            id="node-179_242"
          >
            <p style={{ margin: 0 }}>点击查看更多</p>
            <p style={{ margin: 0 }}>↓</p>
          </div>
          {/* 小说标题 */}
          <div
            className="w-full flex justify-center"
            style={{
              marginTop: '40px',
              marginLeft: '6.5cm',
              color: '#ffe5ff',
              fontFamily: 'STZhongsong, serif',
              fontSize: '37px',
              letterSpacing: '0px',
              zIndex: 3,
            }}
            id="node-28_936"
          >
            <p style={{ margin: 0 }}>{novel.title}</p>
          </div>
          {/* 小说简介 */}
          <div
            className="w-full flex justify-center"
            style={{
              marginTop: '50px',
              marginLeft: '6cm',
              color: '#fff',
              fontFamily: 'PingFang SC, sans-serif',
              fontSize: '24px',
              textAlign: 'justify',
              zIndex: 3,
              lineHeight: '1.5',
            }}
            id="node-33_942"
          >
            <div style={{ maxWidth: '561px' }}>
              <p style={{ margin: 0, marginBottom: '18px' }}>简介：</p>
              {(novel.desc || '')
                .split(/(?<=[。！!])(?!(”|」|』|’|"))/)
                .filter(line => typeof line === 'string' && line.trim() !== '')
                .map((line, idx) => (
                  <p key={idx} style={{ margin: 0, marginBottom: '18px'}}>{line}</p>
                ))}
            </div>
          </div>
          {/* 封面图 */}
          <div
            className="absolute bg-center bg-cover bg-no-repeat"
            style={{
              left: '30px',
              top: 'calc(50% + 0.9cm)',
              width: '510px',
              height: '672px',
              backgroundImage: `url(${coverImg})`,
              zIndex: 2,
              transform: 'translateY(-50%) scale(0.9)',
            }}
            data-name="cover1"
            id="node-33_941"
          />
        </div>
      </div>
    </div>
  );
}

export default Desktop2; 