import React from 'react';
import {theme} from '../../utils/uiConst';
import {Button} from 'antd';

export const ButtonPrimary = ({title, action}) => {
  return (
    <Button
      htmlType="submit"
      type="primary"
      block
      style={{background: theme.default.greyBlue, border: 'none'}}
      onClick={action}
    >
      {title}
    </Button>
  );
};
