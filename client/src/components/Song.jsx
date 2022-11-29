import React from 'react';

var Song = function(props) {
  console.log(props)
  return (
    <div className='song'>
      {JSON.stringify(props)}
    </div>
  )
};

export default Song;