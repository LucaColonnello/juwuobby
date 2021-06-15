import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

export const LoadingSpinnerIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function LoadingSpinner() {
  return (
    <div className="Loading">
        <section>
          <Spin indicator={LoadingSpinnerIcon} />
        </section>
        <style jsx>{`
          .Loading {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
  );
}