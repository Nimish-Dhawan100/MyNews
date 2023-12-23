import React, { Component, useContext, useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';
import { computeHeadingLevel } from '@testing-library/react';

const News= (props) => {
    let {lang, country,category} = useParams();
    console.log(lang)

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalArticles, setTotalArticles] = useState(null)
    let error = null;
 
    
    const updateNews= async ()=>{
        // console.log("cdm");
        if(lang && country && category){

            let uri = `https://gnews.io/api/v4/top-headlines?token=56c4461e0e3d05331e8fac339eee7a31&page=1&topic=${category}&max=${props.max}&lang=${lang}&country=${country}`;

       
console.log(uri)
        
                
        

        setLoading(true)

        // this.setState({loading: true});
        let data = await fetch(uri);
        let parsedData = await data.json(); 
        // console.log(parsedData);
        if(parsedData.errors){
            error= parsedData.errors
            // console.log(error)
            
        }
        setArticles(parsedData.articles)
        setTotalArticles(parsedData.totalArticles)
        setLoading(false)

    }
        
        // this.setState({articles: parsedData.articles,
        //      totalArticles :parsedData.totalArticles,
        //     loading:false});

        // let myCategory = this.props.category ;
        // myCategory = myCategory[0].toUpperCase() +myCategory.substring(1)        
    }

    useEffect(() => {
      updateNews()
    //   query = null
    }, [lang, country, category])
    

    

      return( 
        <div className="container my-3">
            {
               error ? console.log(error) : 
               <>

        
            
            <h1 className="text-center my-3">NewsApp- Top {category} Headlines</h1>
            {loading && <Spinner/>}
            <div className="row">
                  
                {!loading && articles.map((element, index)=>{
                    
                    return <div className="col-md-12" key={element.url} >
                        {/* <NewsItem title={element.title} description ={element.description} content ={element.content} imageurl ={element.urlToImage} newsUrl={element.url}/>  */}
                        <NewsItem index={index} title={element.title} source={element.source.name} description ={element.description} content ={element.content} imageurl ={element.image} newsUrl={element.url}/> 
                    </div>
                })}

            </div>
            {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalArticles/this.props.max)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            
        </div> */}
        </>

     }
        </div>
        
    )
  }


News.defaultProps = {
    country: 'in',
    max: 9,
    category: 'breaking-news'
}

News.propTypes = {
    country: PropTypes.string,
    max: PropTypes.number,
    category: PropTypes.string,

}
export default News;


    
    
    
