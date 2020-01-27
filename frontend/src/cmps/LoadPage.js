import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function pageLoading() {
  return (
    <div className="loading-page flex column align-center justify-center">
      <h2 className="uppercase"> just a moment :)</h2>
      <CircularProgress />
    </div>
  );
}