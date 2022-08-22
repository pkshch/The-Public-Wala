import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component { 
  static defaultProps = {
    country:'in',
    pageSize:8,
    category:'general',
   
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
  }
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

    constructor(props){
        super(props);
        console.log("hello i am a constructor from News component");
        this.state={
          articles:[],
          loading:true,
          page:1,
          totalResults:0
          
        }
      document.title=` ${this.capitalizeFirstLetter(this.props.category)}- The Public Wala`;
    }
  async updateNews(){
    this.props.setProgress(0);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}
    &page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData=await data.json()
    console.log(parsedData);
    this.setState({articles:parsedData.articles,
    totalResults:parsedData.totalResults,
    loading:false });
    this.setProgress(100);

    }
 async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18612ef3dd0547039f5404d1362fe209&page=1
    &pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData=await data.json()
    console.log(parsedData);
    this.setState({articles:parsedData.articles,
    totalResults:parsedData.totalResults,
    loading:false });
}
            //    previous page//
    handlePreviousClick =async()=>{
     console.log("Previous");
    //  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18612ef3dd0547039f5404d1362fe209
    //  &page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    //  this.setState({loading:true});
    //  let data=await fetch(url);
    //  let parsedData=await data.json()
    //  console.log(parsedData); 
    //   this.setState({
    //       page:this.state.page -1,
    //       articles:parsedData.articles,
    //       loading:false
    //   })
    this.setState({page:this.state.page -1});
    this.updateNews();
    }
                //   nextpage//
     handleNextClick=async()=>{
     console.log("Next");
  //  if(!(this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pageSize))){

  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18612ef3dd0547039f5404d1362fe209
  //   &page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data=await fetch(url);
  //   let parsedData=await data.json()
  //    this.setState({
  //        page:this.state.page +1,
  //        articles:parsedData.articles,
  //        loading:false
  //    })
  //   }
  this.setState({page:this.state.page +1});
  this.updateNews();
 }
  fetchMoreData=async()=>{
   this.setState({page:this.state.page +1})
   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}
   &page=${this.state.page}&pageSize=${this.props.pageSize}`;
   this.setState({loading:true});
   let data=await fetch(url);
   let parsedData=await data.json()
   console.log(parsedData);
   this.setState({articles:this.state.articles.concat(parsedData.articles),
   totalResults:parsedData.totalResults,
   loading:false
   });
 }
  render() {

    return (
      <div className='container my-3 '>
       
       <h1 className="text-center"style={{margin:'35px 0px'}}>The Public Wala - Top {this.capitalizeFirstLetter(this.props.category)} Headline</h1>
    
      {/* {this.state.loading && <Spinner/>} */}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
    
          <div className="row">
          {this.state.articles.map((element)=>{

         return(
              <div className="col-md-4" key={element.url}>
         <NewsItem title={element.title? element.title:""} description={element.description? element.description :""} 
         imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}
        source={element.source.name }/>
         </div>
         ) })}
         </div>
         </div>
         </InfiniteScroll>
         </div>
         
    )
  }
}
export default News