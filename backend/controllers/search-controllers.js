const axios = require('axios');


let STATIC_SEARCH = [
    {
        term: 'test'
    }
];

const getSearch = async (req, res, next) => {
    const searchItem =  STATIC_SEARCH.map(item => {
        return item.term;
    });

    res.json({ searchItem });
}

const doSearch = async (req, res, next) => {
    let terms;
    const value = req.params.query;
    try{

        const apiResponse = await axios.get(`http://api.duckduckgo.com/?q=${value}&format=json`)
            .then(function(response) {
               const data = response.data.RelatedTopics;
               let preTerms = data.filter(item => item.hasOwnProperty('Text'));

               return terms = preTerms.map((item) => {
                   return {
                       'FirstURL': item.FirstURL,
                       'Text': item.Text
                   }
               });

        });

    }catch(err){
        console.log(err);
        return(next);
    }

    res.json({terms});
}




/*exports.getSearch = getSearch;*/
exports.doSearch = doSearch;