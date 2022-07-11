import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";

const SearchBar = () => {
    const [inFocus, setInFocus] = useState(false);
    const [history, setHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSuggestions, setfilteredSuggestions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5050/historical-searches').then((response) => {
            setHistory(response.data.data)
            console.log(response.data.data.slice(0, 8));
            setfilteredSuggestions(response.data.data.slice(0, 8))
        }).catch((error) => {

        })
    }, [])

    const inputRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown" && activeIndex + 1 < filteredSuggestions.length) {
            setActiveIndex(activeIndex + 1);
            setSearchQuery(filteredSuggestions[activeIndex + 1].name);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (activeIndex - 1 >= 0) {
                setActiveIndex(activeIndex - 1);
                setSearchQuery(filteredSuggestions[activeIndex - 1].name);
            }
        } else if (e.key === "Escape") {
            setActiveIndex(-1);
            setInFocus(false);
            inputRef.current.blur();
        }
    };

    const filterSuggestions = (query) => {
        console.log(history);
        return history
            .slice(0, 8)
            .filter(({ name }) => name.toLowerCase().startsWith(query.toLowerCase()));
    };

    const OnChangeFuntion = (e) => {

        //@todo - Code is written, only query need to be configured
        // const headers = {
        //     'Content-Type': 'application/json'
        // }
        // axios.post('http://localhost:5050/search', { query: e.target.value }, {
        //     headers: headers
        // })
        //     .then((response) => {
        //         console.log(response);
        //         const filteredHistory = filterSuggestions(e.target.value);
        //         setfilteredSuggestions(filteredHistory);
        //         return response
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        // setInFocus(true);
        // setActiveIndex(-1);
        // setSearchQuery(e.target.value);

        const filteredHistory = filterSuggestions(e.target.value);
        setfilteredSuggestions(filteredHistory);
        setInFocus(true);
        setActiveIndex(-1);
        setSearchQuery(e.target.value);
    };

    const handler = useCallback(debounce(OnChangeFuntion, 300), []);

    const handleOnChange = (event) => {
        // perform any event related action here
        handler(event);
        setSearchQuery(event.target.value);
    };

    const formatSuggestion = (suggestion) => {
        if (
            suggestion.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
            searchQuery.length > 0
        ) {
            return (
                <>
                    <span className="light">
                        {suggestion.substring(0, searchQuery.length)}
                    </span>
                    <span className="bold">
                        {suggestion.substring(searchQuery.length)}
                    </span>
                </>
            );
        } else {
            return suggestion;
        }
    };

    const findSearchResults = (e) => {
        e.preventDefault();
        setInFocus(false);
        inputRef.current.blur();
    };

    return (
        <form
            className="search-form"
            action="/search"
            method="GET"
            onSubmit={findSearchResults}
        >
            <div className="search-bar">
                <input
                    className="search-bar__input"
                    type="text"
                    name="q"
                    placeholder="Search for products, brands and more"
                    autoComplete="off"
                    value={searchQuery}
                    onChange={handleOnChange}
                    onFocus={() => {
                        setActiveIndex(-1);
                        setInFocus(true);
                    }}
                    // onBlur={() => {
                    //     setActiveIndex(-1);
                    //     setInFocus(false);
                    // }}
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                />
                <button
                    disabled={searchQuery === ""}
                    className="search-bar__submit-btn"
                    type="submit"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 17 18"
                        className=""
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g fill="#2874F1" fillRule="evenodd">
                            <path d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"></path>
                            <path d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"></path>
                        </g>
                    </svg>
                </button>
            </div>

            {inFocus && (
                <ul className="dropdown">
                    <div className="suggestion-clear" style={{ color: 'red' }}>Clear all</div>
                    {filteredSuggestions.map(({ name }, index) => (

                        <li
                            className={
                                activeIndex === index
                                    ? "dropdown__item active"
                                    : "dropdown__item"
                            }
                            key={"suggestion" + index}
                            onMouseOver={() => setActiveIndex(index)}
                            onMouseOut={() => setActiveIndex(-1)}
                        >
                            <a className="item-link" href={`/search?q=${name}`}>
                                <div className="search-suggestion-icon">
                                    <img src="" alt="" />
                                </div>
                                <div className="search-suggestion-text">
                                    {formatSuggestion(name)}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default SearchBar;
