import React, { Component } from 'react'

export class NewsItem extends Component {
   
  render() {
      let {title,discription,imageurl,newsurl,author,date,source}=this.props;
    return (
      <div className='my-3'>
         <div className="card">
         <span className="position-absolute top-0  translate-middle badge rounded-pill bg-success" style={{left:'92%',zIndex:'1'}}>{source}
              <span className="visually-hidden">unread messages</span>
         </span>
            <img src={!imageurl?"https://images.hindustantimes.com/auto/img/2022/08/18/1600x900/Alto_K10_1660123808051_1660789594637_1660789594637.jpeg":imageurl}
                  className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title} </h5>
                <p className="card-text">{discription}</p>
                <p className="card-text"><small className="text-muted">By-{ !author ?"Unknown":author} on {new Date (date).toGMTString()}</small></p>
                <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
</div>
      </div>
    )
  }
}

export default NewsItem