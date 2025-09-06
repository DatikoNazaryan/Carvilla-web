export const sortData = (data, sortBy) => {
    return (data.toSorted((a, b) =>  {
        if(sortBy === "asc") {
            return (new Date(b.sortData) - new Date(a.sortData));
        } else if (sortBy === "desc") {
            return (new Date(a.sortData) - new Date(b.sortData));
        }
      }));
};