import { collect } from "@utils/collection";
import { Nullable, Post } from "@utils/types";
import { Dispatch, SetStateAction, useMemo } from "react";
import { Sorter } from "../Posts";

interface PostsToolbarProps {
  posts: Post[];
  setFilters: Dispatch<SetStateAction<Record<string, string>>>;
  setSorter: Dispatch<SetStateAction<Nullable<Sorter<Post>>>>;
}

export function PostsToolbar({
  posts,
  setFilters,
  setSorter
}: PostsToolbarProps) {
  const filterOptions: Record<string, string[]> = {
    category: useMemo(
      () => collect(posts).pluck<string>("category").unique().toArray(),
      [posts]
    ),
    status: useMemo(
      () => collect(posts).pluck<string>("status").unique().toArray(),
      [posts]
    )
  };

  const sorters: Sorter<Post>[] = [
    { label: "Published at ASC", field: "publishedAt", direction: 1 },
    { label: "Published at DESC", field: "publishedAt", direction: -1 },
    { label: "Updated at ASC", field: "updatedAt", direction: 1 },
    { label: "Updated at DESC", field: "updatedAt", direction: -1 }
  ];

  return (
    <>
      <h4>Sort by</h4>
      <select
        defaultValue=""
        onChange={(event) => {
          const sorter = sorters[parseInt(event.target.value)];

          !!sorter && setSorter(sorter);
        }}
      >
        <option value="">---</option>
        {sorters.map(({ label }, index) => (
          <option key={index} value={index}>
            {label}
          </option>
        ))}
      </select>

      <h4>Filter by</h4>
      {Object.keys(filterOptions).map((filterKey) => (
        <select
          key={filterKey}
          defaultValue=""
          onChange={(event) => {
            setFilters((filters) => ({
              ...filters,
              [filterKey]: event.target.value
            }));
          }}
        >
          <option value="">---</option>
          {filterOptions[filterKey]?.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      ))}
    </>
  );
}
