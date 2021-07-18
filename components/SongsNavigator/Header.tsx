import { useAtomValue, useUpdateAtom } from "jotai/utils";

import { PageHeader } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { currentDirAtom, navigateBackAtom, navigationHistoryAtom } from "./state";

export default function Header() {
  const currentDir = useAtomValue(currentDirAtom);
  const navigationHistory = useAtomValue(navigationHistoryAtom);
  const navigateBack = useUpdateAtom(navigateBackAtom);

  if (currentDir === null) {
    return null;
  }

  const canGoBack = navigationHistory.length > 1;

  const onBack = () => {
    if (canGoBack) {
      navigateBack();
    }
  };


  return (
    <PageHeader
      backIcon={<ArrowLeftOutlined style={{ color: canGoBack ? "#000" : "#eee" }} />}
      onBack={onBack}
      title={currentDir.name}
    />
  );
}
