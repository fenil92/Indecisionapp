class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleRandomSelect = this.handleRandomSelect.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options : []
        };
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

    handleDeleteOptions(){
        this.setState(() => ({ options : [] }));
    }

    handleDeleteOption(optionText){
        this.setState((prevState) => ({ options : prevState.options.filter((option) => optionText !== option ) 
        }));
    }

    handleRandomSelect(){
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[randomNum]);
    }

    handleAddOption(option){
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

    render() {
        const title = 'Indecision';
        const subtitle = 'Put you life in the hand of a computer';
   
       return (
        <div>
            <Header title={title} subtitle={subtitle} />
            <Action hasOptions={this.state.options.length > 0} handleRandomSelect={this.handleRandomSelect} />
            <Options 
                options={this.state.options} 
                handleDeleteOptions={this.handleDeleteOptions} 
                handleDeleteOption={this.handleDeleteOption}
            />
            <AddOptions handleAddOption={this.handleAddOption} />
        </div>
       );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
   );
}

const Action = (props) => {
    return (
        <div>
            <button  disabled={!props.hasOptions} onClick={props.handleRandomSelect}>What Should I do?</button>
        </div>
  );
}

const Options = (props) => {
    return(
        <div>
        <button onClick={props.handleDeleteOptions} >Remove All</button>
            {props.options.length ===0 && <p>Please add an option to get started!</p>}
            {
                props.options.length > 0 && props.options.map((option) =>
                 <Option key={option} 
                    optionText={option}
                    handleDeleteOption={props.handleDeleteOption}
                    >
                 </Option>
                 )
            }
        </div>
   );
}

const Option = (props) => {
    return(
        <div>
            {props.optionText}
            <button onClick={(e)=>{
                props.handleDeleteOption(props.optionText);
            }} >
            Remove
            </button>
        </div>
     );
}

class AddOptions extends React.Component{
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
                    this.state.error && <p>{this.state.error}</p>
                }
                <form onSubmit={this.onFormSubmit}>
                <input type="text" name="option"></input>
                <button>Add Options</button>
                </form>
            </div>
        );  
    };
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));