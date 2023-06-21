import {
  InformationCircleIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";
import { Dialog } from "@headlessui/react";

const Header = () => {
  let [infoModal, setInfoModal] = useState(false);
  let [statsModal, setStatsModal] = useState(false);
  let [gearModal, setGearModal] = useState(false);

  return (
    <div className="flex w-full p-4 shadow-sm justify-between">
      <div className="text-orange-500">musicmatch</div>
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
      <Dialog
        open={infoModal}
        onClose={() => setInfoModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4">
            <div className="flex justify-between">
              <Dialog.Title className="text-2xl font-bold pb-2">
                How to Play
              </Dialog.Title>
              <XMarkIcon
                className="text-gray-500 w-8 h-8 hover:cursor-pointer"
                onClick={() => setInfoModal(false)}
              />
            </div>

            <p className="pb-4">Match the music!</p>
          </Dialog.Panel>
        </div>
      </Dialog>
      <Dialog
        open={gearModal}
        onClose={() => setGearModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4">
            <div className="flex justify-between">
              <Dialog.Title className="text-2xl font-bold pb-2">
                Settings
              </Dialog.Title>
              <XMarkIcon
                className="text-gray-500 w-8 h-8 hover:cursor-pointer"
                onClick={() => setGearModal(false)}
              />
            </div>

            <p className="pb-4">Settings n stuff</p>
          </Dialog.Panel>
        </div>
      </Dialog>
      <Dialog
        open={statsModal}
        onClose={() => setStatsModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4">
            <div className="flex justify-between">
              <Dialog.Title className="text-2xl font-bold pb-2">
                Stats
              </Dialog.Title>
              <XMarkIcon
                className="text-gray-500 w-8 h-8 hover:cursor-pointer"
                onClick={() => setStatsModal(false)}
              />
            </div>

            <p className="pb-4">These are your stats</p>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Header;
