import MpDialog, { type MpDialogHandle } from "@/components/ui/MpDialog";
import MpButton from "@/components/ui/buttons/MpButton";
import { useRef, useState } from "react";
import LogInForm from "./LogInForm";

interface LogInProps {
    className?: string;
}

export default function LogIn({ className }: LogInProps) {

    const [showLogInForm, setShowLogInForm] = useState(true);

    const dialog = useRef<MpDialogHandle>(null);

    const openLogInDialog = () => {
        dialog.current?.open();
    }

    return (
        <>
            <MpDialog ref={dialog} title="Log In" size="small">
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
                        <LogInForm />
                        {/* <SignUpForm /> */}
                        <div className="d-flex align-center" v-else>
                            Already have an account?
                            <MpButton link onClick={() => setShowLogInForm(!showLogInForm)} className="ml-xs">
                                Log In
                            </MpButton>
                        </div>
                    </>}
            </MpDialog >
            <MpButton className={'log-in-button ' + (className ? className : '')} onClick={openLogInDialog}>
                Log In
            </MpButton>
        </>
    )
}
