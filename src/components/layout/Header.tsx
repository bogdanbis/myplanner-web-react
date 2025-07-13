import MpIcon from '@/components/ui/icons/MpIcon';
import { useAppSelector } from '@/store/hooks';
import LogIn from '../auth/LogIn';
import UserInfoButton from '../UserInfoButton';

export default function Header(props: { showSidebar: () => void }) {

    const user = useAppSelector(state => state.auth.user);

    return (
        <div className="header">
            <div className="header-content">
                <div onClick={props.showSidebar} className="menu-button">
                    <span><MpIcon icon="list" /></span>
                </div>
                <div className="right-side">
                    {user ? <UserInfoButton /> : <LogIn />}
                </div>
            </div>
            <div className="logo-container">
                <b className="logo">Progress Planner</b>
            </div>
        </div>
    )
}
