import api from "@/api";
import MpButton from "@/components/ui/buttons/MpButton";
import MpForm from "@/components/ui/form/MpForm";
import MpFormInput from "@/components/ui/form/MpFormInput";
import { useState } from "react";

export default function SignUpForm() {

    const [user, setUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: '',
    });
    const [loading, setLoading] = useState(false);

    const maySubmit = Boolean(
        user.email &&
        user.firstName && user.lastName &&
        user.password && user.passwordConfirm && 
        user.password === user.passwordConfirm
    )

    const signUp = async () => {
        setLoading(true);
        await api.signUp(user);
        window.location.reload();
    }

    const FormActions = () => (
        <MpButton type="submit" disabled={!maySubmit} busy={loading}>
            Sign Up
        </MpButton>
    )

    return (
        <MpForm cols="1" onSubmit={signUp} actionsChildren={<FormActions />}>
            <MpFormInput
                id="email"
                type="email"
                placeholder="Email"
                value={user.email}
                onInput={(e) => setUser({ ...user, email: e.target.value })}
                required
            />
            <MpFormInput
                id="first-name"
                placeholder="First name"
                value={user.firstName}
                onInput={(e) => setUser({ ...user, firstName: e.target.value })}
                cols={1 / 2}
                required
            />
            <MpFormInput
                id="last-name"
                placeholder="Last name"
                value={user.lastName}
                onInput={(e) => setUser({ ...user, lastName: e.target.value })}
                cols={1 / 2}
                required
            />
            <MpFormInput
                id="password"
                type="password"
                placeholder="Password"
                value={user.password}
                onInput={(e) => setUser({ ...user, password: e.target.value })}
                required
                autoComplete="off"
            />
            <MpFormInput
                id="password-confirm"
                type="password"
                placeholder="Confirm password"
                value={user.passwordConfirm}
                onInput={(e) => setUser({ ...user, passwordConfirm: e.target.value })}
                required
                autoComplete="off"
            />
        </MpForm>
    )
}
