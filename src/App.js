import Header from "./Header";
import Signin from "./pages/Signin";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element="首頁"></Route>
                <Route path="/signin" element={<Signin/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;