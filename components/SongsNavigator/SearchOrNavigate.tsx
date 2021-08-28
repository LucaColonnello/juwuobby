import { memo, ReactElement, ReactNode } from "react";
import { Menu, Input } from "antd";
import { useAtom } from "jotai";

import Header from "./Header";
import CurrentDirNavigableList from "./CurrentDirNavigableList";
import { currentSearchAtom, searchResultsAtom } from "./state";

import type { Song } from "../../types";
import SongsList from "./SongsList";

const { Search } = Input;

export interface SearchOrNavigateProps {
  onSongClick?: (song: Song) => void;
  onSongDoubleClick?: (song: Song) => void;
  getSongActions?: (song: Song) => ReactNode[];
  getSongContextMenu?: (song: Song) => ReactElement<Menu>;
}

function SearchOrNavigate({
  onSongClick = () => {},
  onSongDoubleClick = () => {},
  getSongActions,
  getSongContextMenu,
}: SearchOrNavigateProps) {
  const [search, setSearch] = useAtom(currentSearchAtom);
  const [searchResults] = useAtom(searchResultsAtom);

  const onSearch = (search) => {
    setSearch(search.trim());
  };
  const onSearchChange = (e) => {
    if (e.target.value.trim() === "") {
      setSearch("");
    }
  };

  return (
    <>
      <div className="SearchInputContainer">
        <Search
          placeholder="Search for a song"
          allowClear
          enterButton
          size="large"
          onSearch={onSearch}
          onChange={onSearchChange}
        />
      </div>

      {(search !== "" && searchResults) && (
        <SongsList
          songs={searchResults}
          onClick={onSongClick}
          onDoubleClick={onSongDoubleClick}
          getActions={getSongActions}
          getContextMenu={getSongContextMenu}
        />
      )}

      {search === "" && (
        <>
          <Header />

          <CurrentDirNavigableList
            onSongClick={onSongClick}
            onSongDoubleClick={onSongDoubleClick}
            getSongActions={getSongActions}
            getSongContextMenu={getSongContextMenu}
          />
        </>
      )}

      <style jsx>{`
        .SearchInputContainer {
          padding: 16px;
        }
      `}</style>
    </>
  );
}

export default memo(SearchOrNavigate);
