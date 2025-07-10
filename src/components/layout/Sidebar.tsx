import MpIcon from "../ui/MpIcon";
import NavMenu from "./NavMenu";

const mainMenuItems = [
    {
        icon: 'search',
        label: 'Explore',
        path: '/',
    },
    {
        icon: 'bullseye',
        label: 'My Plans',
        path: '/my-plans',
    },
];

const creatorMenuItems = [
    {
        icon: 'pencil-square',
        label: 'Created Plans',
        path: '/creator',
    },
    {
        icon: 'send',
        label: 'Sent Invites',
        path: '/sent-invites',
    },
]

export default function Sidebar(props: { hideSidebar: () => void }) {
    return (
        <div className="sidebar">
            <div className="menu">
                <div className="menu-title">
                    <span>Tracker</span>
                    <div onClick={props.hideSidebar} role="button" className="close-menu-button">
                        <MpIcon icon="x" />
                    </div>
                </div>
                <NavMenu menuItems={mainMenuItems} />
            </div>
            <div className="menu creator-menu">
                <div className="menu-title">
                    <span>Creator</span>
                </div>
                <NavMenu menuItems={creatorMenuItems} />
            </div>
        </div>
    )
}
