import React from "react";
import { useState, useEffect, useCallback } from "react";

import { useHttpClient} from "../hooks/http-hook";
import './Form.css';

import ResultItem from "./ResultItem";
import PreviousItem from "./PreviousItem";


const Form = () => {

    const {sendRequest} = useHttpClient();
    const [isLoadedTerms, setIsLoadedTerms] = useState(false)
    const [displayTerms, setDisplayTerms] = useState([]);
    const [query, setQuery] = useState('');
    const [history, setHistory] = useState([]);
    const [historyValid, setHistoryValid] = useState(true);
    const [goHistory, setGoHistory] = useState(0);
    const [previousSearch, setPreviousSearch] = useState(false)
    let lastQuery;

    const changeHandler = event => {
        setQuery(event.target.value);
    }

    const submitHandler = event => {
        event.preventDefault();
        console.log(query.trim().length)
        fetchResult().then();

        const isFound = history.some(element => {
            if(element === query){
                return true;
            }
                return false;
        })
        if(!isFound && query.trim().length > 0) {
            setHistory(current => [...current, query]);
            setHistoryValid(true);
            setPreviousSearch(true);
        }
    }

    const fetchResult = useCallback(async (loadedTerms) => {

            if(query && query !== lastQuery && query.trim().length > 0) {
                try {

                    const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/${query}`);
                    loadedTerms = responseData.terms;
                    lastQuery = query;
                    if(loadedTerms.length !== 0 && query.trim().length !== false) {
                        setIsLoadedTerms(true)
                        setHistoryValid(true)
                        setDisplayTerms(loadedTerms);
                    }  else {
                        setIsLoadedTerms(false);
                        setHistoryValid(false);
                    }

                } catch (err) {
                    console.log(err);
                }
            }
    },[query]);




    const historyHandler = (event) => {
        setQuery(event.target.innerText);
        setGoHistory(goHistory + 1);
    }

    useEffect( () => {
            fetchResult().then();
    },[goHistory])


    return (
        <div>
        <h2>Search for related topics from DuckDuckGo :</h2>
            <form className="input-box" onSubmit={submitHandler}>
                <input id="query-input"
                       list="searchdata"
                       className="search-input"
                       type="search"
                       placeholder="Start searching..."
                       onChange={changeHandler}
                       value={query}
                />
                <button className="button" type="submit">Search</button>
                <datalist id="searchdata"></datalist>
            </form>
            {!!isLoadedTerms && (
               <div className="results">
               <h3>Results:</h3>
                  <ul>
                      {
                          displayTerms.map((item, index) => (
                              <ResultItem
                                  key={index}
                                  title={item.Text}
                                  url={item.FirstURL}
                              />
                          ))
                      }
                  </ul>
            </div>
            )}
            {
                !historyValid && <div className="results">
                    <h3>There is no results for given query</h3>
                </div>
            }
            {previousSearch && <div className="previous-search">
                <h4>Previous search</h4>
                <ul className="history">
                    {
                        history.map((item, index) => (

                            <PreviousItem
                                value={item}
                                key={index}
                                onClick={historyHandler}
                            />
                        ))
                    }
                </ul>
            </div>}
        </div>
    )
}

export default Form;