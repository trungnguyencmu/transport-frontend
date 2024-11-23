import Colors from '@/constants/Colors';
import { ConfigProvider } from 'antd';
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({ children }: any) => {
  const modalStyles = {
    header: {
      padding: '1.5rem',
      borderBottom: `solid 1px ${Colors.separator}`,
    },
    body: {
      padding: '1.5rem',
    },
    mask: {
      backdropFilter: 'blur(10px)',
    },
    footer: {
      padding: '12px 24px',
      borderTop: `solid 1px ${Colors.separator}`,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: '1rem',
    },
    content: {
      boxShadow: '0 0 30px #999',
      padding: 0,
    },
  };
  return (
    <ConfigProvider
      modal={{
        styles: modalStyles,
        closeIcon: <CloseIcon />,
      }}
    >
      {children}
    </ConfigProvider>
  );
};
export { CustomModal };
