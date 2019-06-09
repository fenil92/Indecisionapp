import React from 'react';

export default class AddOptions extends React.Component{
    constructor(props){
        super(props);
        this.onFormSubmit= this.onFormSubmit.bind(this);
        this.state = {
            error: undefined
        };
    }
    
    onFormSubmit(e){
        e.preventDefault();
    
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        e.target.elements.option.value = '';

        this.setState(() => {
               return { error };
        });
    }
    
    render () {
       return(
           <div>
                {
                    this.state.error && <p className="add-option__error">{this.state.error}</p>
                }
                <form className="add-option" onSubmit={this.onFormSubmit}>
                <input className="add-option__input" type="text" name="option"></input>
                <button className="button">Add Options</button>
                </form>
            </div>
        );  
    };
}