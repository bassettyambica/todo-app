import React, {PropTypes, Component } from 'react';
import './RepoItem.css';
import Request from 'superagent';

class RepoItem extends Component {
    static get propTypes() {
            return ({
                name: PropTypes.string,
                desc: PropTypes.string,
                issues: PropTypes.string

            });
    }
    constructor(props){
        super(props);
        this.repoItemDetails = this.repoItemDetails.bind(this);
    }
    repoItemDetails(){
        //document.write("Hello from click");
        var url = this.props.issues.substring(0,this.props.issues.indexOf("{"));
        Request.get(url).then((response) =>{
            console.log(response);
            document.write(JSON.stringify(response.text));
        });
    }


render() {
    return(
        <div className="columnItem" onClick={this.repoItemDetails}>
            <div className="reponame left">Repository :
                <span className="column">{this.props.name}</span>
            </div>
            <div className="repodesc right">
                <span className="column">{this.props.desc}</span>
            </div>
        </div>
    );
}
}


export default RepoItem;
