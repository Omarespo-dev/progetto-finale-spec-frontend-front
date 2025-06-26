
//importo page
import Homepage from "../src/pages/Homepage";
import ContactPage from "../src/pages/ContactPage";
import SmartphonePage from "../src/pages/SmartphonePage";
import SmartphoneDetail from "../src/pages/SmartphoneDetail";
import ComparePage from "../src/pages/ComparePage";

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
        path: '/smartphone/:id',
        component: SmartphoneDetail
    },
    {
        id: 4,
        path: '/compare',
        name:"Compare",
        component: ComparePage
    },
    {
        id: 5,
        path: '/contact',
        name: 'Contattaci',
        component: ContactPage 
    },
];

export default routes