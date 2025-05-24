import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

export default function LoadingButtonExample() {
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleShowMore = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
پ    }, 2000); 
  };

  return (
    <LoadingButton
      onClick={handleShowMore}
      loading={buttonLoading}
      loadingIndicator="در حال بارگذاری..."
      variant="outlined"
      disabled={buttonLoading}
      className="mt-4 px-6 py-2 rounded-lg"
    >
      نمایش بیشتر
    </LoadingButton>
  );
}
