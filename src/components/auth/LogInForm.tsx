import api from "@/api";
import MpButton from "@/components/ui/buttons/MpButton";
import MpForm from "@/components/ui/form/MpForm";
import MpFormInput from "@/components/ui/form/MpFormInput";
import { useState } from "react";

export default function LogInForm() {
    const [loading, setLoading] = useState(false);

    const logIn = async (formData: FormData) => {
        setLoading(true);
        try {
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            await api.logIn(email, password);
            window.location.reload();
        } catch (e) {
            console.error(e);
            // TODO - show toast
        }
        setLoading(false);
    };

    const LogInFormActions = () => {
        return (
            <MpButton type="submit" busy={loading}>
                Log In
            </MpButton>
        )
    }

    return (
        <MpForm cols="1" action={logIn} actionsChildren={<LogInFormActions />}>
            <MpFormInput
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
            />
            <MpFormInput
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
            />
        </MpForm>
    )
}
