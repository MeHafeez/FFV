import { Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/home/HomePage";
import Header from "./components/banner/Header";
import ShopNow from "./components/projects/ShopComponent";
import SocialMediaLinks from "./components/SocialMediaLinks";
import NavigationLinks from "./components/NavigationLinks";
import AboutUs from "./components/about/About";
import ContactUs from "./components/contact/contact";

function App() {
  return (
    <div className="h-full bg-black relative">
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/shop" component={ShopNow} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/contact-us" component={ContactUs} />
      </Switch>

      <div className="fixed left-4 top-1/2 transform -translate-y-1/2">
        <NavigationLinks />
      </div>

      <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
        <SocialMediaLinks />
      </div>
    </div>
  );
}

export default App;
