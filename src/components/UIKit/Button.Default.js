import React from 'react';
import {theme} from '../../utils/uiConst';
import {Button} from 'antd';

export const ButtonDefault = ({title}) => {
  return (
    <Button
      htmlType="submit"
      type="link"
      block
      style={{color: theme.default.greyBlue}}
    >
      {title}
    </Button>
  );
};
