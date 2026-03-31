import { useState } from "react";
import AppModal from "../../components/common/AppModal";

type Props = {};

const Dashboard = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <AppModal
        bg={"red"}
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        Hello bay
      </AppModal>
    </div>
  );
};

export default Dashboard;
