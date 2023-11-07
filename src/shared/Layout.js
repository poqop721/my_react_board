// src/shared/Layout.js

import React from 'react';

const HeaderStyles = {
  width: '100%',
  background: '#575757',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '20px',
  color: 'white',
  fontWeight: '600',
  fontSize:'1.4rem',
  boxShadow:'1px 4px 10px 1px #868686'
};
const FooterStyles = {
  width: '100%',
  height: '50px',
  display: 'flex',
  background: '#575757',
  color: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
};

const layoutStyles = {
  display: 'flex',
	flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '90vh',
}

function Header() {
  return (
    <div style={{ ...HeaderStyles }}>
      <span>게시판</span>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ ...FooterStyles }}>
      <span>copyright SeungTae Jeon</span>
    </div>
  );
}


function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{...layoutStyles}}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;