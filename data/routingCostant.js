
//importo page
import Homepage from "../src/pages/Homepage";
import ContactPage from "../src/pages/ContactPage";
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
        path: '/compare',
        name: 'Compare',
        component: ComparePage
    },
    {
        id: 3,
        path: '/contact',
        name: 'Contact Us',
        component: ContactPage 
    },
];

export default routes