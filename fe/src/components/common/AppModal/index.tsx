import { Modal, type ModalProps } from "antd";

type AppModalProps = ModalProps & {
  bg?: string;
};

const AppModal: React.FC<AppModalProps> = ({ children, ...rest }) => {
  return (
    <Modal centered destroyOnHidden mask={{ closable: false }} {...rest}>
      {children}
    </Modal>
  );
};

export default AppModal;
