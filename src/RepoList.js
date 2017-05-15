import React, {PropTypes, Component } from 'react';
import RepoItem from './RepoItem';
import './RepoList.css';

class RepoList extends Component {
    static get defaultProps() {
        return {
            list : []
        };
    }


    static get propTypes() {
            return ({
                list: PropTypes.array,
            })
    }

render() {

    const {list} = this.props || [];
    return(<div>
            {list.map(function(itementity,i){
                if(i < 10){
                    return (<div className="row" key={i} >
                            <RepoItem name={itementity.name} desc={itementity.description} issues={itementity.issues}/>
                            </div>);
                } 
           })}

            </div>);

}

}


export default RepoList;
