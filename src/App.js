import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Request from 'react-http-request';
import RepoList from './RepoList';
import Request from 'superagent';


class App extends Component {
    static get defaultProps() {
        return ({repoList : []});
    }

    constructor(props) {
        super(props);
        this.state = {showBackButton: false};
        this.getApiResponse = this.getApiResponse.bind(this);
        this.parseResponse = this.parseResponse.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.clearResults = this.clearResults.bind(this);
    }
    parseResponse(items){
        var parsedRepoList =[];
         items.forEach(function (item){
            let eachItem = {};
            eachItem.name = item.name;
            eachItem.description = item.description;
            eachItem.issues = item.issues_url;
            parsedRepoList.push(eachItem);
        });
        setTimeout(() => {
            this.setState({repoList: parsedRepoList,
                            showBackButton: true});
       }, 0);

    }
    getApiResponse(input){
        //var input = "sandeep";//this.refs.inputValue.value;
        var url = `https://api.github.com/search/repositories?q=${input}`
        Request.get(url).then((response) =>{
            this.setState({loading: false})
            this.parseResponse(response.body.items)
        })
        /*return(
        <Request
            url="https://api.github.com/search/repositories?q=${input}"
            method='get'
            accept='application/json'
            verbose={true}
          >
            {
              ({error, result, loading}) => {
                if (loading) {
                    this.setState({loading: true});
                 // return <div>loading...</div>;
                } else {
                    this.setState({loading: false})
                    this.parseResponse(result.body.items)
                //    return (<div>
                //        <RepoList list={this.state.repoList}/>
                //        </div>);
                }
              }
            }
          </Request>


    );*/
}
renderResults(){
    return(
        <div>
            <RepoList list={this.state.repoList}/>
        </div>);
}

displayBackButton(){
    if(this.state.showBackButton){
        return <button name="backBtn" onClick={this.clearResults}>Back</button>
    }
}
clearResults(){
    this.setState({repoList: [],
                    showBackButton: false});
    this.refs.inputValue.value = " ";
}

clickHandler(){
    var input = this.refs.inputValue.value || 'tetris';
    console.log(input);
    this.getApiResponse(input);
}
  render() {
    return (
      <div className="App">
        <div className="search-section">
            {this.displayBackButton()}
            <h1>Git Repo</h1>
            <input className="searchBox" ref="inputValue"  type="textbox" name="search" placeholder="Search for repositories "/>
            <button onClick={this.clickHandler}>Submit</button>
        </div>
        {this.renderResults()}
      </div>
    );
  }
}

export default App;
