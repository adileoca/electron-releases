import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/context/global";

const ViewHeaderNavigation = () => {
  const navigate = useNavigate();

  const {
    state: { navigation },
    actions: { navigation: navigationActions },
  } = useGlobalContext();

  useEffect(() => {
    navigationActions.setCanGoBack(window.history.state?.idx > 0);
    navigationActions.setCanGoForward(
      window.history.state?.idx < navigation.latestIndex
    );
  }, []);

  useEffect(() => {
    console.log("history current index", window.history.state.idx);
    console.log("history latest index", navigation.latestIndex);
    if (window.history.state.idx > navigation.latestIndex) {
      console.log("history setting new latest index", window.history.state.idx);
      navigationActions.setLatestIndex(window.history.state.idx);
    }
  }, [window.history.state]);

  const goBack = () => {
    if (navigation.canGoBack) navigate(-1);
  };

  const goForward = () => {
    if (navigation.canGoForward) navigate(1);
  };

  return (
    <div className="flex items-center space-x-1 pr-3">
      <button
        onClick={goBack}
        disabled={!navigation.canGoBack}
        className=" text-white/80 p-1 pl-0.5 hover:text-white disabled:text-white/40"
      >
        <ChevronLeftIcon className="size-5 stroke-2" />
      </button>
      <button
        onClick={goForward}
        disabled={!navigation.canGoForward}
        className=" text-white/80 p-1 hover:text-white disabled:text-white/40"
      >
        <ChevronRightIcon className="size-5 stroke-2" />
      </button>
    </div>
  );
};

export default ViewHeaderNavigation;
