console.log('App.js is running!');

const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of the computer',
    options: []
};

const onFormSubmit = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value;

    if(option){
        app.options.push(option);
        e.target.elements.option.value = '';
        renderApp();
    }
};

const RemoveAllOptions= () => {
    app.options = [];
    renderApp();
};

const RandomSelect = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    alert(app.options[randomNum]);
    renderApp();
};
 
const renderApp = () => {
    var template = (
        <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{app.options.length > 0 ? 'Here are your options': 'No options'}</p>
        <button disabled={app.options.length === 0} onClick={RandomSelect}>What Should I do?</button>
        <button onClick={RemoveAllOptions}>Remove All</button>
        <ol>
            {
                app.options.map((option) => <li key={option}>{option}</li>)
            }
        </ol>
        <form onSubmit={onFormSubmit}>
            <input type="text" name="option"></input>
            <button>Add Options</button>
            
        </form>
        </div>
        );

    var appRoot = document.getElementById('app');
    ReactDOM.render(template,appRoot);
}

renderApp();