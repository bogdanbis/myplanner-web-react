import MpIcon from '@/components/ui/MpIcon';

export default function Header(props: { showSidebar: () => void }) {
    return (
        <div className="header">
            <div className="header-content">
                <div onClick={props.showSidebar} className="menu-button">
                    <span><MpIcon icon="list" /></span>
                </div>
                <div className="left-side">
                    {/* <LogInButton v-if="!user?.email" /> */}
                    {/* <UserInfoButton v-else /> */}
                </div>
            </div>
            <div className="logo-container">
                <b className="logo">Progress Planner</b>
            </div>
        </div>
    )
}
