// ========== App.tsx ==========

import { ConfigProvider, theme } from 'antd';
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';

export default () => {

    const {isDark} = useContext(ThemeContext);
  const configProps = { theme: { algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm } };
  return (
    <ConfigProvider {...configProps}>
      {/* Your App */}
    </ConfigProvider>
  );
};