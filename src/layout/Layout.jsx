import "./Layout.css";
import Header from "./Header";
import Nav from "./Nav";

function Layout(props) {
    return (
        <>
            <Header />
            <Nav />
            <main>{props.children}</main>
        </>
    );
}

export default Layout;