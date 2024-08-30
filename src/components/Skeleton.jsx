import { styles } from "../assets/style";

const Skeleton = () => {
  return (
    <div
      role="status"
      className={`my-0 w-full animate-pulse divide-y divide-[#bab6d3] ${styles["bg-component"]} rounded p-4 md:p-6 `}
    >
      <div className="flex h-[10vh] items-center justify-between">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-[#bab6d3]"></div>
          <div className="h-2 w-32 rounded-full bg-[#bab6d3] "></div>
        </div>
        <div className="h-2.5 w-12 rounded-full  bg-[#bab6d3]"></div>
      </div>
      <div className="flex h-[10vh] items-center justify-between">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-[#bab6d3]"></div>
          <div className="h-2 w-32 rounded-full bg-[#bab6d3] "></div>
        </div>
        <div className="h-2.5 w-12 rounded-full  bg-[#bab6d3]"></div>
      </div>
      <div className="flex h-[10vh] items-center justify-between">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-[#bab6d3]"></div>
          <div className="h-2 w-32 rounded-full bg-[#bab6d3] "></div>
        </div>
        <div className="h-2.5 w-12 rounded-full  bg-[#bab6d3]"></div>
      </div>
      <div className="flex h-[10vh] items-center justify-between">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-[#bab6d3]"></div>
          <div className="h-2 w-32 rounded-full bg-[#bab6d3] "></div>
        </div>
        <div className="h-2.5 w-12 rounded-full  bg-[#bab6d3]"></div>
      </div>
      <div className="flex h-[10vh] items-center justify-between">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-[#bab6d3]"></div>
          <div className="h-2 w-32 rounded-full bg-[#bab6d3] "></div>
        </div>
        <div className="h-2.5 w-12 rounded-full  bg-[#bab6d3]"></div>
      </div>
      <div className="flex h-[10vh] items-center justify-between">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-[#bab6d3]"></div>
          <div className="h-2 w-32 rounded-full bg-[#bab6d3] "></div>
        </div>
        <div className="h-2.5 w-12 rounded-full  bg-[#bab6d3]"></div>
      </div>
      <div className="flex h-[10vh] items-center justify-between">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-[#bab6d3]"></div>
          <div className="h-2 w-32 rounded-full bg-[#bab6d3] "></div>
        </div>
        <div className="h-2.5 w-12 rounded-full  bg-[#bab6d3]"></div>
      </div>
      <div className="flex h-[10vh] items-center justify-between">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-[#bab6d3]"></div>
          <div className="h-2 w-32 rounded-full bg-[#bab6d3] "></div>
        </div>
        <div className="h-2.5 w-12 rounded-full  bg-[#bab6d3]"></div>
      </div>
      <div className="flex h-[10vh] items-center justify-between">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-[#bab6d3]"></div>
          <div className="h-2 w-32 rounded-full bg-[#bab6d3] "></div>
        </div>
        <div className="h-2.5 w-12 rounded-full  bg-[#bab6d3]"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
