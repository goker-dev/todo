import React from 'react';
import 'styles/app.scss'
import {Header, Container, Footer} from "./components/Layout";
import {Todo} from "./components/Todo";

function App() {
    return (
        <div className="App">
            <Header/>
            <Container>
                <Todo/>
            </Container>
            <Footer/>
        </div>
    );
}

export default App;
