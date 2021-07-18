import { List, Card, Typography } from 'antd';
import { FolderTwoTone } from '@ant-design/icons';

import type { Dir } from '../../types';

const { Text } = Typography;

export interface DirsListProps {
  dirs: Dir[];
  onClick?: (dir: Dir) => void;
}

export default function DirsList({
  dirs = [],
  onClick = () => {},
}: DirsListProps) {
  if (!dirs.length) {
    return null;
  }

  return (
    <div className="DirList">
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4,
        }}
        dataSource={dirs}
        renderItem={item => (
          <List.Item
            title={item.name}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick(item);
            }}
          >
            <Card title={<><FolderTwoTone /> {item.name}</>}>
              <Text type={item.songs.length === 0 ? "secondary" : undefined}>
                {item.songs.length === 0 && <>Contains no songs</>}
                {item.songs.length === 1 && <>Contains 1 song</>}
                {item.songs.length > 1 && <>Contains {item.songs.length} songs</>}
              </Text>
            </Card>
          </List.Item>
        )}
      />

      <style jsx>{`
        .DirList {
          padding: 16px;
        }
      `}</style>
    </div>
  );
}
