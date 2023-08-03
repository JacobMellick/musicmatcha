import {
  InformationCircleIcon,
  ChartBarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { DEFAULT_TITLE } from "@/lib/constants";

import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Card from "../cards/Card";
import { Track } from "@/types/proj01";

type HeaderProps = {
  started: boolean;
  recorded: boolean;
  solved: Track[];
  wins: number;
  plays: number;
  streak: number;
};

const Header = ({
  started,
  recorded,
  solved,
  wins,
  plays,
  streak,
}: HeaderProps) => {
  let [infoModal, setInfoModal] = useState(false);
  let [statsModal, setStatsModal] = useState(false);
  let [showSolved, setShowSolved] = useState(false);

  useEffect(() => {
    if (recorded) {
      setStatsModal(true);
    } else if (!started) {
      setInfoModal(true);
    }
  }, []);

  useEffect(() => {
    if (solved.length !== 0) {
      setShowSolved(true);
    }
  }, [statsModal]);

  return (
    <div className="flex w-full flex-start p-4 shadow-sm justify-between mb-4">
      <div className="text-green-500 font-bold">{DEFAULT_TITLE}</div>
      <div className="flex space-x-2">
        <InformationCircleIcon
          height={24}
          width={24}
          className="text-gray-600 hover:text-gray-800 hover:cursor-pointer"
          onClick={() => {
            setInfoModal(true);
          }}
        />
        <ChartBarIcon
          height={24}
          width={24}
          className="text-gray-600 hover:text-gray-800 hover:cursor-pointer"
          onClick={() => {
            setStatsModal(true);
          }}
        />
      </div>

      <Transition appear show={infoModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setInfoModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Welcome to musicmatcha!
                  </Dialog.Title>
                  <div className="mt-2 mb-4">
                    <p className="text-sm text-gray-500">
                      Your daily music matching game.
                    </p>
                  </div>
                  <h3 className="text-lg font-medium">How to Play</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Click on a tile to play a short clip from a track. Selecting
                    two clips from the same track will clear the matching tiles
                    from the grid.
                  </p>
                  <div className="pt-2">
                    <p className="text-sm text-gray-500 mt-1">
                      ⚠️- <span className="italic">THIS GAME PLAYS AUDIO</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      🗣️ -{" "}
                      <span className="italic">
                        MAY CONTAIN EXPLICIT LYRICS
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => setInfoModal(false)}
                    >
                      Play
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={statsModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setStatsModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <XMarkIcon
                    height={18}
                    width={18}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-600 hover:cursor-pointer"
                    onClick={() => {
                      setStatsModal(false);
                    }}
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Stats
                  </Dialog.Title>
                  <div className="flex mt-2 px-8 sm:px-24 justify-between mb-2 text-center">
                    <div>
                      <div className="text-xl">{plays}</div>
                      <div className="text-xs">Played</div>
                    </div>
                    <div>
                      <div className="text-xl">
                        {plays > 0
                          ? Math.round((wins / plays) * 100) + "%"
                          : "0%"}
                      </div>
                      <div className="text-xs">Winrate</div>
                    </div>
                    <div>
                      <div className="text-xl">{streak}</div>
                      <div className="text-xs">Streak</div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Header;
