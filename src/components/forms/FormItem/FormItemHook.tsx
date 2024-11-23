import styles from './FormItemHook.module.scss';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip } from 'antd';

const FormItemHook = ({
  className,
  children,
  label,
  required,
  errors,
  showLabel = true,
  showOptionsName = false,
  infoIcon = <InfoOutlinedIcon color="secondary" sx={{ fontSize: 14 }} />,
  hint,
  isShowError = true,
  ref,
}: any) => {
  return (
    <div className={`${styles.formItem} ${className}`} ref={ref}>
      {showLabel && (
        <div className={styles.labelContent}>
          <label>
            <span>{label}</span>
            {hint && (
              <Tooltip placement="top" title={hint}>
                {infoIcon}
              </Tooltip>
            )}
          </label>
          {showOptionsName && (
            <div className={styles.requireStatus}>
              {required ? 'Required' : 'Optional'}
            </div>
          )}
        </div>
      )}
      {children}
      {isShowError && errors && errors.message && (
        <p className={styles.errors}>{errors.message}</p>
      )}
    </div>
  );
};
export default FormItemHook;
