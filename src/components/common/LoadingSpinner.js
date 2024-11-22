import React from 'react';
import { RotatingTriangles } from 'react-loader-spinner';

function LoadingSpinner() {
  return (
    <div
      style={{
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: '100vh',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '20rem',
        height: '50vh',
        width: '100%',
      }}
    >
      <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="rotating-triangles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default LoadingSpinner;
