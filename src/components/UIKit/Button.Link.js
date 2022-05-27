import React from 'react';
import {theme} from '../../utils/uiConst';
import {Button} from 'antd';

export const ButtonLink = ({title, action}) => {
  return (
    <Button
      htmlType="submit"
      type="link"
      style={{color: theme.default.greyBlue}}
      onClick={action}
    >
      {title}
    </Button>
  );
};
