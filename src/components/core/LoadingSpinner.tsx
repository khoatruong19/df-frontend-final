import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#191717', '#7D7C7C', '#B4B4B3', '#040D12', '#849b87']}
    />
  );
};

export default LoadingSpinner;
