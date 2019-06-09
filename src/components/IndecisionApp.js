import React from 'react';
import Header from './Header';
import Action from './Action';
import AddOptions from './AddOptions';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component{
    state = {
        options : [],
        selectedOption : undefined
    };

    handleDeleteOptions = () => {
        this.setState(() => ({ options : [] }));
    }

    handleDeleteOption = (optionText) => {
        this.setState((prevState) => ({ options : prevState.options.filter((option) => optionText !== option ) 
        }));
    }

    handleRandomSelect = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        //alert(this.state.options[randomNum]);
        this.setState(()=>({
            selectedOption : this.state.options[randomNum]
        }));
        
    }

    handleAddOption = (option) => {
        if(!option){
            return 'Please enter valid value to add item.'
        }
        else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        
        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            };
        });
        
    }

    handleClearSelection = () => {
        this.setState(() => ({ selectedOption : undefined}))
    }
    
    componentDidMount(){
        //gets called after render
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(() => ({options}));
            }
        } catch (error) {
           //Do nothing 
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
        }
    }

   

    render() {
        const title = 'Indecision';
        const subtitle = 'Put you life in the hand of a computer';
   
       return (
        <div>
            <Header title={title} subtitle={subtitle} />
            <div className="container">
                <Action hasOptions={this.state.options.length > 0} handleRandomSelect={this.handleRandomSelect} />
                <div className="widget">
                    <Options 
                        options={this.state.options} 
                        handleDeleteOptions={this.handleDeleteOptions} 
                        handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOptions handleAddOption={this.handleAddOption} />
                </div>
            </div>
            <OptionModal handleClearSelection={this.handleClearSelection} selectedOption={this.state.selectedOption}></OptionModal>
        </div>
       );
    }
}