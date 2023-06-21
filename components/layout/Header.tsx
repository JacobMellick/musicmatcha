import {
  InformationCircleIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <div className="flex w-full p-4 border-b-2 justify-between">
      <div className="text-orange-500">musicmatch</div>
      <div className="flex space-x-2">
        <InformationCircleIcon
          height={24}
          width={24}
          className="text-gray-600 hover:text-gray-800 hover:cursor-pointer"
        />
        <ChartBarIcon
          height={24}
          width={24}
          className="text-gray-600 hover:text-gray-800 hover:cursor-pointer"
        />
        <Cog6ToothIcon
          height={24}
          width={24}
          className="text-gray-600 hover:text-gray-800 hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
