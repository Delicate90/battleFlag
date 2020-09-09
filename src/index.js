import ReactDOM from 'react-dom';
import React from "react";
import Drawer from "./view/Drawer";

const Container = (props)=> {
    return (<Drawer/>)
};

ReactDOM.render(<Container/>, document.getElementById('root'))