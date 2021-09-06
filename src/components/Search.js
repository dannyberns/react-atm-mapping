import React, { useEffect, useContext } from "react";
import { useImmer } from "use-immer";
import DispatchContext from "../DispatchContext";
import Filter from "./Filter";

// Icons
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdClear } from "react-icons/md";

function Search() {
  const appDispatch = useContext(DispatchContext);
  const [state, setState] = useImmer({
    isFilterList: false,
    requestCount: 0,
    results: [],
    searchTerm: ""
  });

  useEffect(() => {
    // show some loading
    const delay = setTimeout(() => {
      setState(draft => {
        draft.requestCount++;
      });
    }, 750);

    return () => clearTimeout(delay);
  }, [state.searchTerm]);

  useEffect(() => {
    if (state.requestCount) {
      appDispatch({ type: "updateSearchTerm", value: state.searchTerm });
    }
  }, [state.requestCount]);

  function handleClick() {
    setState(draft => {
      draft.isFilterList = !draft.isFilterList;
    });
  }

  function handleInput(e) {
    const value = e.target.value;
    setState(draft => {
      draft.searchTerm = value;
    });
  }

  function handleClear() {
    setState(draft => {
      draft.searchTerm = "";
    });
  }

  return (
    <div className="search">
      <button type="button" className="filter-button" onClick={handleClick}>
        {state.isFilterList ? (
          <FaCaretRight className="arrow-icon" />
        ) : (
          <FaCaretLeft className="arrow-icon" />
        )}{" "}
        סינון
      </button>

      <input
        type="text"
        dir="rtl"
        placeholder="עיר / רחוב"
        className="search-bar"
        value={state.searchTerm}
        onChange={handleInput}
      />

      {state.searchTerm.trim() ? (
        <button className="clear-button" onClick={handleClear}>
          <MdClear />
        </button>
      ) : (
        <button className="search-button">
          <BiSearchAlt2 />
        </button>
      )}

      {state.isFilterList && <Filter />}
    </div>
  );
}

export default Search;
