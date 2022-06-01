import React from "react";

export const useSearch = () => {

    const [search, setSearch] = React.useState('');


    const handleSearch = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        setSearch(data.get('search'))

    }


    return {
        search,
        handleSearch
    }


}