import {
  InformationCircleIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { DEFAULT_TITLE } from "@/lib/constants";
import { NUM_MOVES } from "@/lib/constants";

import { motion } from "framer-motion";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Header = () => {
  let [infoModal, setInfoModal] = useState(true);
  let [statsModal, setStatsModal] = useState(false);
  let [gearModal, setGearModal] = useState(false);

  return (
    <div className="flex w-full flex-start p-4 shadow-sm justify-between mb-8">
      <div className="text-green-500">{DEFAULT_TITLE}</div>
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
        <Cog6ToothIcon
          height={24}
          width={24}
          className="text-gray-600 hover:text-gray-800 hover:cursor-pointer"
          onClick={() => {
            setGearModal(true);
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
                      Can you match all eight songs in twenty tries?
                    </p>
                  </div>
                  <h3 className="text-md">How to Play</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Click on a square to play a short clip from a song.
                    Selecting two clips from the same song will clear the
                    matching squares from the grid.
                  </p>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Stats
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500"></p>
                  </div>
                  <h3 className="text-md">Songs Guessed</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Click on a square to play a short clip from a song.
                    Selecting two clips from the same song will clear the
                    matching squares from the grid.
                  </p>
                  <h3 className="text-md">Songs Missed</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Click on a square to play a short clip from a song.
                    Selecting two clips from the same song will clear the
                    matching squares from the grid.
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      Go to Playlist
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={gearModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setGearModal(false)}
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
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Got it, thanks!
                    </button>
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
