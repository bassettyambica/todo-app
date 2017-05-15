import React, { Component } from 'react';

class Note extends Component {
       static get defaultProps() {
           return ({editing : false});
       }

       constructor(props) {
           super(props);
           this.edit = this.edit.bind(this);
           this.remove = this.remove.bind(this);
           this.save = this.save.bind(this);
       }

       edit() {
           this.setState({editing : true});
       }

       remove() {
           this.props.onRemove(this.props.index);
       }

       save() {
           var val = this.refs.newText;
           this.props.onChange(val.value, this.props.index);
           this.setState({editing : false});
       }

        renderDisplay() {
        return (<div>
        <h1>{this.props.children}</h1>
           <button className="btn btn-success glyphicon glyphicon-pencil" onClick={this.edit}></button>
           <button className="btn btn-danger glyphicon glyphicon-trash" onClick={this.remove} />
        </div>);
        }

       renderForm() {
           return(<div>
               <textarea defaultValue={this.props.children} ref="newText" className="form-control"></textarea>
               <button className="btn btn-success glyphicon glyphicon-floppy-disk" onClick={this.save}></button>
           </div>)
       }

       render() {
           if(this.props.editing){
               return this.renderForm();
           }
           else{
               return this.renderDisplay();
           }
       }
}




   class Board extends Component {

      static get defaultProps() {
           return ({
               notes : [
                  'welcome',
                  'to',
                  'Hello World'
               ]
           });
       }

       constructor(props) {
           super(props);
           this.update = this.update.bind(this);
           this.remove = this.remove.bind(this);
           this.eachNote = this.eachNote.bind(this);
           this.add = this.add.bind(this);
       }

       update(newText, i) {
           var arr = this.state.notes;
           arr[i] = newText;
           this.setState({notes : arr})
       }

       remove(i) {
           var arr = this.state.notes;
           arr.splice(i, 1);
           this.setState({notes : arr});
       }

       eachNote(note, i) {
       return (
               <Note key={i}
                   index={i}
                   onChange={this.update}
                   onRemove={this.remove}
               >{note}</Note>
           );
   }

       add(text) {
           var arr = this.state.notes;
           arr.push(text);
           this.setState({notes : arr});

       }

   render() {
       return (<div className="board">
                   {this.props.notes.map(this.eachNote)}
                   <button className="btn btn-primary glyphicon glyphicon-plus" onClick={this.add.bind(null, "New Notes")}></button>
           </div>

       );
       }
   }

   export default Board;
