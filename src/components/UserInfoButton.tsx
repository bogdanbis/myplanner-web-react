import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logOut } from "@/store/slices/authSlice";
import MpLinkButtonWithConfirm from "./ui/buttons/MpLinkButtonWithConfirm";

export default function UserInfoButton() {
    const user = useAppSelector(state => state.auth.user)!;
    const dispatch = useAppDispatch();

    const handleLogOut = () => {
        dispatch(logOut());
        window.location.href = '/';
    }

    return (
        <MpLinkButtonWithConfirm
            onConfirm={handleLogOut}
            icon="person-circle"
            className="text-white"
            confirmText="Log Out"
        >
            {user.name}
        </MpLinkButtonWithConfirm>
    )
}
