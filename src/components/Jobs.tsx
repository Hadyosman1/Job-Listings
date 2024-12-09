import useJobs from "../hooks/useJobs";
import FilterTags from "./FilterTags";

const Jobs = () => {
  const {
    filter,
    isLoading,
    filteredJobs,
    setToFilter,
    clearFilter,
    removeFilterTag,
  } = useJobs();

  return (
    <main>
      <header className="header flex items-end min-h-28">
        <FilterTags
          filterItems={filter}
          clearFilter={clearFilter}
          removeFilterTag={removeFilterTag}
        />
      </header>

      <div className="container py-16">
        {isLoading && (
          <p className="animate-pulse text-2xl text-center text-text-gray">
            Loading...
          </p>
        )}

        {!isLoading && filteredJobs.length === 0 && (
          <p className="animate-pulse text-2xl text-center text-text-gray">
            There Are No Jobs...
          </p>
        )}

        <ul>
          {filteredJobs.map((job) => (
            <li key={job.id}>
              <article
                className={`flex relative gap-6 items-center bg-filter-light p-8 rounded-md shadow-cyan mt-8  max-sm:flex-col max-sm:items-start max-sm:pt-10 max-sm:mt-12 ${
                  job.featured ? "border-l-4 border-l-primary-cyan" : ""
                }`}
              >
                <img
                  src={job.logo}
                  alt={job.company}
                  className="max-sm:absolute transition max-sm:top-0 max-sm:-translate-y-1/2 max-sm:w-16"
                />

                <div className="max-sm:border-b-2 max-sm:pb-4 max-sm:w-full shrink-0">
                  <h1 className="text-primary-cyan font-bold gap-2 flex items-center">
                    <span className="mr-3">{job.company}</span>
                    {job.new && (
                      <span className="py-1 px-1.5 grid place-content-center bg-primary-cyan rounded-full text-xs text-filter-light uppercase">
                        new!
                      </span>
                    )}
                    {job.featured && (
                      <span className="py-1 px-1.5 grid place-content-center rounded-full bg-text-dark text-xs text-filter-light uppercase">
                        featured
                      </span>
                    )}
                  </h1>

                  <h2 className="font-bold mt-3 text-primary-cyan text-xl max-sm:text-base max-sm:text-text-dark">
                    {job.position}
                  </h2>

                  <h3 className="text-text-gray font-medium text-base mt-3">
                    {job.postedAt}
                    <span className="mx-2">•</span>
                    {job.contract}
                    <span className="mx-2">•</span>
                    {job.location}
                  </h3>
                </div>

                <ul className="grow flex flex-wrap gap-4 justify-end items-center max-sm:justify-start max-sm:w-full">
                  <li key={`${job.id}-${job.role}`}>
                    <button
                      disabled={filter.role.includes(job.role)}
                      onClick={() => setToFilter("role", job.role)}
                      className="font-bold px-2 py-1 shadow-sm rounded-md hover:bg-primary-cyan hover:text-filter-light transition text-primary-cyan bg-[#E3F7FD]"
                    >
                      {job.role}
                    </button>
                  </li>

                  <li key={`${job.id}-${job.level}`}>
                    <button
                      disabled={filter.level.includes(job.level)}
                      onClick={() => setToFilter("level", job.level)}
                      className="font-bold px-2 py-1 shadow-sm rounded-md hover:bg-primary-cyan hover:text-filter-light transition text-primary-cyan bg-[#E3F7FD]"
                    >
                      {job.level}
                    </button>
                  </li>

                  {job.tools.map((el) => (
                    <li key={`${job.id}-${el}`}>
                      <button
                        disabled={filter.tools.includes(el)}
                        onClick={() => setToFilter("tools", el)}
                        className="font-bold px-2 py-1 shadow-sm rounded-md hover:bg-primary-cyan hover:text-filter-light transition text-primary-cyan bg-[#E3F7FD]"
                      >
                        {el}
                      </button>
                    </li>
                  ))}

                  {job.languages.map((el) => (
                    <li key={`${job.id}-${el}`}>
                      <button
                        disabled={filter.languages.includes(el)}
                        onClick={() => setToFilter("languages", el)}
                        className="font-bold px-2 py-1 shadow-sm rounded-md hover:bg-primary-cyan hover:text-filter-light transition text-primary-cyan bg-[#E3F7FD]"
                      >
                        {el}
                      </button>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Jobs;
