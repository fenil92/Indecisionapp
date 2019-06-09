let visibility = false;

const toggleVisibility = () => {
    visibility =!visibility;
    render();
};

const render = () => {

    const jsx = (
        <div>
        <h1>Visible Toggle</h1>
        <button onClick={toggleVisibility}>
            {visibility ? 'Hide Details': 'Show Details'}
        </button>
        {visibility && <div>This are some details! You can see.</div>}
        </div>
    );

    ReactDOM.render(jsx,document.getElementById('app'));
}

render();