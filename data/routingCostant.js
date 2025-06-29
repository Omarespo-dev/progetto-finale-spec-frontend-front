
//importo page
import Homepage from "../src/pages/Homepage";
import ContactPage from "../src/pages/ContactPage";
import SmartphonePage from "../src/pages/SmartphonePage";
import SmartphoneDetail from "../src/pages/SmartphoneDetail";
import ComparePage from "../src/pages/ComparePage";
import WishlistPage from "../src/pages/WishlistPage";

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
        path: '/wishlist',
        component: WishlistPage
    },
    // {
    //     id: 6,
    //     path: '/contact',
    //     name: 'Contattaci',
    //     component: ContactPage 
    // },
];

export default routes