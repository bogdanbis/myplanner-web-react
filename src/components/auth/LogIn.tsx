import MpDialog, { type MpDialogHandle } from "@/components/ui/MpDialog";
import MpButton from "@/components/ui/buttons/MpButton";
import { useEffect, useRef, useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setRequireLogIn } from "@/store/slices/authSlice";

interface LogInProps {
    className?: string;
}

export default function LogIn({ className }: LogInProps) {

    const requireLogIn = useAppSelector(state => state.auth.requireLogIn)
    const [showLogInForm, setShowLogInForm] = useState(true);

    const dialog = useRef<MpDialogHandle>(null);

    const dispatch = useAppDispatch();

    const openLogInDialog = () => {
        dialog.current?.open();
    }

    const dialogClosed = () => {
        dispatch(setRequireLogIn(false));
    }

    useEffect(() => {
        if (requireLogIn)
            openLogInDialog();
    }, [requireLogIn]);

    return (
        <>
            <MpDialog ref={dialog} title={showLogInForm ? 'Log In' : 'Sign Up'} size="small" onClose={dialogClosed}>
                {showLogInForm
                    ?
                    <>
                        <LogInForm />
                        <div className="d-flex align-center" v-if="showLogInForm">
                            Don't have an account?
                            <MpButton link onClick={() => setShowLogInForm(!showLogInForm)} className="ml-xs">
                                Sign up
                            </MpButton>
                        </div>
                    </>
                    :
                    <>
                        <SignUpForm />
                        <div className="d-flex align-center">
                            Already have an account?
                            <MpButton link onClick={() => setShowLogInForm(!showLogInForm)} className="ml-xs">
                                Log In
                            </MpButton>
                        </div>
                    </>}
            </MpDialog>
            <MpButton className={'log-in-button ' + (className ? className : '')} onClick={openLogInDialog}>
                Log In
            </MpButton>
        </>
    )
}
