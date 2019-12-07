const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter} = require('react-router-dom');

const HoteleriaPage = require('../pages/hoteleria/view');
const styles = require('../pages/hoteleria/style.scss');


const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM.hydrate(
    <BrowserRouter>
        <HoteleriaPage initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);
