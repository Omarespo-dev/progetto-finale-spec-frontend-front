
//importo page
import Homepage from "../src/pages/Homepage";
import ContactPage from "../src/pages/ContactPage";
import SmartphonePage from "../src/pages/SmartphonePage";

const routes = [
    {
        id: 1,
        path: '/',
        name: 'Home',
        component: Homepage 
    },
    {
        id: 2,
        path: '/smartphone',
        name: 'Smartphone',
        component: SmartphonePage
    },
    {
        id: 3,
        path: '/contact',
        name: 'Contattaci',
        component: ContactPage 
    },
];

export default routes