import { ReactNode } from "react";
import { FilterState, RemoveFilterTagFn } from "./../hooks/useJobs";

interface FilterTagsProps {
  filterItems: FilterState;
  clearFilter: () => void;
  removeFilterTag: RemoveFilterTagFn;
}

const FilterTags = ({
  filterItems,
  clearFilter,
  removeFilterTag,
}: FilterTagsProps) => {
  if (!Object.values(filterItems).some((filter) => filter.length > 0)) {
    return null;
  }

  const filterTags = (() => {
    let result: ReactNode = [];

    for (const key in filterItems) {
      result = [
        ...result,
        ...filterItems[key as keyof FilterState].map((item) => (
          <li key={item}>
            <button
              onClick={() => removeFilterTag(key as keyof FilterState, item)}
              className="font-bold flex group  shadow-sm overflow-hidden rounded-md hover:bg-primary-cyan h-7 hover:text-filter-light transition text-primary-cyan bg-[#E3F7FD]"
            >
              <span className="px-2 py-1">{item}</span>
              <span className=" group-hover:bg-text-dark bg-primary-cyan px-2 h-full transition grid place-content-center ">
                <img
                  className="max-w-full"
                  src="/images/icon-remove.svg"
                  alt="remove icon"
                />
              </span>
            </button>
          </li>
        )),
      ];
    }

    return result;
  })();

  return (
    <div className="container ">
      <div className="translate-y-1/2 bg-filter-light py-5 px-8 rounded-md shadow-cyan gap-x-3 gap-y-6 flex flex-wrap-reverse">
        <ul className="flex gap-3 flex-wrap items-center">{filterTags}</ul>

        <button
          onClick={clearFilter}
          className="underline ms-auto text-primary-cyan font-medium text-lg"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterTags;
